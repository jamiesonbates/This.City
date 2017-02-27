import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View
} from 'react-native';
import Map from './app/components/Map';
import Control from './app/components/Control';
import Login from './app/components/Login';


export default class Q3ProjectFE extends Component {
  render() {
    return (
      <Login />
    );
  }
}

AppRegistry.registerComponent('Q3ProjectFE', () => Q3ProjectFE);
