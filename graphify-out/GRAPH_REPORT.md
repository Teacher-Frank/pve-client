# Graph Report - c:\hrgit\pve-client  (2026-07-07)

## Corpus Check
- 59 files · ~62,194 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 332 nodes · 665 edges · 15 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Cluster API & Auth|Cluster API & Auth]]
- [[_COMMUNITY_Node & Workload API|Node & Workload API]]
- [[_COMMUNITY_Client Core & Fetch|Client Core & Fetch]]
- [[_COMMUNITY_Build & Vite Config|Build & Vite Config]]
- [[_COMMUNITY_Terminal Protocol|Terminal Protocol]]
- [[_COMMUNITY_TimerPulledEventEmitter|TimerPulledEventEmitter]]
- [[_COMMUNITY_VNC Display Protocol|VNC Display Protocol]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_Package Scripts|Package Scripts]]
- [[_COMMUNITY_JSR Registry Config|JSR Registry Config]]
- [[_COMMUNITY_Tasks Example|Tasks Example]]

## God Nodes (most connected - your core abstractions)
1. `Client` - 52 edges
2. `ArgsTuple` - 29 edges
3. `ClusterAPI` - 21 edges
4. `Cluster()` - 18 edges
5. `TimerPulledEventEmitter` - 18 edges
6. `PathContext` - 17 edges
7. `compilerOptions` - 15 edges
8. `scripts` - 14 edges
9. `TerminalSession` - 14 edges
10. `NodesAPI` - 13 edges

## Surprising Connections (you probably didn't know these)
- `createAPI()` --calls--> `Cluster()`  [EXTRACTED]
  src/index.ts → src/api/cluster/index.ts
- `createAPI()` --calls--> `Nodes()`  [EXTRACTED]
  src/index.ts → src/api/nodes/index.ts
- `Cluster()` --calls--> `acmeFactory()`  [EXTRACTED]
  src/api/cluster/index.ts → src/api/cluster/acme.ts
- `Cluster()` --calls--> `backupFactory()`  [EXTRACTED]
  src/api/cluster/index.ts → src/api/cluster/backup.ts
- `Cluster()` --calls--> `cephFactory()`  [EXTRACTED]
  src/api/cluster/index.ts → src/api/cluster/ceph.ts

## Import Cycles
- 3-file cycle: `src/api/nodes/apt.ts -> src/index.ts -> src/api/nodes/index.ts -> src/api/nodes/apt.ts`
- 3-file cycle: `src/api/index.ts -> src/api/pools.ts -> src/index.ts -> src/api/index.ts`
- 3-file cycle: `src/api/nodes/hardware.ts -> src/index.ts -> src/api/nodes/index.ts -> src/api/nodes/hardware.ts`
- 3-file cycle: `src/api/nodes/index.ts -> src/api/nodes/storage.ts -> src/index.ts -> src/api/nodes/index.ts`
- 3-file cycle: `src/api/nodes/firewall.ts -> src/index.ts -> src/api/nodes/index.ts -> src/api/nodes/firewall.ts`
- 3-file cycle: `src/api/index.ts -> src/api/storage.ts -> src/index.ts -> src/api/index.ts`
- 3-file cycle: `src/api/index.ts -> src/api/version.ts -> src/index.ts -> src/api/index.ts`
- 3-file cycle: `src/api/nodes/ceph.ts -> src/index.ts -> src/api/nodes/index.ts -> src/api/nodes/ceph.ts`
- 3-file cycle: `src/api/nodes/disks.ts -> src/index.ts -> src/api/nodes/index.ts -> src/api/nodes/disks.ts`
- 3-file cycle: `src/api/nodes/index.ts -> src/api/nodes/lxc.ts -> src/index.ts -> src/api/nodes/index.ts`
- 3-file cycle: `src/api/nodes/index.ts -> src/api/nodes/qemu.ts -> src/index.ts -> src/api/nodes/index.ts`
- 4-file cycle: `src/api/index.ts -> src/api/pools.ts -> src/index.ts -> src/api/nodes/index.ts -> src/api/index.ts`
- 4-file cycle: `src/api/index.ts -> src/api/storage.ts -> src/index.ts -> src/api/nodes/index.ts -> src/api/index.ts`
- 4-file cycle: `src/api/index.ts -> src/api/version.ts -> src/index.ts -> src/api/nodes/index.ts -> src/api/index.ts`
- 5-file cycle: `src/api/index.ts -> src/api/pools.ts -> src/index.ts -> src/api/nodes/index.ts -> src/api/nodes/apt.ts -> src/api/index.ts`
- 5-file cycle: `src/api/index.ts -> src/api/storage.ts -> src/index.ts -> src/api/nodes/index.ts -> src/api/nodes/apt.ts -> src/api/index.ts`
- 5-file cycle: `src/api/index.ts -> src/api/version.ts -> src/index.ts -> src/api/nodes/index.ts -> src/api/nodes/apt.ts -> src/api/index.ts`
- 5-file cycle: `src/api/index.ts -> src/api/pools.ts -> src/index.ts -> src/api/nodes/index.ts -> src/api/nodes/ceph.ts -> src/api/index.ts`
- 5-file cycle: `src/api/index.ts -> src/api/pools.ts -> src/index.ts -> src/api/nodes/index.ts -> src/api/nodes/disks.ts -> src/api/index.ts`
- 5-file cycle: `src/api/index.ts -> src/api/pools.ts -> src/index.ts -> src/api/nodes/index.ts -> src/api/nodes/firewall.ts -> src/api/index.ts`

## Communities (15 total, 0 thin omitted)

### Community 0 - "Cluster API & Auth"
Cohesion: 0.10
Nodes (32): AccessAPI, acmeFactory(), backupFactory(), cephFactory(), configFactory(), firewallFactory(), haFactory(), Cluster() (+24 more)

### Community 1 - "Node & Workload API"
Cohesion: 0.09
Nodes (31): HttpMethod, RequestInput, aptFactory(), cephFactory(), stripPath(), disksFactory(), stripPath(), firewallFactory() (+23 more)

### Community 2 - "Client Core & Fetch"
Cohesion: 0.06
Nodes (25): client, AnyArgs, API, MethodKey, Params, Ret, AnyAgent, bodyToBuffer() (+17 more)

### Community 3 - "Build & Vite Config"
Cohesion: 0.06
Nodes (30): author, bugs, url, description, engines, node, exports, files (+22 more)

### Community 4 - "Terminal Protocol"
Cohesion: 0.10
Nodes (12): ClusterResource, rawToBuffer(), SocketBuildResult, SocketFactory, Terminal, TerminalConnectionInfo, TerminalOpenOptions, TerminalPipe (+4 more)

### Community 5 - "TimerPulledEventEmitter"
Cohesion: 0.09
Nodes (11): EventFilter, EventFilterListener, EventFilterPredicate, EventKey, EventValueMap, ManagedEventKey, NodeEventMap, PullContext (+3 more)

### Community 6 - "VNC Display Protocol"
Cohesion: 0.14
Nodes (10): dependencies, ws, Display, DisplayConnectionInfo, DisplayOpenOptions, DisplayPipe, DisplaySession, DisplayTicket (+2 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (17): compilerOptions, declaration, emitDeclarationOnly, esModuleInterop, forceConsistentCasingInFileNames, lib, module, moduleResolution (+9 more)

### Community 8 - "Dev Dependencies"
Cohesion: 0.12
Nodes (17): devDependencies, @semantic-release/changelog, @semantic-release/commit-analyzer, @semantic-release/git, @semantic-release/npm, @semantic-release/release-notes-generator, @sourceregistry/semantic-release-jsr, tsx (+9 more)

### Community 9 - "Package Scripts"
Cohesion: 0.14
Nodes (14): scripts, build, check, docs:build, example/auth, example/tasks, example/terminal, lint (+6 more)

### Community 10 - "JSR Registry Config"
Cohesion: 0.25
Nodes (7): exports, name, publish, exclude, include, $schema, version

### Community 11 - "Tasks Example"
Cohesion: 0.38
Nodes (6): apiToken, baseUrl, client, env(), main(), requireEnv()

## Knowledge Gaps
- **137 isolated node(s):** `baseUrl`, `apiToken`, `client`, `client`, `$schema` (+132 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ws` connect `VNC Display Protocol` to `Terminal Protocol`?**
  _High betweenness centrality (0.282) - this node is a cross-community bridge._
- **Why does `dependencies` connect `VNC Display Protocol` to `Build & Vite Config`?**
  _High betweenness centrality (0.276) - this node is a cross-community bridge._
- **What connects `baseUrl`, `apiToken`, `client` to the rest of the system?**
  _137 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Cluster API & Auth` be split into smaller, more focused modules?**
  _Cohesion score 0.09903846153846153 - nodes in this community are weakly interconnected._
- **Should `Node & Workload API` be split into smaller, more focused modules?**
  _Cohesion score 0.09393939393939393 - nodes in this community are weakly interconnected._
- **Should `Client Core & Fetch` be split into smaller, more focused modules?**
  _Cohesion score 0.059743954480796585 - nodes in this community are weakly interconnected._
- **Should `Build & Vite Config` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._