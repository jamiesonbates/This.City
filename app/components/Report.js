import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableHighlight, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  header: {
    fontSize: 50,
  },
  views: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  textInputs: {
    width: 400
  },
  submitButton: {
    borderWidth: 1,
    height: 50,
    width: 100
  }
});

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issueName: '',
      description: '',
      tag: ''
    }

    this.navigate = this.navigate.bind(this);
  }

  navigate(routeName) {
    this.props.navigator.push({ name: routeName })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Report a Problem</Text>

        <View style={styles.views}>
          <Text>Name</Text>
          <TextInput
            value={this.state.issueName}
            style={styles.textInputs}
          />
        </View>

        <View style={styles.views}>
          <Text>Description</Text>
          <TextInput
            value={this.state.description}
            style={styles.textInputs}
          />
        </View>

        <View style={styles.views}>
          <Text>Location</Text>
          <Button
            title="Edit"
            onPress={() => this.navigate('login')}
          />
        </View>

        <View style={styles.views}>
          <Text>Add Photo</Text>
          <Button
            title="Photo"
            onPress={() => this.navigate('map')}
          />
        </View>

        <View style={styles.views}>
          <Text>Enter Tag</Text>
          <TextInput
            value={this.state.tag}
            style={styles.textInputs}
          />
        </View>

        <TouchableHighlight
          style={styles.submitButton}
          onPress={() => this.navigate('map')}
        >
          <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Report;
