import DiaryEntry, { fromJson as diaryEntryFromJson } from './DiaryEntry';

export function fromJson(json: any) {
    console.log(json)
    const entry = diaryEntryFromJson(json.diaryentry);
    const message = new ConnectionMessage(json.md5pubkey, new Date(json.timestamp), entry);
    return message;
}

export default class ConnectionMessage {
    md5pubkey: string;
    timestamp: Date;
    diaryEntry: DiaryEntry;

    constructor(md5pubkey: string, timestamp: Date, diaryEntry: DiaryEntry) {
        this.md5pubkey = md5pubkey;
        this.timestamp = timestamp;
        this.diaryEntry = diaryEntry;
    }

    json() {
        return {
            md5pubkey: this.md5pubkey,
            diaryentry: this.diaryEntry.json(),
            timestamp: this.timestamp.toUTCString()
        }
    }
}