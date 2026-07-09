/* Auto-generated Proxmox VE TypeScript client.
 * - Includes ALL endpoints found in the provided spec.json
 * - Generates TSDoc for every endpoint function (description + @endpoint + parameter list)
 */
import {Agent} from "node:https";
import native_fetch from "./fetch.js";
import Access from "./api/access.js";
import type {ClusterAPI} from "./api/cluster/types.js";
import Cluster from "./api/cluster/index.js";
import type {NodesAPI} from "./api/nodes/types.js";
import Nodes from "./api/nodes/index.js";
import Pools from "./api/pools.js";
import Storage from "./api/storage.js";
import type {AnyArgs, API, MethodKey, Params, Ret} from "./api/index.js";
import Version from "./api/version.js";
import {Display} from "./helpers/Display.js";
import {NoVNCFacade} from "./helpers/NoVNC.js";
import {Terminal, TerminalRenderer, TerminalSession, TerminalState, bridgeTerminalSessionToSocket, openTerminalBridge} from "./helpers/Terminal.js";
import type {TerminalTicket, TerminalConnectionInfo, TerminalOpenOptions, TerminalRendererState, TerminalPipe, TerminalBridgeOptions, TerminalBrowserSocket, TerminalBrowserMessage, TerminalSerialPort} from "./helpers/Terminal.js";
import type {NoVNCConnectionOptions, NoVNCViewportOptions, NoVNCQualityOptions, NoVNCEventMap, NoVNCEventName, NoVNCReconnectOptions, NoVNCReconnectAttempt} from "./helpers/NoVNC.js";
import {TimerPulledEventEmitter} from "./helpers/TimerPulledEventEmitter.js";


export type FetchLike<Input extends string | URL | Request = string | URL, Init extends RequestInit = RequestInit, Out extends Response = Response> = (input: Input, init?: Init) => Promise<Out>;

export type ClientOptions = (
    {
        /** API token string, either full "PVEAPIToken=user@realm!token=secret" or shorthand "user@realm!token=secret" */
        apiToken: string;
    } |
    {
        username: string;
        password: string;
        /** Defaults to "pam" */
        realm?: string;
    }
    ) & {
    /** Base URL like https://pve.example.com:8006 */
    baseUrl: string;
    /** Defaults to "/api2/json" */
    apiPath?: string;
    fetch?: FetchLike;
    agent?: Agent;
    /**
     * Socket timeout in ms per request. Defaults to 120s if not set.
     * Set to 0 for no timeout.
     */
    socketTimeout?: number;
}

type AuthState = { ticket?: string; csrf?: string };
type ClusterResource = ClusterAPI["/cluster/resources"]["GET"]["return"][number];
type ClusterTask = ClusterAPI["/cluster/tasks"]["GET"]["return"][number];
type TaskStatusReturn = NodesAPI["/nodes/{node}/tasks/{upid}/status"]["GET"]["return"];
type TaskLogLine = NodesAPI["/nodes/{node}/tasks/{upid}/log"]["GET"]["return"][number];
type LoginResponse = { ticket: string; CSRFPreventionToken: string };
type DestroyableMonitor = { destroy(): void };

export type TaskState = "running" | "stopped" | "failed";
export type TaskUpdate = {
    logs: string[];
    status: TaskState;
    $status: TaskStatusReturn;
};
export type TaskUpdateHandler = (input: TaskUpdate) => void | Promise<void>;
export type TaskSubscription = {
    stop: () => void;
    readonly stopped: boolean;
};

export type APIClient = {
    access: ReturnType<typeof Access>;
    cluster: ReturnType<typeof Cluster>;
    nodes: ReturnType<typeof Nodes>;
    pools: ReturnType<typeof Pools>;
    storage: ReturnType<typeof Storage>;
    version: ReturnType<typeof Version>;
};

/** The node-scoped sub-API returned by `client.api.nodes.get(node)`. */
export type NodeScopedAPI = ReturnType<ReturnType<typeof Nodes>['get']>;

/** The per-VM sub-API returned by `client.api.nodes.get(node).qemu.vmid(id)`. */
export type QemuScopedAPI = ReturnType<NodeScopedAPI['qemu']['vmid']>;

/** The per-container sub-API returned by `client.api.nodes.get(node).lxc.id(vmid)`. */
export type LxcScopedAPI = ReturnType<NodeScopedAPI['lxc']['id']>;

/** The node-storage sub-API returned by `client.api.nodes.get(node).storage`. */
export type NodeStorageScopedAPI = NodeScopedAPI['storage'];

/** The storage-item sub-API returned by `client.api.nodes.get(node).storage.get(name)`. */
export type StorageItemAPI = ReturnType<NodeStorageScopedAPI['get']>;

/** The cluster sub-API returned by `client.api.cluster`. */
export type ClusterScopedAPI = ReturnType<typeof Cluster>;

/** The access sub-API returned by `client.api.access`. */
export type AccessScopedAPI = ReturnType<typeof Access>;


export class Client {
    private readonly baseUrl: string;
    private readonly apiPath: string;
    private readonly fetchImpl: FetchLike;
    private readonly opts: ClientOptions;
    private auth: AuthState = {};
    private readonly eventMonitors = new Map<string, DestroyableMonitor>();

    /**
     * Structured API surface generated from the spec.
     * Example:
     * ```ts
     * client.api.cluster.replication.read({})
     * client.api.cluster.replication.id("100-1").read({})
     * ```
     */
    public readonly api: APIClient;

    public readonly task = {
        listen: (
            upid: string,
            handler: TaskUpdateHandler = async () => undefined,
            checkInterval = 2000
        ): TaskSubscription => {
            const node = this.getNodeFromUPID(upid);
            const logLines: string[] = [];
            let stopped = false;
            let inFlight = false;
            let knownLogCount = 0;
            let previousStatus: TaskState | undefined;

            const stop = () => {
                stopped = true;
                clearInterval(interval);
            };

            const run = async () => {
                if (stopped || inFlight) return;
                inFlight = true;
                try {
                    const [status, logs] = await Promise.all([
                        this.request("/nodes/{node}/tasks/{upid}/status", "GET", {
                            $path: {node, upid},
                        }) as Promise<TaskStatusReturn>,
                        this.request("/nodes/{node}/tasks/{upid}/log", "GET", {
                            $path: {node, upid},
                        }) as Promise<TaskLogLine[]>,
                    ]);

                    let logsChanged = false;
                    for (const log of logs) {
                        const index = Number(log.n);
                        if (Number.isFinite(index) && index >= 0) {
                            if (logLines[index] !== log.t) {
                                logLines[index] = log.t;
                                logsChanged = true;
                            }
                        } else {
                            logLines.push(log.t);
                            logsChanged = true;
                        }
                    }

                    if (logs.length !== knownLogCount) {
                        knownLogCount = logs.length;
                        logsChanged = true;
                    }

                    const statusState: TaskState =
                        status.status === "stopped" && status.exitstatus !== "OK"
                            ? "failed"
                            : status.status;
                    const statusChanged = previousStatus !== statusState;

                    if (logsChanged || statusChanged) {
                        await handler({
                            logs: logLines.filter((line): line is string => typeof line === "string"),
                            status: statusState,
                            $status: status,
                        });
                    }

                    previousStatus = statusState;
                    if (statusState !== "running") {
                        stop();
                    }
                } finally {
                    inFlight = false;
                }
            };

            const interval = setInterval(() => {
                void run();
            }, Math.max(250, checkInterval));
            void run();

            return {
                stop,
                get stopped() {
                    return stopped;
                },
            };
        },

        wait: (
            upid: string,
            handler: TaskUpdateHandler = async () => undefined,
            checkInterval = 2000
        ): Promise<string[]> =>
            new Promise<string[]>((resolve, reject) => {
                const subscription = this.task.listen(
                    upid,
                    async (input) => {
                        try {
                            await handler(input);
                        } catch (error) {
                            subscription.stop();
                            reject(error);
                            return;
                        }

                        if (input.status === "failed") {
                            subscription.stop();
                            reject(input);
                            return;
                        }
                        if (input.status === "stopped") {
                            subscription.stop();
                            resolve(input.logs);
                        }
                    },
                    checkInterval
                );
            }),
    };

    public readonly helpers = {
        terminal: (vmid: string | number, serialPort?: TerminalSerialPort): Terminal => {
            // Terminal now supports both login-cookie auth and API-token auth.
            // serialPort enables multi-terminal sessions (serial0–serial3 for QEMU).
            return new Terminal(vmid, this, serialPort);
        },
        display: (vmid: string | number): Display => new Display(vmid, this),
    };

    public readonly events = {
        resources: (): TimerPulledEventEmitter<Record<string, ClusterResource>> => {
            const existing = this.eventMonitors.get("resources");
            if (existing) return existing as TimerPulledEventEmitter<Record<string, ClusterResource>>;

            const monitor = new TimerPulledEventEmitter<Record<string, ClusterResource>>(async ({publish}: { publish: <K extends string>(key: K, value: ClusterResource) => boolean }) => {
                const resources = await this.request("/cluster/resources", "GET", {
                    $query: {type: "vm"},
                } as const) as ClusterResource[];
                for (const resource of resources) {
                    if (!resource.id) continue;
                    publish(resource.id, resource);
                }
            });
            this.eventMonitors.set("resources", monitor);
            return monitor;
        },

        tasks: (): TimerPulledEventEmitter<Record<string, ClusterTask> & {task: ClusterTask}> => {
            const existing = this.eventMonitors.get("tasks");
            if (existing) return existing as TimerPulledEventEmitter<Record<string, ClusterTask> & {task: ClusterTask}>;

            const monitor = new TimerPulledEventEmitter<Record<string, ClusterTask> & {task: ClusterTask}>(async ({publish}: { publish: <K extends string>(key: K, value: ClusterTask) => boolean }) => {
                const tasks = await this.request("/cluster/tasks", "GET", {}) as ClusterTask[];
                for (const task of tasks) {
                    if (!task.upid) continue;
                    publish(task.upid, task);
                }
            });
            // Convenience event: subscribe to all task updates with a single event name.
            monitor.filter(
                () => true,
                (task: ClusterTask) => {
                    monitor.emit("task", task);
                }
            );
            this.eventMonitors.set("tasks", monitor);
            return monitor;
        },

        stopListening: (): void => {
            for (const monitor of this.eventMonitors.values()) {
                monitor.destroy();
            }
            this.eventMonitors.clear();
        },
    };

    constructor(options: ClientOptions) {
        this.opts = options;
        this.baseUrl = options.baseUrl.replace(/\/+$/, "");
        this.apiPath = (options.apiPath ?? "/api2/json").replace(/\/+$/, "");
        if (options.fetch) {
            this.fetchImpl = options.fetch;
        } else if (options.agent) {
            this.fetchImpl = native_fetch;
        } else if (typeof globalThis.fetch === "function") {
            this.fetchImpl = globalThis.fetch.bind(globalThis);
        } else {
            this.fetchImpl = native_fetch;
        }
        this.api = createAPI(this);
    }

    /**
     * Log in using username/password (ticket + CSRF).
     * Only applicable if you constructed the client with username/password.
     */
    async login(): Promise<this> {
        if (!("username" in this.opts)) {
            throw new Error("login() is only available for username/password auth.");
        }
        const realm = this.opts.realm ?? "pam";

        // Proxmox: POST /access/ticket with form fields username, password, realm
        const data = await this.request("/access/ticket", 'POST', {
            $body: {username: this.opts.username, password: this.opts.password, realm},
        }) as LoginResponse;

        if (!data.ticket || !data.CSRFPreventionToken) {
            throw new Error("Invalid login response: missing ticket or CSRFPreventionToken.");
        }

        this.auth.ticket = data.ticket;
        this.auth.csrf = data.CSRFPreventionToken;
        return this;
    }

    private buildUrl(path: string, query?: Record<string, unknown>): string {
        const url = new URL(this.baseUrl + this.apiPath + path);
        if (query) {
            for (const [k, v] of Object.entries(query)) {
                if (v === undefined || v === null) continue;
                if (Array.isArray(v)) for (const item of v) url.searchParams.append(k, this.serializeScalar(item));
                else url.searchParams.set(k, this.serializeScalar(v));
            }
        }
        return url.toString();
    }

    url(path: string, query?: Record<string, unknown>): string {
        return this.buildUrl(path, query);
    }

    sessionCookie(): string | undefined {
        if (!this.auth.ticket) return undefined;
        return `PVEAuthCookie=${this.auth.ticket}`;
    }

    tokenAuthorizationHeader(): string | undefined {
        if (!("apiToken" in this.opts)) return undefined;
        return this.opts.apiToken.startsWith("PVEAPIToken=")
            ? this.opts.apiToken
            : `PVEAPIToken=${this.opts.apiToken}`;
    }

    private serializeScalar(value: unknown): string {
        if (typeof value === "boolean") {
            return value ? "1" : "0";
        }
        if (typeof value === "number") {
            if (!Number.isFinite(value)) {
                throw new TypeError(`Invalid number for Proxmox API param: ${value}`);
            }
            return String(value);
        }
        if (typeof value === "symbol") {
            throw new TypeError("Cannot serialize Symbol for Proxmox API param");
        }
        if (typeof value === "undefined" || value === null) {
            throw new TypeError("Cannot serialize undefined/null for Proxmox API param");
        }
        return String(value);
    }

    private encodeForm(body: Record<string, unknown> | undefined): string {
        const sp = new URLSearchParams();
        for (const [k, v] of Object.entries(body ?? {})) {
            if (v === undefined || v === null) continue;
            if (Array.isArray(v)) sp.set(k, JSON.stringify(v));
            else if (typeof v === "object") sp.set(k, JSON.stringify(v));
            else sp.set(k, this.serializeScalar(v));
        }
        return sp.toString();
    }

    private authHeaders(extra?: Record<string, string | undefined> | undefined): Record<string, string> {
        let h: Record<string, string> = Object.fromEntries(Object.entries(extra ?? {}).filter(([, v]) => v !== undefined)) as Record<string, string>

        if ("apiToken" in this.opts) {
            h["Authorization"] = this.opts.apiToken?.startsWith("PVEAPIToken=")
                ? this.opts.apiToken
                : `PVEAPIToken=${this.opts.apiToken}`;
            return h;
        }

        if (this.auth.ticket) h["Cookie"] = `PVEAuthCookie=${this.auth.ticket}`;
        if (this.auth.csrf) h["CSRFPreventionToken"] = this.auth.csrf;
        return h;
    }

    /**
     * Typed request function using the `ProxmoxAPI` mapping.
     * - GET/DELETE use `$query`
     * - POST/PUT/PATCH use `$body` (sent as application/x-www-form-urlencoded, matching Proxmox conventions)
     * - Returns `json.data` when present (Proxmox wraps most results in `{ data: ... }`)
     */
    request = async <P extends keyof API, M extends MethodKey<P>>(
        path: P,
        method: M,
        args: Params<P, M>,
        requestInit?: RequestInit,
    ): Promise<Ret<P, M>> => {
        const a = args as AnyArgs;
        let urlPath = String(path);

        if (a.$path) {
            for (const [k, v] of Object.entries(a.$path)) {
                urlPath = urlPath.replace(`{${k}}`, encodeURIComponent(String(v)));
            }
        }

        const unresolvedPathParams = urlPath.match(/\{[^}]+\}/g);
        if (unresolvedPathParams) {
            throw new Error(`Missing path parameters for ${String(path)}: ${unresolvedPathParams.join(", ")}`);
        }

        const url = this.buildUrl(urlPath, a.$query);
        const headers = this.authHeaders(a.$headers);


        const init: RequestInit & { agent?: Agent | undefined; socketTimeout?: number | undefined } = {
            ...requestInit,
            method: method as string,
            headers: {
                ...requestInit?.headers,
                ...headers,
            },
            agent: this.opts.agent,
            socketTimeout: this.opts.socketTimeout,
        };

        // Determine body to send:
        // - If caller explicitly set $body, use it
        // - For POST/PUT/PATCH with no $body, auto-wrap remaining params (excluding $path/$query/$headers)
        //   Generated factory methods pass body params directly, not wrapped in $body
        let bodyToEncode: Record<string, unknown> | undefined;
        if (a.$body !== undefined) {
            bodyToEncode = a.$body as Record<string, unknown>;
        } else if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            // Collect params that aren't internal ($path, $query, $headers)
            bodyToEncode = {};
            for (const [k, v] of Object.entries(a)) {
                if (k.startsWith('$')) continue;
                if (v === undefined || v === null) continue;
                bodyToEncode[k] = v;
            }
        }

        if (bodyToEncode !== undefined) {
            if (typeof bodyToEncode === "string" || bodyToEncode instanceof Blob) {
                init.body = bodyToEncode as BodyInit;
            } else {
                (init.headers as Record<string, string>)["Content-Type"] = "application/x-www-form-urlencoded";
                init.body = this.encodeForm(bodyToEncode);
            }
        }

        const res = await this.fetchImpl(url, init);

        // Proxmox may return 3xx redirects for action endpoints (e.g., /status/stop)
        // pointing to alternative ports (8443, 443). Rather than following those
        // (which often fail behind firewalls), treat the request as successfully
        // queued — Proxmox returns the task UPID in the response or Location header.
        if (res.status >= 300 && res.status < 400) {
            const location = res.headers.get("location");
            // If location contains a task UPID, extract and return it
            if (location) {
                const upidMatch = location.match(/UPID:[^?]+/);
                if (upidMatch) {
                    return upidMatch[0] as Ret<P, M>;
                }
                // Otherwise throw with the redirect info for debugging
                throw new Error(
                    `Proxmox returned ${res.status} redirect to ${location}. ` +
                    `This typically means the request was processed but redirected to an alternative port.`
                );
            }
            // Body may contain task data even on redirect
            const text = await res.text().catch(() => "");
            if (text.includes("UPID:")) {
                const upidMatch = text.match(/UPID:[^<>\s"']+$/);
                if (upidMatch) return upidMatch[0] as Ret<P, M>;
            }
            throw new Error(`Proxmox returned ${res.status} redirect without actionable response: ${text}`);
        }

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
        }

        const ct = res.headers.get("content-type") || "";
        if (ct.includes("application/json")) {
            const json = await res.json();
            return (json?.data ?? json) as Ret<P, M>;
        }

        return (await res.text()) as Ret<P, M>;
    }

    private getNodeFromUPID(upid: string): string {
        const parts = upid.split(":");
        const node = parts[1];
        if (!node) {
            throw new Error(`Invalid UPID format: '${upid}'`);
        }
        return node;
    }


}

export function createAPI(client: Client): APIClient {
    return (
        {
            access: Access(client),
            cluster: Cluster(client),
            nodes: Nodes(client),
            pools: Pools(client),
            storage: Storage(client),
            version: Version(client)
        }
    ) as const;
}

// Re-export Terminal helpers for convenience
export {
    NoVNCFacade,
    type NoVNCConnectionOptions,
    type NoVNCViewportOptions,
    type NoVNCQualityOptions,
    type NoVNCEventMap,
    type NoVNCEventName,
    type NoVNCReconnectOptions,
    type NoVNCReconnectAttempt,
    Terminal,
    TerminalRenderer,
    TerminalSession,
    TerminalState,
    bridgeTerminalSessionToSocket,
    openTerminalBridge,
    type TerminalTicket,
    type TerminalConnectionInfo,
    type TerminalOpenOptions,
    type TerminalRendererState,
    type TerminalPipe,
    type TerminalBridgeOptions,
    type TerminalBrowserSocket,
    type TerminalBrowserMessage,
};
