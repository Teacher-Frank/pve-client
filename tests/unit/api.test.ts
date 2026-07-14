import {describe, expect, it, vi} from 'vitest';
import {Client} from '../../src/index.js';

describe('API Endpoints', () => {
	it('calls /version endpoint', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue({version: '1.2.3'} as never);

		const result = await client.api.version.version();

		expect(requestSpy).toHaveBeenCalledWith('/version', 'GET', {});
		expect(result).toEqual({version: '1.2.3'});
	});

	it('calls /access/users endpoint', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue([{userid: 'root@pam'}] as never);

		const result = await client.api.access.users.index();

		expect(requestSpy).toHaveBeenCalledWith('/access/users', 'GET', {});
		expect(result).toEqual([{userid: 'root@pam'}]);
	});

	// Regression: cluster.status was a statusFactory sub-object, not a callable.
	//   Caused: "TypeError: client.api.cluster.status is not a function"
	it('calls GET /cluster/status via client.api.cluster.status()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const mockStatus = [{ id: 'pve', name: 'pve', type: 'cluster' as const }];
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue(mockStatus as never);

		const result = await client.api.cluster.status();

		expect(requestSpy).toHaveBeenCalledWith('/cluster/status', 'GET', {});
		expect(result).toEqual(mockStatus);
	});

	// Regression: client.api.cluster.nextid was missing, causing the runtime error:
	//   "TypeError: clusterApi.nextid is not a function" in clone-from-template
	it('calls GET /cluster/nextid via client.api.cluster.nextid()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue(200 as never);

		const result = await client.api.cluster.nextid();

		expect(requestSpy).toHaveBeenCalledWith('/cluster/nextid', 'GET', {});
		expect(result).toBe(200);
	});

	it('calls GET /cluster/nextid with optional vmid query param', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue(300 as never);

		const result = await client.api.cluster.nextid({ $query: { vmid: 300 } });

		expect(requestSpy).toHaveBeenCalledWith('/cluster/nextid', 'GET', { $query: { vmid: 300 } });
		expect(result).toBe(300);
	});

	// Regression: client.api.nodes.list was missing, causing the runtime error:
	//   "Connection/auth error: TypeError: client.api.nodes.list is not a function"
	it('calls GET /nodes via client.api.nodes.list()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const mockNodes = [{ node: 'pve', status: 'online' }];
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue(mockNodes as never);

		const result = await client.api.nodes.list();

		expect(requestSpy).toHaveBeenCalledWith('/nodes', 'GET', {});
		expect(result).toEqual(mockNodes);
	});

	it('client.api.nodes.get(node) returns node-scoped sub-APIs', () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});

		const nodeApi = client.api.nodes.get('pve');

		expect(typeof nodeApi.qemu).toBe('object');
		expect(typeof nodeApi.lxc).toBe('object');
	});

	// Regression: nodes.get(node).qemu.list passed args as node param, producing
	//   "GET /nodes/[object Object]/qemu" and HTTP 501 from Proxmox.
	it('nodes.get(node).qemu.list pre-binds node and calls GET /nodes/{node}/qemu', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue([] as never);

		await client.api.nodes.get('pve').qemu.list({ $path: { node: 'pve' } });

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/qemu',
			'GET',
			expect.objectContaining({ $path: { node: 'pve' } })
		);
	});

	// Regression: nodes.get(node).lxc.list passed args as node param, producing
	//   "GET /nodes/[object Object]/lxc" and HTTP 501 from Proxmox.
	it('nodes.get(node).lxc.list pre-binds node and calls GET /nodes/{node}/lxc', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue([] as never);

		await client.api.nodes.get('pve').lxc.list({ $path: { node: 'pve' } });

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/lxc',
			'GET',
			expect.objectContaining({ $path: { node: 'pve' } })
		);
	});

	// Regression: nodes.get(node).storage was missing, causing:
	//   "nodeApi.storage is missing or not an object. Cannot enumerate storages or LXC templates."
	it('nodes.get(node).storage.list calls GET /nodes/{node}/storage with pre-bound node', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const mockStorages = [{ storage: 'local', type: 'dir', content: 'vztmpl,iso' }];
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue(mockStorages as never);

		const result = await client.api.nodes.get('pve').storage.list();

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/storage',
			'GET',
			expect.objectContaining({ $path: { node: 'pve' } })
		);
		expect(result).toEqual(mockStorages);
	});

	it('nodes.get(node).storage.get(name).content.list calls GET /nodes/{node}/storage/{storage}/content', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const mockContent = [{ volid: 'local:vztmpl/ubuntu.tar.gz', format: 'tgz', size: 1000, content: 'vztmpl' }];
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue(mockContent as never);

		const result = await client.api.nodes.get('pve').storage.get('local').content.list({
			$query: { content: 'vztmpl' },
		});

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/storage/{storage}/content',
			'GET',
			expect.objectContaining({ $path: { node: 'pve', storage: 'local' }, $query: { content: 'vztmpl' } })
		);
		expect(result).toEqual(mockContent);
	});

	// Regression: nodes.get(node).qemu.vmid was missing, causing:
	//   "TypeError: typedNodeApi.qemu.vmid is not a function" in clone-from-template
	it('calls POST /nodes/{node}/qemu/{vmid}/clone via nodes.get(node).qemu.vmid(id).clone()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue('UPID:pve:001:clone' as never);

		const upid = await client.api.nodes.get('pve').qemu.vmid(101).clone({
			$body: { newid: 200, name: 'cloned-vm', full: 1 },
		});

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/qemu/{vmid}/clone',
			'POST',
			expect.objectContaining({ $path: { node: 'pve', vmid: 101 } })
		);
		expect(upid).toBe('UPID:pve:001:clone');
	});

	// Regression: nodes.get(node).lxc.id was missing, causing the same pattern
	//   for LXC container clone operations
	it('calls POST /nodes/{node}/lxc/{vmid}/clone via nodes.get(node).lxc.id(vmid).clone()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue('UPID:pve:002:clone' as never);

		const upid = await client.api.nodes.get('pve').lxc.id(201).clone({
			$body: { newid: 300, hostname: 'cloned-ct', full: 1 },
		});

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/lxc/{vmid}/clone',
			'POST',
			expect.objectContaining({ $path: { node: 'pve', vmid: 201 } })
		);
		expect(upid).toBe('UPID:pve:002:clone');
	});

	// Regression: nodes.get(node).tasks was missing, so tasklog always returned []
	//   and never refreshed in the UI
	it('nodes.get(node).tasks.list pre-binds node and calls GET /nodes/{node}/tasks', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const mockTasks = [{ id: 'task1', node: 'pve', starttime: 1000, type: 'qmstart', user: 'root@pam', upid: 'UPID:pve:001', pid: 1, pstart: 1 }];
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue(mockTasks as never);

		const result = await client.api.nodes.get('pve').tasks.list({ $query: { limit: 10, source: 'all' } });

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/tasks',
			'GET',
			expect.objectContaining({ $path: { node: 'pve' } })
		);
		expect(result).toBe(mockTasks);
	});

	// Regression: apt, ceph, disks, firewall, hardware sub-APIs in nodes.get(node)
	//   were not pre-bound, requiring callers to pass node manually
	it('nodes.get(node).apt.index pre-binds node and calls GET /nodes/{node}/apt', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const mockAptData = { pending: 0, upgrade_available: 'bash' };
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue(mockAptData as never);

		const result = await client.api.nodes.get('pve').apt.index();

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/apt',
			'GET',
			expect.objectContaining({ $path: { node: 'pve' } })
		);
		expect(result).toBe(mockAptData);
	});

	it('nodes.get(node).disks.list pre-binds node and calls GET /nodes/{node}/disks', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const mockDisks = [{ devpath: '/dev/sda', used: true }];
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue(mockDisks as never);

		const result = await client.api.nodes.get('pve').disks.list();

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/disks',
			'GET',
			expect.objectContaining({ $path: { node: 'pve' } })
		);
		expect(result).toBe(mockDisks);
	});

	it('nodes.get(node).hardware.pci.get pre-binds node and calls GET /nodes/{node}/hardware/pci', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const mockPci = [{ class: '0106', device: 'SATA Controller', vendor: 'Intel' }];
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue(mockPci as never);

		const result = await client.api.nodes.get('pve').hardware.pci.get();

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/hardware/pci',
			'GET',
			expect.objectContaining({ $path: { node: 'pve' } })
		);
		expect(result).toBe(mockPci);
	});

	// Usage: Datalab Selfservice creates LXC containers with nodeApi.lxc.create({$body})
	// node-scoped API already pre-binds node from nodes.get(node)
	it('calls POST /nodes/{node}/lxc via nodeApi.lxc.create(args)', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue('UPID:pve:001:create' as never);

		const nodeApi = client.api.nodes.get('pve');
		const upid = await (nodeApi.lxc as Record<string, unknown>).create({
			$body: {
				vmid: 100,
				ostemplate: 'local:vztmpl/debian-12-standard_12.2-1_amd64.tar.zst',
				hostname: 'test-ct',
			},
		});

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/lxc',
			'POST',
			expect.objectContaining({
				$path: { node: 'pve' },
				$body: expect.objectContaining({ vmid: 100, hostname: 'test-ct' }),
			})
		);
		expect(upid).toBe('UPID:pve:001:create');
	});

	// Usage: Datalab Selfservice creates VMs with nodeApi.qemu.create({$body})
	// node-scoped API already pre-binds node from nodes.get(node)
	it('calls POST /nodes/{node}/qemu via nodeApi.qemu.create(args)', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue('UPID:pve:002:create' as never);

		const nodeApi = client.api.nodes.get('pve');
		const upid = await (nodeApi.qemu as Record<string, unknown>).create({
			$body: {
				vmid: 200,
				name: 'test-vm',
				memory: 2048,
			},
		});

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/qemu',
			'POST',
			expect.objectContaining({
				$path: { node: 'pve' },
				$body: expect.objectContaining({ vmid: 200, name: 'test-vm' }),
			})
		);
		expect(upid).toBe('UPID:pve:002:create');
	});

	// Usage: Datalab Selfservice calls guestApi.status.start() where guestApi = nodeApi.qemu.vmid(id)
	// Currently vmid(id) only has clone method; needs status.start/stop/reboot
	it('calls POST /nodes/{node}/qemu/{vmid}/status/start via nodes.get(node).qemu.vmid(id).status.start()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue('UPID:pve:003:start' as never);

		const vmApi = client.api.nodes.get('pve').qemu.vmid(200) as Record<string, unknown>;
		const upid = await (vmApi.status as Record<string, unknown>).start();

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/qemu/{vmid}/status/start',
			'POST',
			expect.objectContaining({ $path: { node: 'pve', vmid: 200 } })
		);
		expect(upid).toBe('UPID:pve:003:start');
	});

	// Usage: Datalab Selfservice calls guestApi.status.stop() where guestApi = nodeApi.qemu.vmid(id)
	it('calls POST /nodes/{node}/qemu/{vmid}/status/stop via nodes.get(node).qemu.vmid(id).status.stop()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue('UPID:pve:004:stop' as never);

		const vmApi = client.api.nodes.get('pve').qemu.vmid(200) as Record<string, unknown>;
		const upid = await (vmApi.status as Record<string, unknown>).stop();

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/qemu/{vmid}/status/stop',
			'POST',
			expect.objectContaining({ $path: { node: 'pve', vmid: 200 } })
		);
		expect(upid).toBe('UPID:pve:004:stop');
	});

	// Usage: Datalab Selfservice calls guestApi.status.reboot() where guestApi = nodeApi.qemu.vmid(id)
	it('calls POST /nodes/{node}/qemu/{vmid}/status/reboot via nodes.get(node).qemu.vmid(id).status.reboot()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue('UPID:pve:005:reboot' as never);

		const vmApi = client.api.nodes.get('pve').qemu.vmid(200) as Record<string, unknown>;
		const upid = await (vmApi.status as Record<string, unknown>).reboot();

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/qemu/{vmid}/status/reboot',
			'POST',
			expect.objectContaining({ $path: { node: 'pve', vmid: 200 } })
		);
		expect(upid).toBe('UPID:pve:005:reboot');
	});

	// Usage: Datalab Selfservice calls guestApi.status.start() where guestApi = nodeApi.lxc.id(id)
	it('calls POST /nodes/{node}/lxc/{vmid}/status/start via nodes.get(node).lxc.id(vmid).status.start()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue('UPID:pve:006:start' as never);

		const ctApi = client.api.nodes.get('pve').lxc.id(100) as Record<string, unknown>;
		const upid = await (ctApi.status as Record<string, unknown>).start();

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/lxc/{vmid}/status/start',
			'POST',
			expect.objectContaining({ $path: { node: 'pve', vmid: 100 } })
		);
		expect(upid).toBe('UPID:pve:006:start');
	});

	// Usage: Datalab Selfservice calls guestApi.status.stop() where guestApi = nodeApi.lxc.id(id)
	it('calls POST /nodes/{node}/lxc/{vmid}/status/stop via nodes.get(node).lxc.id(vmid).status.stop()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue('UPID:pve:007:stop' as never);

		const ctApi = client.api.nodes.get('pve').lxc.id(100) as Record<string, unknown>;
		const upid = await (ctApi.status as Record<string, unknown>).stop();

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/lxc/{vmid}/status/stop',
			'POST',
			expect.objectContaining({ $path: { node: 'pve', vmid: 100 } })
		);
		expect(upid).toBe('UPID:pve:007:stop');
	});

	// Usage: Datalab Selfservice calls guestApi.status.reboot() where guestApi = nodeApi.lxc.id(id)
	// For LXC, reboot is actually via /status/reboot endpoint
	it('calls POST /nodes/{node}/lxc/{vmid}/status/reboot via nodes.get(node).lxc.id(vmid).status.reboot()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue('UPID:pve:008:reboot' as never);

		const ctApi = client.api.nodes.get('pve').lxc.id(100) as Record<string, unknown>;
		const upid = await (ctApi.status as Record<string, unknown>).reboot();

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/lxc/{vmid}/status/reboot',
			'POST',
			expect.objectContaining({ $path: { node: 'pve', vmid: 100 } })
		);
		expect(upid).toBe('UPID:pve:008:reboot');
	});

	// Regression: nodes.get(node).qemu.vmid(id).delete was missing, causing:
	//   "TypeError: guestApi.delete is not a function" when removing a VM.
	it('calls DELETE /nodes/{node}/qemu/{vmid} via nodes.get(node).qemu.vmid(id).delete()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue('UPID:pve:009:destroy' as never);

		const upid = await client.api.nodes.get('pve').qemu.vmid(101).delete({ $body: { purge: 1 } });

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/qemu/{vmid}',
			'DELETE',
			expect.objectContaining({ $path: { node: 'pve', vmid: 101 } })
		);
		expect(upid).toBe('UPID:pve:009:destroy');
	});

	// Regression: nodes.get(node).lxc.id(vmid).delete was missing, causing:
	//   "TypeError: guestApi.delete is not a function" when removing a container.
	it('calls DELETE /nodes/{node}/lxc/{vmid} via nodes.get(node).lxc.id(vmid).delete()', async () => {
		const client = new Client({
			baseUrl: 'https://pve.local',
			apiToken: 'token',
			fetch: vi.fn(),
		});
		const requestSpy = vi.spyOn(client, 'request').mockResolvedValue('UPID:pve:010:destroy' as never);

		const upid = await client.api.nodes.get('pve').lxc.id(100).delete({ $body: { purge: 1 } });

		expect(requestSpy).toHaveBeenCalledWith(
			'/nodes/{node}/lxc/{vmid}',
			'DELETE',
			expect.objectContaining({ $path: { node: 'pve', vmid: 100 } })
		);
		expect(upid).toBe('UPID:pve:010:destroy');
	});
});
