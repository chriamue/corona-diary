import moment from 'moment';
import React from 'react';
import { View, Dimensions } from 'react-native';
import DatePicker from 'react-native-date-picker'

import Diary from '../Diary';
import { Button, Rating } from 'react-native-elements';


interface Props {
    diary: Diary
}
interface State {
    date: Date,
    rating: number
}

export default class DiaryView extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            date: new Date(),
            rating: 3,
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    save() {

    }

    ratingCompleted(rating: number) {
        this.setState({ rating });
    }

    render() {
        const { diary } = this.props;
        const { date, rating } = this.state
        if (!diary) {
            return null;
        }
        return (
            <View>
                <Rating
                type='heart'
                    //reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
                    startingValue={rating}
                    ratingCount={5}
                    imageSize={40}
                    //showRating
                    onFinishRating={(rating) => this.ratingCompleted(rating)}
                />
                <DatePicker date={date}
                    minimumDate={moment(new Date).subtract(7, 'days').toDate()}
                    maximumDate={new Date()}
                    minuteInterval={30}
                    onDateChange={(date) => this.setState({ date })} />
                <Button title='Save' onPress={() => this.save()} />
            </View>
        )
    }
}
