import ConnectionMessages from './ConnectionMessages';

export default class ConnectionMessageStats {
    messages: ConnectionMessages;

    constructor(messages: ConnectionMessages) {
        this.messages = messages;
    }

    uniqueMd5PubKeys() {
        return Array.from(this.messages.messages.keys())
    }

    md5PubKeysWithSymptoms() {
        const keys = [];
        for (const md5PubKey of this.uniqueMd5PubKeys()) {
            const messages = this.messages.messages.get(md5PubKey) || [];
            for (const message of messages) {
                if (message.diaryEntry.symptoms.length > 0 && !message.diaryEntry.symptoms.includes('NO')) {
                    keys.push(message.md5pubkey);
                    break;
                }
            }
        }
        return keys;
    }

    getWellbeingTimeSeries(md5PubKey: string) {
        const messages = this.messages.messages.get(md5PubKey) || [];
        const x = [];
        const y = [];

        for (const message of messages) {
            const entry = message.diaryEntry
            x.push(entry.timestamp);
            y.push(entry.wellbeing);
        }
        const data = {
            x, y
        }
        return data;
    }

    getLastContact(md5PubKey: string) {
        const messages = this.messages.messages.get(md5PubKey);
        if (!messages) {
            return null;
        }
        const last = messages[messages.length - 1];
        return last.timestamp;
    }

    getAllSymptoms(md5PubKey: string) {
        const messages = this.messages.messages.get(md5PubKey) || [];

        const symptoms = [];
        for (const message of messages) {
            for (const symptom of message.diaryEntry.symptoms) {
                symptoms.push(symptom);
            }
        }
        return Array.from(new Set(symptoms))
    }
}
