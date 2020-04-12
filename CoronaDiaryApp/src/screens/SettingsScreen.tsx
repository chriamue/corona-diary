import React from 'react';
import {
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Keys from '../components/Keys';

interface Props { }
interface State {
  pubkey: string | null;
}

class SettingsScreen extends React.Component<Props, State>{
  constructor(props: any) {
    super(props);
    this.state = {
      pubkey: null
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

  render() {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Keys />
    </View>
    );
  }
};

export default SettingsScreen;
