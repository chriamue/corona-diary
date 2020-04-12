import React from 'react';
import {
  View,
  Text
} from 'react-native';
import Connection from '../Connection';
import Connections, { loadConnections, saveConnections } from '../Connections';
import Diary from '../Diary';
import DiaryEntry from '../DiaryEntry';
import Charts from '../components/Charts';
import Nearby from '../components/Nearby';
import { loadPubkey } from '../Wallet';

interface Props { }
interface State {
  pubkey: string | null;

  connections: Connections;
  diary: Diary;
}

class ChartsScreen extends React.Component<Props, State>{
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
  }

  onNewDiaryEntry(entry: DiaryEntry) {
    const { diary } = this.state;
    diary.addEntry(entry);
    this.setState({ diary });
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
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Charts</Text>
      <Nearby pubkey={this.state.pubkey} connections={this.state.connections} onConnection={(connection: Connection) => this.onConnection(connection)} />
      <Charts connections={this.state.connections} />
    </View>
    );
  }
};

export default ChartsScreen;
