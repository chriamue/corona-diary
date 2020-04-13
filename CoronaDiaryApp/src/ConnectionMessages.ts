import ConnectionMessage from './ConnectionMessage';

export default class ConnectionMessages {
    messages: Map<string, ConnectionMessage[]> = new Map();

    constructor() {
    }

    add(message: ConnectionMessage) {
        const key = message.md5pubkey;
        let messages = this.messages.get(key) || []
        messages.push(message);
        messages = messages.sort((a, b) => {
            if (a.diaryEntry.timestamp > b.diaryEntry.timestamp) {
                return 1;
            }
            if (a.diaryEntry.timestamp < b.diaryEntry.timestamp) {
                return -1;
            }
            return 0;
        });
        this.messages.set(key, messages);
    }
}