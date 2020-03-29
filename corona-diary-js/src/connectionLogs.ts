import { Connection } from './connection';

export class ConnectionLogs {

    data: Connection[] = []

    add(connection: Connection) {
        this.data.push(connection);
    }

    getPublicKeys(): string[] {
        const set = new Set<string>()
        for (const connection of this.data) {
            set.add(connection.pubKey);
        }
        return Array.from(set);
    }

    getPubKeyConnections(pubKey: string): Connection[] {
        return this.data.filter((connection: Connection) => connection.pubKey == pubKey);
    }

}