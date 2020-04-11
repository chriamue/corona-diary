import { List } from 'immutable';
import moment from 'moment';
import Connection from './Connection';

export default class Connections {
    connections: List<Connection>;
    minutesToAccumulate: number;

    constructor(minutesToAccumulate: number) {
        this.connections = List<Connection>()
        this.minutesToAccumulate = minutesToAccumulate;
    }

    add(connection: Connection): Connections {
        const connections = [];
        const duration = moment.duration(this.minutesToAccumulate, 'minutes');
        let merged = false;
        for (const con of this.connections) {
            if (con.accumulate(connection, duration) != null) {
                merged = true;
            }
            connections.push(con);
        }
        if (!merged) {
            connections.push(connection);
        }
        this.connections = List<Connection>(connections);
        return this;
    }
}