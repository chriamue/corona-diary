import moment from 'moment';
import { Connection } from '../connection';

test('accumulate', () => {
    const pubKey = 'pubkey'
    const connection1 = new Connection(pubKey, new Date(), new Date());

    const connection2 = new Connection(pubKey,
        moment(new Date()).add(2, 'minutes').toDate(),
        moment(new Date()).add(3, 'minutes').toDate())

    const connection3 = connection1.accumulate(
        connection2, moment.duration(5, 'minutes'))

    expect(connection1.start).toBe(connection3?.start);
    expect(connection2.end).toBe(connection3?.end);
    expect(connection1.accumulate(
        connection2, moment.duration(1, 'minutes'))).toBe(null)

})