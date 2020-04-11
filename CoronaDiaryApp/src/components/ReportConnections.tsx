import { Base64 } from 'js-base64';
import md5 from 'md5';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-elements';
import { List } from 'immutable';
import { Wallet } from '../Wallet';
import Connection from '../Connection';
import Connections from '../Connections';

interface Props { connections: Connections }
interface State {
    wallet: Wallet | null
}

export default class ReportConnections extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            wallet: null
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

    async informConnection(connection: Connection) {
        const bobPubKey = connection.pubkey
        console.log(bobPubKey)
        const aliceWallet = this.state.wallet;
        if (!aliceWallet) {
            return;
        }

        const bobWalletAtAlice = new Wallet();
        bobWalletAtAlice.import(bobPubKey);


        const alicePubKey = aliceWallet.getPublicKey();


        const timestamp = Date.now().toString();
        const auth_signature = await aliceWallet.sign(`${alicePubKey}${timestamp}`)

        const alicePubKeyB64 = Base64.encode(alicePubKey);
        const timestampB64 = Base64.encode(timestamp);
        const signatureB64 = Base64.encode(auth_signature);

        const message = 'infected';

        const data = await bobWalletAtAlice.encrypt({
            message,
            pubkey: md5(alicePubKey),
            timestamp: connection.end
        })

        console.log('####', data, "####")

        const signature = await aliceWallet.sign(data)

        const body = {
            pubkey: bobPubKey,
            data,
            signature
        }

        let post_data = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(`https://dev.chriamue.de/api/v1/connection/${alicePubKeyB64}/${timestampB64}/${signatureB64}`, post_data)
            .then(res => {
                if (res.status == 200) {
                    console.log("Informed", bobPubKey);
                }
            });

    }

    informConnections() {
        const { connections } = this.props;
        console.log(connections)
        if (!connections) {
            return;
        }

        for (const connection of connections.connections) {
            this.informConnection(connection);
        }
    }

    render() {
        const { wallet } = this.state;
        if (!wallet) {
            return null;
        }

        return (<>
            <Button title='inform connections' onPress={() => this.informConnections()} />
        </>)
    }
}
