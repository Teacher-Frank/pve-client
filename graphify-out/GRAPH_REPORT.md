# Graph Report - C:/hrgit/pve-client  (2026-07-06)

## Corpus Check
- 141 files · ~110,577 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 586 nodes · 1136 edges · 37 communities (31 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_WebSocket Dependencies|WebSocket Dependencies]]
- [[_COMMUNITY_Docs Generated Assets|Docs Generated Assets]]
- [[_COMMUNITY_APT API|APT API]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_Package Configuration|Package Configuration]]
- [[_COMMUNITY_Timer-Pulled Event Emitter|Timer-Pulled Event Emitter]]
- [[_COMMUNITY_Cluster API Tests|Cluster API Tests]]
- [[_COMMUNITY_ACME Cluster API|ACME Cluster API]]
- [[_COMMUNITY_ACME Factory|ACME Factory]]
- [[_COMMUNITY_Auth Example|Auth Example]]
- [[_COMMUNITY_noVNC Facade|noVNC Facade]]
- [[_COMMUNITY_Display Helpers|Display Helpers]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Package Scripts|Package Scripts]]
- [[_COMMUNITY_noVNC Type Definitions|noVNC Type Definitions]]
- [[_COMMUNITY_Terminal Type Definitions|Terminal Type Definitions]]
- [[_COMMUNITY_noVNC Helpers|noVNC Helpers]]
- [[_COMMUNITY_Fetch Layer|Fetch Layer]]
- [[_COMMUNITY_Terminal Local Example|Terminal Local Example]]
- [[_COMMUNITY_JSR Package Entry|JSR Package Entry]]
- [[_COMMUNITY_noVNC Backoff Logic|noVNC Backoff Logic]]
- [[_COMMUNITY_Tasks Live Example|Tasks Live Example]]
- [[_COMMUNITY_Storage API|Storage API]]
- [[_COMMUNITY_noVNC Types|noVNC Types]]
- [[_COMMUNITY_ESLint TypeScript Config|ESLint TypeScript Config]]
- [[_COMMUNITY_Docs Icons|Docs Icons]]
- [[_COMMUNITY_Unit Test Include Directive|Unit Test Include Directive]]
- [[_COMMUNITY_Shared Mock Setup|Shared Mock Setup]]

## God Nodes (most connected - your core abstractions)
1. `Client` - 69 edges
2. `NoVNCFacade` - 34 edges
3. `ArgsTuple` - 26 edges
4. `Cluster()` - 24 edges
5. `bridgeTerminalSessionToSocket()` - 22 edges
6. `TerminalSession` - 21 edges
7. `ClusterAPI` - 20 edges
8. `TimerPulledEventEmitter` - 20 edges
9. `RFB` - 19 edges
10. `PathContext` - 16 edges

## Surprising Connections (you probably didn't know these)
- `main()` --calls--> `attachLocalPromptNudge()`  [EXTRACTED]
  examples/terminal-local.ts → src/helpers/LocalPromptNudge.ts
- `createAPI()` --calls--> `Cluster()`  [EXTRACTED]
  src/index.ts → src/api/cluster/index.ts
- `createAPI()` --calls--> `Nodes()`  [EXTRACTED]
  src/index.ts → src/api/nodes/index.ts
- `Cluster()` --calls--> `acmeFactory()`  [EXTRACTED]
  src/api/cluster/index.ts → src/api/cluster/acme.ts
- `Cluster()` --calls--> `backupFactory()`  [EXTRACTED]
  src/api/cluster/index.ts → src/api/cluster/backup.ts

## Import Cycles
- 2-file cycle: `src/helpers/Terminal.ts -> src/helpers/terminal-utils.ts -> src/helpers/Terminal.ts`
- 2-file cycle: `src/helpers/Terminal.ts -> src/helpers/terminal-bridge.ts -> src/helpers/Terminal.ts`
- 3-file cycle: `src/api/index.ts -> src/api/pools.ts -> src/index.ts -> src/api/index.ts`
- 3-file cycle: `src/api/index.ts -> src/api/version.ts -> src/index.ts -> src/api/index.ts`
- 3-file cycle: `src/helpers/Terminal.ts -> src/helpers/terminal-bridge.ts -> src/helpers/terminal-utils.ts -> src/helpers/Terminal.ts`

## Communities (37 total, 6 thin omitted)

### Community 0 - "WebSocket Dependencies"
Cohesion: 0.07
Nodes (30): ws, bridgeTerminalSessionToSocket(), openTerminalBridge(), ClusterResource, SocketBuildResult, SocketFactory, Terminal, TerminalBridgeOptions (+22 more)

### Community 1 - "Docs Generated Assets"
Cohesion: 0.08
Nodes (47): add(), Ae(), at(), Be(), Ce(), constructor(), createComponents(), De() (+39 more)

### Community 2 - "APT API"
Cohesion: 0.09
Nodes (33): aptFactory(), cephFactory(), stripPath(), disksFactory(), stripPath(), firewallFactory(), stripPath(), hardwareFactory() (+25 more)

### Community 3 - "Dev Dependencies"
Cohesion: 0.05
Nodes (40): devDependencies, eslint, @eslint/js, eslint-plugin-react, globals, @semantic-release/changelog, @semantic-release/commit-analyzer, @semantic-release/git (+32 more)

### Community 4 - "Package Configuration"
Cohesion: 0.05
Nodes (36): author, bugs, url, dependencies, @novnc/novnc, terminal.js, wcwidth, description (+28 more)

### Community 5 - "Timer-Pulled Event Emitter"
Cohesion: 0.08
Nodes (11): EventFilter, EventFilterListener, EventFilterPredicate, EventKey, EventValueMap, ManagedEventKey, NodeEventMap, PullContext (+3 more)

### Community 6 - "Cluster API Tests"
Cohesion: 0.07
Nodes (22): VersionAPI, AccessScopedAPI, APIClient, AuthState, ClientOptions, ClusterResource, ClusterScopedAPI, ClusterTask (+14 more)

### Community 7 - "ACME Cluster API"
Cohesion: 0.20
Nodes (12): C, ClusterAPI, AnyArgs, API, ArgsTuple, BodyOf, HttpMethod, MethodKey (+4 more)

### Community 8 - "ACME Factory"
Cohesion: 0.15
Nodes (17): acmeFactory(), backupFactory(), cephFactory(), configFactory(), firewallFactory(), haFactory(), Cluster(), jobsFactory() (+9 more)

### Community 9 - "Auth Example"
Cohesion: 0.12
Nodes (3): AccessAPI, PoolsAPI, Client

### Community 11 - "Display Helpers"
Cohesion: 0.14
Nodes (9): ClusterResource, Display, DisplayConnectionInfo, DisplayOpenOptions, DisplayPipe, DisplaySession, DisplayTicket, rawToBuffer() (+1 more)

### Community 12 - "TypeScript Config"
Cohesion: 0.11
Nodes (17): compilerOptions, declaration, emitDeclarationOnly, esModuleInterop, forceConsistentCasingInFileNames, lib, module, moduleResolution (+9 more)

### Community 13 - "Package Scripts"
Cohesion: 0.13
Nodes (15): scripts, build, check, docs, example/auth, example/tasks, example/terminal, lint (+7 more)

### Community 15 - "Terminal Type Definitions"
Cohesion: 0.13
Nodes (5): TermCell, Terminal, terminal.js, TerminalOptions, TermState

### Community 16 - "noVNC Helpers"
Cohesion: 0.17
Nodes (7): NoVNCConnectionOptions, NoVNCEventMap, NoVNCEventName, NoVNCQualityOptions, NoVNCReconnectAttempt, NoVNCViewportOptions, RetryableError

### Community 17 - "Fetch Layer"
Cohesion: 0.31
Nodes (6): AnyAgent, bodyToBuffer(), isHttps(), mergeHeaders(), native_fetch(), NativeFetchInit

### Community 18 - "Terminal Local Example"
Cohesion: 0.33
Nodes (4): client, main(), attachLocalPromptNudge(), PromptNudgeSession

### Community 19 - "JSR Package Entry"
Cohesion: 0.25
Nodes (7): exports, name, publish, exclude, include, $schema, version

### Community 21 - "Tasks Live Example"
Cohesion: 0.38
Nodes (6): apiToken, baseUrl, client, env(), main(), requireEnv()

### Community 22 - "Storage API"
Cohesion: 0.40
Nodes (3): Storage(), StorageAPI, createAPI()

### Community 23 - "noVNC Types"
Cohesion: 0.40
Nodes (4): @novnc/novnc, RFBCapabilities, RFBCredentials, RFBOptions

### Community 25 - "ESLint TypeScript Config"
Cohesion: 0.50
Nodes (3): exclude, extends, include

## Knowledge Gaps
- **183 isolated node(s):** `baseUrl`, `apiToken`, `client`, `client`, `$schema` (+178 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ws` connect `WebSocket Dependencies` to `Display Helpers`, `Package Configuration`?**
  _High betweenness centrality (0.207) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Package Configuration` to `WebSocket Dependencies`?**
  _High betweenness centrality (0.206) - this node is a cross-community bridge._
- **Why does `NoVNCFacade` connect `noVNC Facade` to `noVNC Helpers`, `noVNC Connect Logic`, `noVNC Backoff Logic`, `Cluster API Tests`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **What connects `baseUrl`, `apiToken`, `client` to the rest of the system?**
  _183 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `WebSocket Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07242063492063493 - nodes in this community are weakly interconnected._
- **Should `Docs Generated Assets` be split into smaller, more focused modules?**
  _Cohesion score 0.07744107744107744 - nodes in this community are weakly interconnected._
- **Should `APT API` be split into smaller, more focused modules?**
  _Cohesion score 0.09306122448979592 - nodes in this community are weakly interconnected._