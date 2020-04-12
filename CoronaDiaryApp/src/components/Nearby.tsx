import React from 'react';
import { Text } from 'react-native';
import { NearbyAPI } from "@adrianso/react-native-nearby-api";
import { NEARBY_API_KEY } from 'react-native-dotenv'
import Connection from '../Connection';
import Connections, { loadConnections, saveConnections } from '../Connections';
import ConnectionStats from '../ConnectionStats';
import { loadPubkey } from '../Wallet';

interface Props {
}
interface State {
    pubkey: string | null;
    connections: Connections;
    nearbyAPI: any,
    nearbyConnected: boolean
}

export default class Nearby extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            pubkey: null,
            connections: new Connections(5),
            nearbyAPI: null,
            nearbyConnected: false
        };
    }

    componentDidMount() {
        loadPubkey(this).then(() => {
            this.initNearby();
        });
        loadConnections(this);
    }

    componentWillUnmount() {
        this.state.nearbyAPI.disconnect();
    }

    onConnection(connection: Connection) {
        let { connections } = this.state;
        connections = connections.add(connection);
        saveConnections(connections);
        this.setState({ connections });
    }

    initNearby() {
        const nearbyAPI = new NearbyAPI(true); // Use BLE only, no audio.
        nearbyAPI.onConnected((message: any) => {
            console.log(message)
            this.state.nearbyAPI.publish(this.state.pubkey);
            this.setState({ nearbyConnected: true });
        });
        nearbyAPI.onDisconnected((message: any) => {
            console.log(message)
            this.setState({ nearbyConnected: false });
        });
        nearbyAPI.onFound((message: any) => {
            console.log("Message Found!");
            console.log('message', message);
            const pubkey = message;
            const connection = new Connection(pubkey, new Date())
            this.onConnection(connection);
        });
        nearbyAPI.onLost((message: any) => {
            console.log("Message Lost!");
            console.log(message);
        });
        nearbyAPI.onDistanceChanged((message: any, value: any) => {
            console.log("Distance Changed!");
            console.log(message, value);
        });
        nearbyAPI.onPublishSuccess((message: any) => {
            console.log(message);
        });
        nearbyAPI.onPublishFailed((message: any) => {
            console.log(message);
        });
        nearbyAPI.onSubscribeSuccess(() => { });
        nearbyAPI.onSubscribeFailed(() => { });

        // To connect from Google API Client
        nearbyAPI.connect(NEARBY_API_KEY);
        nearbyAPI.connect();
        // To check if the nearby API is connected.
        nearbyAPI.isConnected((connected: any, error: any) => {
            this.setState({ nearbyConnected: connected });
        });


        // To publish to nearby devices

        // To check if the nearby API is publishing.
        nearbyAPI.isPublishing((publishing: any, error: any) => {
            console.log(publishing);
        });

        // To subscribe to nearby devices broadcasting
        nearbyAPI.subscribe();

        // To check if the nearby API is subscribing.
        nearbyAPI.isSubscribing((subscribing: any, error: any) => {
            console.log(subscribing);
        });
        this.setState({ nearbyAPI })
    }

    newConnection() {
        if (!this.state.pubkey) {
            return;
        }
        const connection = new Connection(this.state.pubkey, new Date())
        this.onConnection(connection);
    }

    render() {
        const { nearbyConnected } = this.state;
        const connectionStats = new ConnectionStats(this.state.connections);
        return (
            <Text onPress={() => this.newConnection()}>{connectionStats.countLast5Min()} Nearby {nearbyConnected ? "[C]" : null}</Text>
        )
    }
}
