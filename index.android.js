import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View,
  Navigator
} from 'react-native';
import Map from './app/components/Map';
import Control from './app/components/Control';
import Login from './app/components/Login';
import Report from './app/components/Report';
import Problem from './app/components/Problem';
import Registration from './app/components/Registration';


const routes = [];

export default class Q3ProjectFE extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        id: null,
        token: null
      }
    };

    this.getUserInfo = this.getUserInfo.bind(this);
  }

  getUserInfo(nextState) {
    this.setState(nextState);
    alert(this.state.userInfo.id)
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'login':
        return <Login
          navigator={navigator}
          getUserInfo={this.getUserInfo}
        />
      case 'registration':
        return <Registration navigator={navigator} />
      case 'map':
        return <Map userInfo={this.state.userInfo} navigator={navigator} />
      // case 'report':
      //   return <Report />
      case 'problem':
        return <Problem navigator={navigator} />
      default:
        return <View>
          <Text>EMPTY</Text>
        </View>
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'login'}}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }
}

AppRegistry.registerComponent('Q3ProjectFE', () => Q3ProjectFE);
