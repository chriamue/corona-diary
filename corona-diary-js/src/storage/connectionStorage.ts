export interface ConnectionStorage {
    addConnection(publicKey: string, data: any, signature: string): Promise<void>;
    getConnections(publicKey: string): Promise<any[]>;
}