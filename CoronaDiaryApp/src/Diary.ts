import { List } from 'immutable';
import DiaryEntry from './DiaryEntry';

export default class Diary {
    entries: List<DiaryEntry>;

    constructor() {
        this.entries = List<DiaryEntry>();
    }

    addEntry(entry: DiaryEntry) {
        this.entries = this.entries.push(entry);
    }

    getSymptoms() {
        const symptoms = [];
        for (const entry of this.entries) {
            for (const symptom of entry.symptoms) {
                symptoms.push(symptom);
            }
        }
        return Array.from(new Set(symptoms))
    }
}
