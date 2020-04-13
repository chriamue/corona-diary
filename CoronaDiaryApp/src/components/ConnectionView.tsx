import React from 'react';
import {
    ScrollView,
    View
} from 'react-native';
import { Text, Rating } from 'react-native-elements';
import * as Progress from 'react-native-progress';

import { Icon, Badge } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLungsVirus, faWalking, faHeadSideCough, faThermometerThreeQuarters, faHandshake } from '@fortawesome/free-solid-svg-icons'
import ConnectionMessage from '../ConnectionMessage';
import ConnectionMessageStats from '../ConnectionMessageStats';
import ConnectionMessages from '../ConnectionMessages';

interface Props {
    md5PubKey: string,
    connections: ConnectionMessages
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
                    return <Badge key={`symptom-badge-${symptom}`} status="error" />
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
                    return <FontAwesomeIcon key={`symptom-${symptom}`} icon={faThermometerThreeQuarters} />
                } else if (symptom == 'COUGH') {
                    return <FontAwesomeIcon icon={faHeadSideCough} />
                } else if (symptom == 'BREATH') {
                    return <FontAwesomeIcon icon={faLungsVirus} />
                } else {
                    return <FontAwesomeIcon icon={faWalking} />
                }
            })
        } catch (e) {
            return null;
        }
    }

    renderWellbeingExpanded(wellbeing: number) {
        return Array.from({ length: wellbeing }, (_, index) => <Icon key={`heart-${index}`} size={12} color={'red'} name='heart' type='font-awesome' />)
    }

    renderWellbeing(wellbeing: number) {
        return <Progress.Pie progress={wellbeing * 1.0 / 5} color='red' size={12} />
    }

    renderEntry() {
        const { connections, md5PubKey } = this.props;
        const { expand } = this.state;
        if (expand) {
            const messages = connections.messages.get(md5PubKey);
            return messages?.map((message) => {
                console.log(message.diaryEntry.symptoms)
                return <ScrollView horizontal key={`entry-${message.timestamp}`}>
                    <Text>{message.diaryEntry.timestamp.toString()}</Text>
                    {this.renderSymptomsExpanded(message.diaryEntry.symptoms)}
                    {this.renderWellbeingExpanded(message.diaryEntry.wellbeing)}
                </ScrollView>
            })
        }
        const stats = new ConnectionMessageStats(connections);
        return <ScrollView horizontal>
            {this.renderSymptomsExpanded(stats.getAllSymptoms(md5PubKey))}
        </ScrollView>
    }

    render() {
        const { connections, md5PubKey } = this.props;
        const { expand } = this.state;
        const stats = new ConnectionMessageStats(connections);
        const timestamp = stats.getLastContact(md5PubKey);
        return <ScrollView horizontal={!expand}>
            <FontAwesomeIcon icon={faHandshake} /><Text onPress={() => this.setState({ expand: !expand })}>{timestamp?.toString()}</Text>
            <View>{this.renderEntry()}</View>
        </ScrollView>
    }
}
