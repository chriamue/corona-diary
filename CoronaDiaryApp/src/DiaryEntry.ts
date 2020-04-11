import moment from 'moment';

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
