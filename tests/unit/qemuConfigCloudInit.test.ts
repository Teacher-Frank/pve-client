import { describe, it, expectTypeOf } from 'vitest';
import type { NodesAPI } from '../../src/api/nodes/types.js';

/**
 * Canary test: cicommand is NOT a valid Proxmox QEMU config parameter.
 *
 * Background:
 * - `action-template-deployers.ts` in Datalab Selfservice added a `cicommand`
 *   parameter to the PUT /nodes/{node}/qemu/{vmid}/config body, intending to
 *   auto-install qemu-guest-agent via cloud-init on first boot.
 * - This parameter does not exist in the Proxmox API.
 * - The Proxmox API will silently ignore or reject unknown parameters.
 *
 * Source of truth:
 * https://pve.proxmox.com/pve-docs/api-viewer/#/nodes/{node}/qemu/{vmid}/config
 *
 * Valid cloud-init parameters (all exist in the type definition):
 * - cicustom    — path to custom cloud-init ISO
 * - cipassword  — password for ciuser
 * - citype      — format: configdrive2 | nocloud | opennebula
 * - ciupgrade   — boolean: run apt upgrade on first boot
 * - ciuser      — username for cloud-init
 * - ipconfig[n] — IP address and gateway configuration
 * - nameserver  — DNS server IP
 * - searchdomain — DNS search domains
 * - sshkeys     — public SSH keys
 *
 * This test will fail to compile if `cicommand` is ever accidentally added
 * to the NodesAPI type definitions, serving as a permanent canary.
 */
describe('QEMU config — cicommand does not exist', () => {
    type QemuConfig = NodesAPI['/nodes/{node}/qemu/{vmid}/config'];
    type PutBody = QemuConfig['PUT']['parameters']['$body'];
    type PostBody = QemuConfig['POST']['parameters']['$body'];

    it('PUT body does NOT have cicommand', () => {
        // This assertion verifies that 'cicommand' is not a property
        // of the QEMU config PUT body type. If someone adds it to types.ts,
        // this test will fail to compile, alerting them to the fact that
        // cicommand is not a real Proxmox API parameter.
        expectTypeOf<PutBody>().not.toHaveProperty('cicommand');
    });

    it('POST body does NOT have cicommand', () => {
        expectTypeOf<PostBody>().not.toHaveProperty('cicommand');
    });

    describe('Valid cloud-init parameters DO exist', () => {
        it('PUT body has cicustom', () => {
            expectTypeOf<PutBody>().toHaveProperty('cicustom');
        });

        it('PUT body has cipassword', () => {
            expectTypeOf<PutBody>().toHaveProperty('cipassword');
        });

        it('PUT body has citype', () => {
            expectTypeOf<PutBody>().toHaveProperty('citype');
        });

        it('PUT body has ciupgrade', () => {
            expectTypeOf<PutBody>().toHaveProperty('ciupgrade');
        });

        it('PUT body has ciuser', () => {
            expectTypeOf<PutBody>().toHaveProperty('ciuser');
        });

        it('PUT body has ipconfig[n]', () => {
            expectTypeOf<PutBody>().toHaveProperty('ipconfig[n]');
        });

        it('PUT body has nameserver', () => {
            expectTypeOf<PutBody>().toHaveProperty('nameserver');
        });

        it('PUT body has searchdomain', () => {
            expectTypeOf<PutBody>().toHaveProperty('searchdomain');
        });

        it('PUT body has sshkeys', () => {
            expectTypeOf<PutBody>().toHaveProperty('sshkeys');
        });
    });
});
