import React from 'react';
import { Text } from 'react-native';
import { NearbyAPI } from "@adrianso/react-native-nearby-api";
import { NEARBY_API_KEY } from 'react-native-dotenv'
import Connection from '../Connection';
import Connections from '../Connections';

interface Props {
    pubkey: string | null,
    connections: Connections,
    onConnection: any,
}
interface State {
    nearbyAPI: any,
    nearbyConnected: boolean
}

export default class Nearby extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            nearbyAPI: null,
            nearbyConnected: false
        };
    }

    componentDidMount() {
        this.initNearby();
    }

    componentWillUnmount() {
        this.state.nearbyAPI.disconnect();
    }

    initNearby() {
        const nearbyAPI = new NearbyAPI(false); // Use BLE only, no audio.
        nearbyAPI.onConnected((message: any) => {
            this.state.nearbyAPI.publish(this.props.pubkey);
            this.setState({ nearbyConnected: true });
        });
        nearbyAPI.onDisconnected((message: any) => {
            this.setState({ nearbyConnected: false });
        });
        nearbyAPI.onFound((message: any) => {
            console.log("Message Found!");
            console.log(message);
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
        if (!this.props.pubkey) {
            return;
        }
        const connection = new Connection(this.props.pubkey, new Date())
        this.props.onConnection(connection);
    }

    countLast5Min() {
        const { connections } = this.props;
        if (!connections) {
            return 0;
        }
        let count = 0;
        const now = Date.now();
        for (const connection of connections.connections) {
            if (connection.end.getTime() > now - 1000 * 60 * 5) {
                count += 1;
            }
        }
        return count;
    }

    render() {
        const { nearbyConnected } = this.state;
        return (
            <Text onPress={() => this.newConnection()}>{this.countLast5Min()} Nearby {nearbyConnected ? "[C]" : null}</Text>
        )
    }
}
