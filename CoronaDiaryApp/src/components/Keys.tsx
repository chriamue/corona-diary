import { Base64 } from 'js-base64';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Wallet } from '../Wallet';
import { Text } from 'react-native';
import { Icon, Button, ThemeProvider } from 'react-native-elements';

interface Props { }
interface State {
    wallet: Wallet | null,
    expand: boolean
}

export default class Keys extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            wallet: null,
            expand: false
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

    async generateWallet() {
        const wallet = new Wallet();
        await wallet.generate();
        try {
            await AsyncStorage.setItem('@privkey', wallet.getPrivateKey())
            await AsyncStorage.setItem('@pubkey', wallet.getPublicKey())
        } catch (e) {
            console.log(e);
        }
        this.setState({ wallet });
    }


    async testLogin() {
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

        fetch(`http://dev.chriamue.de/api/v1/authentificate/${pubKeyB64}/${timestampB64}/${signatureB64}`)
            .then(res => console.log(res));
    }

    render() {
        const { expand, wallet } = this.state;
        if (!wallet) {
            return (<>
                <Button title='Generate Identity' onPress={() => this.generateWallet()} />
            </>)
        }
        if (expand) {
            return <><Text>
                {wallet.getPublicKey()}
            </Text>
                <Icon name='vpn-key' onPress={() => this.setState({ expand: false })} />
                <Button title='test login' onPress={() => this.testLogin()} />
            </>;
        }
        console.log(wallet.getPublicKey())
        return (<Icon
            name='vpn-key' onPress={() => this.setState({ expand: true })} />)
    }
}
