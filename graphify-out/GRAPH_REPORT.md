# Graph Report - pve-client  (2026-07-06)

## Corpus Check
- 122 files · ~124,803 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 885 nodes · 1445 edges · 61 communities (50 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9fed3ade`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

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
- [[_COMMUNITY_Platform Features -- Mem0 Platform|Platform Features -- Mem0 Platform]]
- [[_COMMUNITY_Mem0 Use Cases & Examples|Mem0 Use Cases & Examples]]
- [[_COMMUNITY_Mem0 Platform Architecture|Mem0 Platform Architecture]]
- [[_COMMUNITY_Platform Client|Platform Client]]
- [[_COMMUNITY_Mem0 SDK Guide|Mem0 SDK Guide]]
- [[_COMMUNITY_Mem0 Platform Integration|Mem0 Platform Integration]]
- [[_COMMUNITY_Mem0 Platform API Reference|Mem0 Platform API Reference]]
- [[_COMMUNITY_Mem0 Skill for Claude|Mem0 Skill for Claude]]
- [[_COMMUNITY_Mem0 Integration Patterns|Mem0 Integration Patterns]]
- [[_COMMUNITY_mem0_doc_search.py|mem0_doc_search.py]]
- [[_COMMUNITY_Python vs TypeScript SDK Differences|Python vs TypeScript SDK Differences]]
- [[_COMMUNITY_Mem0 Platform Quickstart|Mem0 Platform Quickstart]]
- [[_COMMUNITY_Mem0 Node.js  TypeScript SDK Reference|Mem0 Node.js / TypeScript SDK Reference]]
- [[_COMMUNITY_Methods|Methods]]
- [[_COMMUNITY_dependencies|dependencies]]
- [[_COMMUNITY_exports|exports]]
- [[_COMMUNITY_release|release]]
- [[_COMMUNITY_repository|repository]]
- [[_COMMUNITY_lxc.ts|lxc.ts]]
- [[_COMMUNITY_vite.config.ts|vite.config.ts]]
- [[_COMMUNITY_engines|engines]]
- [[_COMMUNITY_overrides|overrides]]
- [[_COMMUNITY_publishConfig|publishConfig]]

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

## Communities (61 total, 11 thin omitted)

### Community 0 - "WebSocket Dependencies"
Cohesion: 0.07
Nodes (30): ws, bridgeTerminalSessionToSocket(), openTerminalBridge(), ClusterResource, SocketBuildResult, SocketFactory, Terminal, TerminalBridgeOptions (+22 more)

### Community 1 - "Docs Generated Assets"
Cohesion: 0.08
Nodes (47): add(), Ae(), at(), Be(), Ce(), constructor(), createComponents(), De() (+39 more)

### Community 2 - "APT API"
Cohesion: 0.10
Nodes (31): aptFactory(), cephFactory(), stripPath(), disksFactory(), stripPath(), firewallFactory(), stripPath(), hardwareFactory() (+23 more)

### Community 3 - "Dev Dependencies"
Cohesion: 0.05
Nodes (40): devDependencies, eslint, @eslint/js, eslint-plugin-react, globals, @semantic-release/changelog, @semantic-release/commit-analyzer, @semantic-release/git (+32 more)

### Community 4 - "Package Configuration"
Cohesion: 0.13
Nodes (14): author, bugs, url, description, files, homepage, keywords, license (+6 more)

### Community 5 - "Timer-Pulled Event Emitter"
Cohesion: 0.08
Nodes (11): EventFilter, EventFilterListener, EventFilterPredicate, EventKey, EventValueMap, ManagedEventKey, NodeEventMap, PullContext (+3 more)

### Community 6 - "Cluster API Tests"
Cohesion: 0.07
Nodes (25): Storage(), StorageAPI, VersionAPI, AccessScopedAPI, APIClient, AuthState, ClientOptions, ClusterResource (+17 more)

### Community 7 - "ACME Cluster API"
Cohesion: 0.20
Nodes (12): C, ClusterAPI, AnyArgs, API, ArgsTuple, BodyOf, HttpMethod, MethodKey (+4 more)

### Community 8 - "ACME Factory"
Cohesion: 0.15
Nodes (17): acmeFactory(), backupFactory(), cephFactory(), configFactory(), firewallFactory(), haFactory(), Cluster(), jobsFactory() (+9 more)

### Community 9 - "Auth Example"
Cohesion: 0.10
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
Cohesion: 0.05
Nodes (39): add(messages, **kwargs), add(messages, *, user_id, agent_id, run_id, metadata, infer=True), AsyncMemory, AsyncMemoryClient (Asynchronous), batch_delete(memories), Batch Methods, batch_update(memories), Configuration (+31 more)

### Community 23 - "noVNC Types"
Cohesion: 0.40
Nodes (4): @novnc/novnc, RFBCapabilities, RFBCredentials, RFBOptions

### Community 25 - "ESLint TypeScript Config"
Cohesion: 0.50
Nodes (3): exclude, extends, include

### Community 37 - "Platform Features -- Mem0 Platform"
Cohesion: 0.05
Nodes (42): Advanced Retrieval, Available MCP Tools, Best Practices, Configuration, Configuration, Create Webhook, Criteria Retrieval, Custom Categories (+34 more)

### Community 38 - "Mem0 Use Cases & Examples"
Cohesion: 0.05
Nodes (36): 1. Personalized AI Companion, 2. Customer Support with Categories, 3. Healthcare Coach, 4. Content Creation Workflow, 5. Multi-Agent / Multi-Tenant, 6. Personalized Search, 7. Email Intelligence, Common Patterns Across Use Cases (+28 more)

### Community 39 - "Mem0 Platform Architecture"
Cohesion: 0.06
Nodes (30): Comparison with Alternatives, Conversation memory, Core Concept, Creation, Critical: cross-entity queries, Deletion, Extraction modes, How layering works in practice (+22 more)

### Community 40 - "Platform Client"
Cohesion: 0.09
Nodes (22): add(messages, options?), Batch Methods, batchDelete(memories), batchUpdate(memories), delete(memoryId), deleteAll(options?), deleteUser(data) / deleteUsers(data), Export (+14 more)

### Community 41 - "Mem0 SDK Guide"
Cohesion: 0.11
Nodes (18): add() -- Store Memories, Additional Methods, Advanced Add Options, Batch Operations (TypeScript), Breaking Changes in v3, Common Filter Patterns, Common Pitfalls, delete() / deleteAll() -- Remove Memories (+10 more)

### Community 42 - "Mem0 Platform Integration"
Cohesion: 0.12
Nodes (16): Add memories, Client SDK References, Common edge cases, Common integration pattern, Delete a memory, Get all memories, Live documentation search, Mem0 Platform Integration (+8 more)

### Community 43 - "Mem0 Platform API Reference"
Cohesion: 0.15
Nodes (13): Add Response (v3), Endpoints, Filter Constraints, Filter System, Filterable Fields, Get All Response (v3), Mem0 Platform API Reference, Memory Object Structure (+5 more)

### Community 44 - "Mem0 Skill for Claude"
Cohesion: 0.17
Nodes (11): Claude.ai, Claude API (Skills API), CLI (Claude Code, OpenCode, OpenClaw, or any tool that supports skills), Installation, License, Links, Mem0 Skill for Claude, Prerequisites (+3 more)

### Community 45 - "Mem0 Integration Patterns"
Cohesion: 0.17
Nodes (12): All Supported Frameworks, AutoGen, Common Pattern, CrewAI, LangChain, LangGraph, LlamaIndex, Mem0 Integration Patterns (+4 more)

### Community 46 - "mem0_doc_search.py"
Cohesion: 0.27
Nodes (11): fetch_page(), fetch_url(), get_index(), list_section(), main(), Fetch a specific documentation page., Fetch the full documentation index from llms.txt., List all known pages in a documentation section. (+3 more)

### Community 47 - "Python vs TypeScript SDK Differences"
Cohesion: 0.18
Nodes (11): Architectural Differences, Common Gotcha, Constructor, Entity ID Passing (v3), Method Naming, OSS Config Naming, OSS Scope Parameter Naming, Parameter Passing (+3 more)

### Community 49 - "Mem0 Platform Quickstart"
Cohesion: 0.25
Nodes (8): Async Client, cURL, Mem0 Platform Quickstart, Next Steps, Prerequisites, Python Setup, Sample Response, TypeScript / JavaScript Setup

### Community 50 - "Mem0 Node.js / TypeScript SDK Reference"
Cohesion: 0.29
Nodes (7): Configuration, Installation, Key Differences: Platform vs OSS, Mem0 Node.js / TypeScript SDK Reference, Memory Class, Open Source / Self-Hosted, v2 Compatibility

### Community 51 - "Methods"
Cohesion: 0.40
Nodes (4): add(messages, config), get(memoryId) / getAll(config) / update(memoryId, data) / delete(memoryId) / deleteAll(config) / history(memoryId), Methods, search(query, config)

### Community 52 - "dependencies"
Cohesion: 0.50
Nodes (4): dependencies, @novnc/novnc, terminal.js, wcwidth

### Community 53 - "exports"
Cohesion: 0.50
Nodes (4): exports, import, require, types

### Community 54 - "release"
Cohesion: 0.67
Nodes (3): release, branches, plugins

### Community 55 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

## Knowledge Gaps
- **392 isolated node(s):** `What This Skill Does`, `CLI (Claude Code, OpenCode, OpenClaw, or any tool that supports skills)`, `Claude.ai`, `Claude API (Skills API)`, `Prerequisites` (+387 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ws` connect `WebSocket Dependencies` to `Display Helpers`, `dependencies`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `WebSocket Dependencies`, `Package Configuration`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `NoVNCFacade` connect `noVNC Facade` to `noVNC Helpers`, `noVNC Connect Logic`, `noVNC Backoff Logic`, `Cluster API Tests`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **What connects `What This Skill Does`, `CLI (Claude Code, OpenCode, OpenClaw, or any tool that supports skills)`, `Claude.ai` to the rest of the system?**
  _397 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `WebSocket Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07242063492063493 - nodes in this community are weakly interconnected._
- **Should `Docs Generated Assets` be split into smaller, more focused modules?**
  _Cohesion score 0.07744107744107744 - nodes in this community are weakly interconnected._
- **Should `APT API` be split into smaller, more focused modules?**
  _Cohesion score 0.09898242368177614 - nodes in this community are weakly interconnected._