import moment from 'moment';

export function accumulate(connections: Connection[], duration: moment.Duration): Connection[] {
    const newConnections: Connection[] = [];
    return newConnections;
}

export function accumulatePubKey(pubKey: string, connections: Connection[], duration: moment.Duration) {
    const newConnections: Connection[] = [];
    return newConnections;
}
export class Connection {

    start: Date = new Date();
    end: Date = new Date();
    pubKey: string = '';

    constructor(pubKey: string, start: Date, end: Date) {
        this.pubKey = pubKey;
        this.start = start;
        this.end = end;
    }

    addDuration(duration: moment.Duration) {
        this.end = moment(this.end).add(duration).toDate()
    }

    accumulate(other: Connection, duration: moment.Duration): Connection | null {
        if (this.pubKey == other.pubKey && this.start < other.start && moment(this.end).add(duration).toDate() > other.start) {
            return new Connection(this.pubKey, this.start, other.end)
        }
        return null;
    }
}