import { ConnectionStorage } from './connectionStorage';

export class ConnectionStorageMemory implements ConnectionStorage {

    connections: any[] = []

    async addConnection(publicKey: string, data: any, signature: string) {
        this.connections.push({ publicKey, data, signature });
    }
    async getConnections(publicKey: string) {
        const connections = [];
        for (const connection of this.connections) {
            if (connection.publicKey == publicKey) {
                connections.push(connection)
            }
        }
        return connections;
    }

}