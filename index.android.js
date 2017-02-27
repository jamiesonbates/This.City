import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View,
  Navigator
} from 'react-native';
import Map from './app/components/Map';
import Control from './app/components/Control';
import Login from './app/components/Login';

const routes = [
  {index: 0}
]

export default class Q3ProjectFE extends Component {
  renderScene(route, navigator) {
    switch (route.name) {
      case 'login':
      return <Login navigator={navigator} />

      case 'map':
      return <Map navigator={navigator} />

      default:
      return <Login navigator={navigator} />

    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'login'}}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }

}

AppRegistry.registerComponent('Q3ProjectFE', () => Q3ProjectFE);
