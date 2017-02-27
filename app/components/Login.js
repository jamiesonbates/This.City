import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  View
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  icon: {
    paddingRight: 15
  },
  inputField: {
    fontSize: 25,
    height: 50,
    width: 270
  },
  inputRow: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  submitButton: {
    borderRadius: 6,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    marginTop: 20,
    width: 80
  },
  registerLink: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20
  }
});

const userIcon = (<Icon name="user" size={20} color="black" style={styles.icon}/>);
const passwordIcon = (<Icon name="key" size={20} color="black" style={styles.icon}/>);

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.navigate = this.navigate.bind(this);
    this.callApi = this.callApi.bind(this);
  }

  navigate(routeName) {
    this.props.navigator.push({ name: routeName })
  }

  callApi() {
    axios
      .post('https://q3project-server.herokuapp.com/api/token', {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res) {
          this.navigate('map');
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  render() {
    return <View style={styles.pageContainer}>
      <View style={styles.inputRow}>
        {userIcon}
        <TextInput
          name="email"
          style={styles.inputField}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
      </View>

      <View style={styles.inputRow}>
        {passwordIcon}
        <TextInput
          name="password"
          style={styles.inputField}
          onChangeText={(password) => this.setState({password})}
          secureTextEntry={true}
          value={this.state.password}
        />
      </View>


      <TouchableHighlight
        style={styles.submitButton}
        onPress={() => this.callApi()}
      >
        <Text style={{textAlign: 'center'}}>Submit</Text>
      </TouchableHighlight>

      <View style={styles.registerLink}>
        <Text>Not a member?</Text>
        <TouchableHighlight onPress={() => {
          this.navigate('registration');
          this.callApi
        }}>
          <Text style={{borderWidth: 1, color: 'lightcoral', height: 20}}> Register for free!</Text>
        </TouchableHighlight>
      </View>

    </View>
  }
}
