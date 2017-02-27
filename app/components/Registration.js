import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  View
} from 'react-native';

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
})

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      address: '',
      imgUrl: ''
    };

    this.navigate = this.navigate.bind(this);
  }

  navigate(routeName) {
    this.props.navigator.push({ name: routeName })
  }

  render() {
    return <View>

        <View style={{alignSelf: 'stretch', alignItems: 'center', backgroundColor: '#FDD7E4', height: 90}}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            name="username"
            style={styles.inputField}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
          />
        </View>


        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          name="password"
          style={styles.inputField}
          onChangeText={(password) => this.setState({password})}
          secureTextEntry={true}
          value={this.state.password}
        />

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          name="email"
          style={styles.inputField}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />

        <Text style={styles.inputLabel}>Address</Text>
        <TextInput
          name="address"
          style={styles.inputField}
          onChangeText={(address) => this.setState({address})}
          value={this.state.address}
        />

        <Text style={styles.inputLabel}>Image URL</Text>
        <TextInput
          name="imgUrl"
          style={styles.inputField}
          onChangeText={(imgUrl) => this.setState({imgUrl})}
          value={this.state.imgUrl}
        />

        <TouchableHighlight
          style={styles.submitButton}
          onPress={() => this.navigate('map')}
        >
          <Text style={{alignItems: 'center'}}>Create Account</Text>
        </TouchableHighlight>


    </View>
  }
}
