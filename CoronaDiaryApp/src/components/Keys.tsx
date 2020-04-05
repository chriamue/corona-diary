import React from 'react';
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

    async generateWallet() {
        const wallet = new Wallet();
        await wallet.generate();
        this.setState({ wallet });
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
            </>;
        }
        console.log(wallet.getPublicKey())
        return (<Icon
            name='vpn-key' onPress={() => this.setState({ expand: true })} />)
    }
}
