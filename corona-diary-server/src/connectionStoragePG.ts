import { Client } from 'pg';
import { ConnectionStorage } from 'corona-diary';
import md5 from 'md5';

export class ConnectionStoragePG implements ConnectionStorage {

    connections: any[] = []
    client: Client;

    constructor() {
        this.client = new Client({
            password: "postgres",
            user: "postgres",
            host: "postgres",
        });
    }

    async connect() {
        await this.client.connect();
        return this.createTable();
    }

    async createTable() {
        const queryText =
            `CREATE TABLE IF NOT EXISTS
            connections(
                pubkey VARCHAR(32) NOT NULL,
                data TEXT NOT NULL,
                signature TEXT NOT NULL,
                timestamp TIMESTAMP,
                PRIMARY KEY (pubkey, timestamp)
            )`;
        return this.client.query(queryText);
    }

    async addConnection(publicKey: string, data: any, signature: string) {
        console.log(md5(publicKey))
        const queryText = 'INSERT INTO connections(pubkey, data, signature, timestamp) VALUES($1, $2, $3, $4) RETURNING *'
        const values = [md5(publicKey), data, signature, new Date()]

        return this.client.query(queryText, values, (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                console.log(res)
            }
        })
    }
    async getConnections(publicKey: string) {
        const queryText = 'SELECT * FROM connections where pubkey = $1';
        const values = [md5(publicKey)];

        const connections: any[] = [];
        await this.client.query(queryText, values).then((res) => {
            console.log(res.rows);
            for (const row of res.rows) {
                connections.push(row);
            }
        })
        return connections;
    }

    async connected() {
        return await this.client.query("SELECT 1 + 1").then(() => true).catch(() => false);
    }

}

export const instance = new ConnectionStoragePG();
instance.connect();
