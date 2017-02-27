import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  View
} from 'react-native';

const styles = StyleSheet.create({
  inputBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  inputLabel: {
    fontSize: 25,
    height: 50,
    padding: 10,
    width: 150
  },
  inputField: {
    fontSize: 25,
    height: 50,
    width: 300
  },
  submitButton: {
    borderWidth: 1,
    height: 50,
    width: 100
  }
})

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return <View>
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          name="username"
          style={styles.inputField}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          name="password"
          style={styles.inputField}
          onChangeText={(password) => this.setState({password})}
          secureTextEntry={true}
          value={this.state.password}
        />
        <TouchableHighlight style={styles.submitButton}>
          <Text>Submit</Text>
        </TouchableHighlight>
      </View>


    </View>
  }
}
