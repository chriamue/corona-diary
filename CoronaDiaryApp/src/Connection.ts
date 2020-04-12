import moment from 'moment';

export default class Connection {
    pubkey: string;
    start: Date;
    end: Date;

    constructor(pubkey: string, timestamp: Date) {
        this.pubkey = pubkey;
        this.start = timestamp;
        this.end = timestamp;
    }

    accumulate(other: Connection, duration: moment.Duration): Connection | null {
        if (this.pubkey == other.pubkey && this.start < other.start && moment(this.end).add(duration).toDate() > other.start) {
            this.end = other.end;
            return this
        }
        return null;
    }
}