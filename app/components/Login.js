import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  Image,
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
    flex: 1,
    flexDirection: 'column',
    width: null,
    height: null,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appNameText: {
    color: '#403d3d',
    fontFamily: 'raleway_regular',
    fontSize: 70,
    textAlign: 'center'
  },
  welcomeText: {
    color: '#403d3d',
    fontFamily: 'raleway_regular',
    fontSize: 30,
    textAlign: 'center'
  },
  icon: {
    paddingRight: 15,
  },
  inputField: {
    fontFamily: 'raleway_regular',
    fontSize: 17,
    height: 50,
    width: 270
  },
  inputRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  linkBox: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    marginTop: 30,
    width: 300
  },
  formContainer: {
    marginTop: 50
  },
  registerLink: {
    color: 'lightcoral',
    fontFamily: 'raleway_regular',
    fontSize: 18,
  }
});

const userIcon = (<Icon name="user" size={20} color="black" style={styles.icon}/>);
const passwordIcon = (<Icon name="key" size={20} color="black" style={styles.icon}/>);

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      userInfo: {
        id: '',
        token: ''
      }
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
          const nextState = {
            userInfo: {
              id: res.data.id,
              token: res.data.token
            }
          };

          this.props.getUserInfo(nextState);

          this.setState(nextState);
          this.navigate('map');
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  render() {
    return <Image
      source={require('../images/bg.jpg')}
      style={styles.pageContainer}
      title="Created by Kjpargeter - Freepik.com"
    >
      <Text style={styles.appNameText}>
        APP NAME
      </Text>
      <Text style={styles.welcomeText}>
        Report. Review. Revamp.
      </Text>

      <View style={styles.formContainer}>
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

        <View style={{ height: 10 }}></View>

        <Button
          color="#517cc6"
          onPress={this.callApi}
          style={styles.submitButton}
          title="Submit"
        />

        <View style={styles.linkBox}>
          <Text style={{ color: '#393836', fontSize: 18 }}>Not a member?</Text>
          <TouchableHighlight onPress={() => this.navigate('registration')}>
            <Text style={styles.registerLink}> Register for free.</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Image>
  }
}
