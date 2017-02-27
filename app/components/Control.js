import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const myIcon = (<Icon name="facebook" size={60} />);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  }
})

class Control extends Component {
  render() {
    return (
      <View style={styles.container}>
        { myIcon }
      </View>
    );
  }
}

export default Control;
