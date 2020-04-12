import Diary from './Diary';

export default class DiaryStats {
    diary: Diary;

    constructor(diary: Diary) {
        this.diary = diary;
    }

    getWellbeingTimeSeries() {
        const x = [];
        const y = [];
        for (const entry of this.diary.entries) {
            x.push(entry.timestamp);
            y.push(entry.wellbeing);
        }
        const data = {
            x, y
        }
        return data;
    }
}