import React from 'react';
import {
  View,
  Text
} from 'react-native';
import Connections, { loadConnections } from '../Connections';
import Charts from '../components/Charts';
import { loadPubkey } from '../Wallet';

interface Props { }
interface State {
  pubkey: string | null;
  connections: Connections;
}

class ChartsScreen extends React.Component<Props, State>{
  constructor(props: any) {
    super(props);
    this.state = {
      pubkey: null,
      connections: new Connections(5)
    };
  }

  componentDidMount() {
    loadPubkey(this);
    loadConnections(this);
  }

  render() {
    if (!this.state.pubkey) {
      return null;
    }
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Charts</Text>
      <Charts connections={this.state.connections} />
    </View>
    );
  }
};

export default ChartsScreen;
