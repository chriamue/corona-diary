import { Connection } from '../connection';
import { ConnectionLogs } from '../connectionLogs';

test('pub keys', () => {
    const logs = new ConnectionLogs();
    const connection1 = new Connection('pubkey1', new Date(), new Date());
    logs.add(connection1);
    const connection2 = new Connection('pubkey1', new Date(), new Date());
    logs.add(connection2);
    expect(logs.getPublicKeys().length).toBe(1)
    const connection3 = new Connection('pubkey3', new Date(), new Date());
    logs.add(connection3);
    expect(logs.getPublicKeys().length).toBe(2);

    expect(logs.getPubKeyConnections('pubkey1').length).toBe(2)
    expect(logs.getPubKeyConnections('pubkey3').length).toBe(1)
})