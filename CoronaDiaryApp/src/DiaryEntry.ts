import moment from 'moment';

export default class DiaryEntry {
    timestamp: Date;
    wellbeing: number;
    symptoms: string[] = []

    constructor(wellbeing: number, timestamp = new Date()) {
        this.wellbeing = wellbeing;
        this.timestamp = timestamp;
    }

    addSymptoms(symptoms: []) {
        this.symptoms = symptoms;
    }
}
