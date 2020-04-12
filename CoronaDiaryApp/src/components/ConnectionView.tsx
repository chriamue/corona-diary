import React from 'react';
import {
    ScrollView
} from 'react-native';
import { Text, Rating } from 'react-native-elements';
import * as Progress from 'react-native-progress';

import { Icon, Badge } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLungsVirus, faWalking, faHeadSideCough, faThermometerThreeQuarters, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'

interface Props {
    connection: any
}
interface State {
    expand: boolean
}

export default class ConnectionView extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            expand: false
        };
    }

    renderSymptoms(symptoms: string[]) {
        try {
            return symptoms.map((symptom) => {
                if (symptom == 'FEVER') {
                    return <Badge status="error" />
                } else if (symptom == 'COUGH') {
                    return <Badge status="warning" />
                } else if (symptom == 'BREATH') {
                    return <Badge status="primary" />
                } else {
                    return null;
                }
            })
        } catch (e) {
            return null;
        }
    }

    renderSymptomsExpanded(symptoms: string[]) {
        try {
            return symptoms.map((symptom) => {
                if (symptom == 'FEVER') {
                    return <FontAwesomeIcon icon={ faThermometerThreeQuarters }/>
                } else if (symptom == 'COUGH') {
                    return <FontAwesomeIcon icon={ faHeadSideCough }/>
                } else if (symptom == 'BREATH') {
                    return <FontAwesomeIcon icon={ faLungsVirus }/>
                } else {
                    return <FontAwesomeIcon icon={ faWalking }/>
                }
            })
        } catch (e) {
            return null;
        }
    }

    renderWellbeingExpanded(wellbeing: number) {
        return Array.from({ length: wellbeing }, (_, index) => <Icon key={`heart-${index}`} name='heart' type='font-awesome' />)
    }

    renderWellbeing(wellbeing: number) {
        return <Progress.Pie progress={wellbeing * 1.0 / 5} color='red' size={10} />
    }

    render() {
        const { connection } = this.props;
        const { expand } = this.state;
        return <ScrollView horizontal><Text onPress={() => this.setState({ expand: !expand })}>[{connection.timestamp}]</Text>
            {expand ? this.renderSymptomsExpanded(connection.diary.symptoms) : this.renderSymptoms(connection.diary.symptoms)}
            {expand ? this.renderWellbeingExpanded(connection.diary.wellbeing) : this.renderWellbeing(connection.diary.wellbeing)}
        </ScrollView>
    }
}
