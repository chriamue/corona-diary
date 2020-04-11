/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import Keys from './src/components/Keys';
import ConnectionReports from './src/components/ConnectionReports';
import ReportConnections from './src/components/ReportConnections';
import Nearby from './src/components/Nearby';
import Connection from './src/Connection';
import { List } from 'immutable';

declare var global: { HermesInternal: null | {} };
interface Props { }
interface State {
  pubkey: string | null;
  connections: List<Connection>;
}

class App extends React.Component<Props, State>{
  constructor(props: any) {
    super(props);
    this.state = {
      pubkey: null,
      connections: List<Connection>()
    };
  }

  componentDidMount() {
    this.loadPubkey();
  }

  async loadPubkey() {
    try {
      const pubkey = await AsyncStorage.getItem('@pubkey')
      this.setState({ pubkey });
    } catch (e) {
      console.log(e);
    }
  }

  onConnection(connection: Connection) {
    let { connections } = this.state;
    connections = connections.push(connection)
    this.setState({ connections });
  }


  render() {
    if (!this.state.pubkey) {
      return (<SafeAreaView>
        <Text>Corona Diary</Text>
        <View style={styles.body}>
          <Keys />
        </View>
      </SafeAreaView>)
    }
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Text>Corona Diary</Text>
            <View style={styles.body}>
              <Keys />
            </View>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Connections</Text>
                <ConnectionReports />
                <ReportConnections connections={this.state.connections} />
                <Nearby pubkey={this.state.pubkey} connections={this.state.connections} onConnection={(connection: Connection) => this.onConnection(connection)} />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
