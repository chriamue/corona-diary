import { Base64 } from 'js-base64';
import React from 'react';
import Clipboard from "@react-native-community/clipboard";
import AsyncStorage from '@react-native-community/async-storage';
import { Wallet } from '../Wallet';
import {
    ScrollView,
    Text,
    View
} from 'react-native';
import { Icon, Button, ThemeProvider } from 'react-native-elements';
import ConnectionView from './ConnectionView';
import { fromJson as diaryFromJson } from '../DiaryEntry';

interface Props { }
interface State {
    wallet: Wallet | null,
    connections: any[]
}

export default class ConnectionReports extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            wallet: null,
            connections: []
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

        fetch(`https://dev.chriamue.de/api/v1/connections/${pubKeyB64}/${timestampB64}/${signatureB64}`)
            .then(res => res.json()).then(async (body) => {
                const connections: any[] = []
                for (const connection of body) {
                    let cdata = connection.data
                    console.log(cdata)
                    const data = await wallet.decrypt(cdata).catch((e) => console.log(e));
                    if (!data) {
                        continue;
                    }
                    const timestamp = connection.timestamp;
                    const diary = diaryFromJson(data.diary);
                    connections.push({
                        timestamp,
                        diary
                    })
                }
                this.setState({ connections })
            });
    }





    render() {
        const { connections, wallet } = this.state;
        if (!wallet) {
            return null;
        }

        return (<>
            <ScrollView><View>
                <Button title='load Connections' onPress={() => this.loadConnections()} />
                {connections.map((connection, index) => <ConnectionView key={index} connection={connection} />)}
            </View>
            </ScrollView></>)
    }
}
