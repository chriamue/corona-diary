import { List } from 'immutable';
import AsyncStorage from '@react-native-community/async-storage';
import DiaryEntry from './DiaryEntry';

export async function loadDiary() {
    try {
        const diary: Diary = await AsyncStorage.getItem('@diary').then((data) => {
            if (data == null) {
                return new Diary();
            }
            const diary: Diary = fromJson(data);
            return diary;
        });
        return diary;
    } catch (e) {
        console.log(e);
    }
}

export async function saveDiary(diary: Diary) {
    return AsyncStorage.setItem('@diary', diary.toJson());
}

export function fromJson(json: any): Diary {
    const obj = JSON.parse(json)
    const diary: Diary = new Diary();
    for (const entry of obj.entries) {
        const e = new DiaryEntry(entry.wellbeing, new Date(entry.timestamp));
        e.symptoms = entry.symptoms;
        diary.addEntry(e);
    }
    return diary;
}

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

    toJson(): string {
        return JSON.stringify(this);
    }

    sortedEntries() {
        let entries = this.entries;
        entries = entries.sort((a, b) => {
            if (a.timestamp > b.timestamp) {
                return 1;
            }
            if (a.timestamp < b.timestamp) {
                return -1;
            }

            return 0;
        });
        return entries;
    }
}
