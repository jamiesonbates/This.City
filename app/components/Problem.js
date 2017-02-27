import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button, ListView } from 'react-native';

const styles = StyleSheet.create({});

class Problem extends Component {
  render() {
    return (
      <View>
        <Text>Issue Name</Text>
        <Text>Description</Text>
        <Text>Author</Text>
        <Text>Photos</Text>
        <View>
          <Text>Is this a problem?</Text>
          <View>
            <Button
              title="Yes"
            />
            <Button
              title="No"
            />
          </View>
        </View>
        <Text>Comment</Text>
        <TextInput
          value=""
        />
        <Text>List of Comments</Text>
      </View>
    );
  }
}

export default Problem;
