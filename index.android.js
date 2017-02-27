import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View
} from 'react-native';
import Map from './app/components/Map';
console.log(Map);


export default class Q3ProjectFE extends Component {
  render() {
    return (
      <Map />
    );
  }
}

AppRegistry.registerComponent('Q3ProjectFE', () => Q3ProjectFE);
