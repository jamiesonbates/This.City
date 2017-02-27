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
import Report from './app/components/Report';
import Problem from './app/components/Problem';

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

      case 'report':
      return <Report navigator={navigator} />

      case 'problem':
      return <Problem navigator={navigator} />

      default:
      return <Login navigator={navigator} />

    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'problem'}}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }

}

AppRegistry.registerComponent('Q3ProjectFE', () => Q3ProjectFE);
