
export function fromJson(json: any){
    const entry = new DiaryEntry(json.wellbeing, json.timestamp);
    entry.symptoms = json.symptoms;
    return entry;
}

export default class DiaryEntry {
    timestamp: Date;
    wellbeing: number;
    symptoms: string[] = []

    constructor(wellbeing: number, timestamp = new Date()) {
        this.wellbeing = wellbeing;
        this.timestamp = timestamp;
    }

    addSymptoms(symptoms: string[]) {
        this.symptoms = symptoms;
    }

    json() {
        return {
            wellbeing: this.wellbeing,
            timestamp: this.timestamp,
            symptoms: this.symptoms
        }
    }
}
