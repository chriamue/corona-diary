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
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './src/screens/SettingsScreen';
import ConnectionsScreen from './src/screens/ConnectionsScreen';
import DiaryScreen from './src/screens/DiaryScreen';
import ChartsScreen from './src/screens/ChartsScreen';
import Nearby from './src/components/Nearby';

const Tab = createBottomTabNavigator();

interface Props { }
interface State {
}

class App extends React.Component<Props, State>{
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <>
        <View style={{ alignItems: 'flex-end' }}><Nearby /></View>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Diary" component={DiaryScreen} />
            <Tab.Screen name="Connections" component={ConnectionsScreen} />
            <Tab.Screen name="Charts" component={ChartsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </>
    );
  }
};

export default App;
