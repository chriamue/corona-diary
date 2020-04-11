export default class Connection{
    pubkey: string;
    timestamp: Date;

    constructor(pubkey: string, timestamp: Date){
        this.pubkey = pubkey;
        this.timestamp = timestamp;
    }
}