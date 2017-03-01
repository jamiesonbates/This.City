import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button, ListView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  problem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  issueName: {
    fontFamily: 'raleway_regular'
  }
});

class Problem extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.issueName}>Issue Name</Text>
          <Text>Category Icon</Text>
        </View>
        <Text>Description</Text>
        <Text>Author</Text>
        <Text>Photos</Text>
        <View>
          <Text>Is this a problem?</Text>
          <View style={styles.problem}>
            <Button
              title="Yes"
            />
            <Button
              title="No"
            />
          </View>
        </View>
        <Button
          title="Comments"
        />
      </View>
    );
  }
}

export default Problem;
