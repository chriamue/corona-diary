import { List } from 'immutable';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Connection from './Connection';

export async function loadConnections(component: React.Component) {
    try {
        const connections: Connections = await AsyncStorage.getItem('@connections').then((data) => {
            if (data == null) {
                return new Connections(5);
            }
            const connections: Connections = fromJson(data);
            return connections;
        });
        console.log(connections);
        component.setState({ connections });
    } catch (e) {
        console.log(e);
    }
}

export async function saveConnections(connections: Connections) {
    return AsyncStorage.setItem('@connections', connections.toJson());
}

export function fromJson(json: any): Connections {
    const obj = JSON.parse(json)
    const connections: Connections = new Connections(obj.minutesToAccumulate);
    for (const connection of obj.connections) {
        const c = new Connection(connection.pubkey, new Date(connection.start));
        c.end = new Date(connection.end);
        connections.add(c);
    }
    return connections;
}

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

    toJson(): string {
        return JSON.stringify(this);
    }
}