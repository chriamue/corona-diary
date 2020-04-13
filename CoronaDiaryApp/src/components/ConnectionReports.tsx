import { Base64 } from 'js-base64';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { CORONA_DIARY_SERVER } from 'react-native-dotenv'
import { Wallet } from '../Wallet';
import {
    ScrollView,
    Text,
    View
} from 'react-native';
import { Icon, Button, ThemeProvider } from 'react-native-elements';
import Plotly from 'react-native-plotly';
import ConnectionView from './ConnectionView';
import { fromJson as diaryFromJson } from '../DiaryEntry';
import { fromJson as connectionMessageFromJson } from '../ConnectionMessage';
import ConnectionMessageStats from '../ConnectionMessageStats';
import ConnectionMessages from '../ConnectionMessages';

interface Props { }
interface State {
    wallet: Wallet | null,
    connections: ConnectionMessages
}

export default class ConnectionReports extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            wallet: null,
            connections: new ConnectionMessages()
        };
    }

    componentDidMount() {
        this.loadWallet();
    }

    async loadWallet() {

        try {
            const privkey = await AsyncStorage.getItem('@privkey')
            const pubkey = await AsyncStorage.getItem('@pubkey')
            if (privkey !== null && pubkey != null) {
                const wallet = new Wallet();
                wallet.privateKey = privkey;
                wallet.publicKey = pubkey;
                this.setState({ wallet });
            }
        } catch (e) {
            console.log(e);
        }
    }

    async loadConnections() {
        const { wallet } = this.state;
        if (!wallet) {
            return;
        }
        const timestamp = Date.now().toString();

        const pubKey = wallet.getPublicKey();
        const signature = await wallet.sign(`${pubKey}${timestamp}`)

        const pubKeyB64 = Base64.encode(pubKey);
        const timestampB64 = Base64.encode(timestamp);
        const signatureB64 = Base64.encode(signature);

        console.log(CORONA_DIARY_SERVER)

        const connections = new ConnectionMessages();

        fetch(`https://${CORONA_DIARY_SERVER}/api/v1/connections/${pubKeyB64}/${timestampB64}/${signatureB64}`)
            .then(res => res.json()).then(async (body) => {
                for (const connection of body) {
                    try {
                        let cdata = connection.data
                        const data = await wallet.decrypt(cdata).catch((e) => console.log(e));
                        if (!data) {
                            continue;
                        }
                        const message = connectionMessageFromJson(data);
                        connections.add(message)
                    } catch (err) {
                        console.log(err);
                    }
                }
                this.setState({ connections })
            });
    }

    renderStats() {
        const data = []
        const stats = new ConnectionMessageStats(this.state.connections);
        for (const md5PubKey of stats.uniqueMd5PubKeys()) {
            const diaryData = stats.getWellbeingTimeSeries(md5PubKey);
            data.push({
                x: diaryData.x,
                y: diaryData.y,
                name: md5PubKey,
                mode: 'lines'
            });
        }
        if (data.length < 1) {
            return;
        }
        const layout = { showlegend: false, title: 'Connections Wellbeing' };
        return (
            <View style={{ height: 350, width: 400 }}>
                <Plotly key={'connections-plot'}
                    data={data}
                    layout={layout}
                    config={{ displayModeBar: false }}
                />
            </View>)
    }
    renderList() {
        const connections = this.state.connections;
        const list = []
        for (const key of connections.messages.keys()) {
            const connection = connections.messages.get(key);
            list.push(<><ConnectionView key={`connection-view-${key}`} md5PubKey={key} connections={connections} /></>)
        }
        return list;
    }

    render() {
        const { wallet } = this.state;
        if (!wallet) {
            return null;
        }

        return (<>
            <ScrollView>
                {this.renderStats()}
                <View>
                    <Button title='load Connections' onPress={() => this.loadConnections()} />
                    {this.renderList()}
                </View>
            </ScrollView></>)
    }
}
