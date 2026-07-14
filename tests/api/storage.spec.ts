import { describe, it, expect, vi } from 'vitest';
import Storage from '../../src/api/storage';
import { Client } from '../../src/index.js';

describe('Storage API', () => {
  it('should export a function', () => {
    expect(typeof Storage).toBe('function');
  });

  it('should create API object with expected endpoints', () => {
    const client = {} as unknown as Client;
    const api = Storage(client);
    expect(api).toHaveProperty('index');
    expect(api).toHaveProperty('create');
    expect(api).toHaveProperty('storage');
  });

  it('should handle missing client gracefully', () => {
    expect(() => Storage(undefined as unknown as Client)).not.toThrow();
  });

  it('should call index endpoint and return storage list', () => {
    const client = { request: vi.fn().mockReturnValue([{ storage: 'local', type: 'dir' }]) } as unknown as Client;
    const api = Storage(client);
    const result = api.index();
    expect(result).toEqual([{ storage: 'local', type: 'dir' }]);
    expect(client.request).toHaveBeenCalledWith('/storage', 'GET', {});
  });

  it('should call create endpoint', () => {
    const client = { request: vi.fn().mockReturnValue({ storage: 'new', type: 'dir' }) } as unknown as Client;
    const api = Storage(client);
    const result = api.create({ $body: { storage: 'new', type: 'dir' } });
    expect(result).toEqual({ storage: 'new', type: 'dir' });
    expect(client.request).toHaveBeenCalledWith('/storage', 'POST', { $body: { storage: 'new', type: 'dir' } });
  });

  it('should call storage sub-endpoints', () => {
    const client = { request: vi.fn().mockReturnValue({ storage: 'local', type: 'dir' }) } as unknown as Client;
    const api = Storage(client);
    const storageApi = api.storage('local');
    const result = storageApi.read();
    expect(result).toEqual({ storage: 'local', type: 'dir' });
    expect(client.request).toHaveBeenCalledWith('/storage/{storage}', 'GET', { $path: { storage: 'local' } });
  });

  // Datalab Selfservice gap: test that index returns expected structure for UI
  it('should return an array of storage objects with storage and type fields (Datalab Selfservice gap)', () => {
    const client = { request: vi.fn().mockReturnValue([{ storage: 'local', type: 'dir' }, { storage: 'backup', type: 'pbs' }]) } as unknown as Client;
    const api = Storage(client);
    const result = api.index();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('storage');
    expect(result[0]).toHaveProperty('type');
    expect(result[1]).toHaveProperty('storage');
    expect(result[1]).toHaveProperty('type');
  });
});

