import React from 'react';
import {
  ScrollView,
  Text
} from 'react-native';
import Connection from '../Connection';
import Connections, { loadConnections, saveConnections } from '../Connections';
import Diary from '../Diary';
import DiaryEntry from '../DiaryEntry';
import DiaryView from '../components/DiaryView';
import Nearby from '../components/Nearby';
import { loadPubkey } from '../Wallet';

interface Props { }
interface State {
  pubkey: string | null;
  connections: Connections;
  diary: Diary;
}

class DiaryScreen extends React.Component<Props, State>{
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
    connections = connections.add(connection);
    saveConnections(connections);
    this.setState({ connections });
  }

  render() {
    if (!this.state.pubkey) {
      return null;
    }
    return (<ScrollView>
      <Text>Diary</Text>
      <Nearby pubkey={this.state.pubkey} connections={this.state.connections} onConnection={(connection: Connection) => this.onConnection(connection)} />
      <DiaryView diary={this.state.diary} onNewEntry={(entry: DiaryEntry) => this.onNewDiaryEntry(entry)} />
    </ScrollView>
    );
  }
};

export default DiaryScreen;
