import Connections from './Connections';

export default class ConnectionStats {
    connections: Connections;

    constructor(connections: Connections) {
        this.connections = connections;
    }

    countLast5Min() {
        if (!this.connections) {
            return 0;
        }
        let count = 0;
        const now = Date.now();
        for (const connection of this.connections.connections) {
            console.log(typeof(connection), connection)
            if (connection.end.getTime() > now - 1000 * 60 * 5) {
                count += 1;
            }
        }
        return count;
    }

    // source: https://stackoverflow.com/questions/43855166/how-to-tell-if-two-dates-are-in-the-same-day
    sameDay(d1: Date, d2: Date) {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    }

    getCommits() {
        const commitsData: any[] = [

        ]
        for (const connection of this.connections.connections) {
            let newData = true;
            for (const data of commitsData) {

                if (this.sameDay(data.date, connection.end)) {
                    data.count = data.count + 1;
                    newData = false;
                    break;
                }
            }
            if (newData) {
                commitsData.push({
                    date: connection.end,
                    count: 1
                })
            }
        }
        return commitsData;
    }
}