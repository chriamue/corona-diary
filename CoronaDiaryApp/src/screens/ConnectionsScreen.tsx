import React from 'react';
import {
  View,
  Text
} from 'react-native';
import ConnectionReports from '../components/ConnectionReports';
import ReportConnections from '../components/ReportConnections';
import Connections, { loadConnections } from '../Connections';
import Diary, { loadDiary } from '../Diary';
import { loadPubkey } from '../Wallet';

interface Props { }
interface State {
  pubkey: string | null;
  connections: Connections;
  diary: Diary;
}

class ConnectionsScreen extends React.Component<Props, State>{
  constructor(props: any) {
    super(props);
    this.state = {
      pubkey: null,
      connections: new Connections(5),
      diary: new Diary()
    };
  }

  componentDidMount() {
    loadPubkey(this);
    loadConnections().then((connections) => { if (connections) this.setState({ connections }) });
    loadDiary().then((diary) => { if (diary) this.setState({ diary }) });
  }

  render() {
    if (!this.state.pubkey) {
      return null;
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Connections</Text>
        <ConnectionReports />
        <ReportConnections connections={this.state.connections} diary={this.state.diary} />
      </View>
    );
  }
};

export default ConnectionsScreen;
