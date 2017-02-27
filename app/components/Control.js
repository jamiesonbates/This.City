import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const user = (<Icon name="user" size={60} color="white"/>);
const report = (<Icon name="folder" size={60} color="white"/>);
const trending = (<Icon name="bolt" size={60} color="white"/>);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

class Control extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>{ report }</View>
        <View>{ trending }</View>
        <View>{ user }</View>
      </View>
    );
  }
}

export default Control;
