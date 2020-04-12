import moment from 'moment';
import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import DatePicker from 'react-native-date-picker'

import Diary from '../Diary';
import { Button, Rating } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import DiaryEntry from '../DiaryEntry';
import DiaryStats from '../DiaryStats';
import Plotly from 'react-native-plotly';


interface Props {
    diary: Diary,
    onNewEntry: any,
}
interface State {
    date: Date,
    rating: number,
    symptoms: any[]
}

export default class DiaryView extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            date: new Date(),
            rating: 3,
            symptoms: []
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    save() {
        const entry = new DiaryEntry(this.state.rating, this.state.date);
        entry.addSymptoms(this.state.symptoms)
        this.props.onNewEntry(entry);
    }

    ratingCompleted(rating: number) {
        this.setState({ rating });
    }

    handleSymptoms(selectedSymptoms: any) {
        this.setState({ symptoms: selectedSymptoms })
    };

    symptomOptions() {
        const options: any[] = [
            { id: 'FEVER', name: 'Fever' },
            { id: 'COUGH', name: 'Cough' },
            { id: 'BREATH', name: 'Shortness of breath' },
            { id: 'NO', name: 'No' }
        ]
        return options;
    }

    renderStats() {
        const diaryStats = new DiaryStats(this.props.diary);
        const diaryData = diaryStats.getWellbeingTimeSeries();
        const data = {
            x: diaryData.x,
            y: diaryData.y,
            type: 'scatter',
        };
        const layout = { title: 'My Wellbeing!' };
        return (<Plotly
            data={[data]}
            layout={layout}
            config={{displayModeBar: false}}
        />)
    }

    render() {
        const { diary } = this.props;
        const { date, rating, symptoms } = this.state
        if (!diary) {
            return null;
        }
        return (<>
            <View style={{ height: 250 }}>
                {this.renderStats()}
            </View>

            <View>

                <Rating
                    type='heart'
                    startingValue={rating}
                    ratingCount={5}
                    imageSize={40}
                    onFinishRating={(rating) => this.ratingCompleted(rating)}
                />
                <ScrollView horizontal>
                    <MultiSelect
                        hideTags
                        hideSubmitButton
                        hideDropdown
                        items={this.symptomOptions()}
                        uniqueKey="id"
                        selectedItems={symptoms}
                        onSelectedItemsChange={(selectedItems: any[]) => this.handleSymptoms(selectedItems)}
                    /></ScrollView>
                <View>
                    <DatePicker date={date}
                        minimumDate={moment(new Date).subtract(7, 'days').toDate()}
                        maximumDate={new Date()}
                        minuteInterval={30}
                        onDateChange={(date) => this.setState({ date })} />
                </View>
                <Button title='Save' onPress={() => this.save()} />
            </View></>
        )
    }
}
