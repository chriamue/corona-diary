import React from 'react';
import {
  View,
  Text
} from 'react-native';
import ConnectionReports from '../components/ConnectionReports';
import ReportConnections from '../components/ReportConnections';
import Nearby from '../components/Nearby';
import Connection from '../Connection';
import Connections, { loadConnections, saveConnections } from '../Connections';
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
    loadConnections(this);
    loadDiary(this);
  }

  onConnection(connection: Connection) {
    let { connections } = this.state;
    connections = connections.add(connection)
    saveConnections(connections);
    this.setState({ connections });
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
        <Nearby pubkey={this.state.pubkey} connections={this.state.connections} onConnection={(connection: Connection) => this.onConnection(connection)} />
      </View>
    );
  }
};

export default ConnectionsScreen;
