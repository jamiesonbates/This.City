import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View
} from 'react-native';
import Map from './app/components/Map';
import Control from './app/components/Control';


export default class Q3ProjectFE extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
        <Map />
        <Control />
      </View>
    );
  }
}

AppRegistry.registerComponent('Q3ProjectFE', () => Q3ProjectFE);
