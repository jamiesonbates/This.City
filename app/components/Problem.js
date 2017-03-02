import React, { Component } from 'react';
import { Button, ListView, Text, TextInput, TouchableHighlight, StyleSheet, View } from 'react-native';
import axios from 'axios';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EvilIcon from 'react-native-vector-icons/EvilIcons';


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
  constructor(props) {
    super(props);

    this.state = {
      currentProblem: this.props.currentProblem,
      upVoteColor: null,
      downVoteColor: null,
      votedBefore: false
    };

    this.handleVerification = this.handleVerification.bind(this);
  }

  handleVerification(bool) {
    const verificationInfo = {
      userId: this.props.userInfo.id,
      probId: this.state.currentProblem.id,
      verification: bool
    }

    if (this.state.votedBefore) {
      axios
        .patch('https://q3project-server.herokuapp.com/api/verification', verificationInfo)
        .then((res) => {
          if (res.data.verified) {
            this.setState({
              upVoteColor: 'green',
              downVoteColor: 'black'
            });
          }
          else {
            this.setState({
              downVoteColor: 'red',
              upVoteColor: 'black'
            });
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
    else {
      axios
        .post('https://q3project-server.herokuapp.com/api/verification', verificationInfo)
        .then((res) => {
          if (res.data.verified) {
            this.setState({
              upVoteColor: 'green',
              downVoteColor: 'black'
            });
          }
          else {
            this.setState({
              downVoteColor: 'red',
              upVoteColor: 'black'
            });
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.issueName}>{this.state.currentProblem.title}</Text>
        </View>

        <Text>{this.state.currentProblem.description}</Text>
        <Text>{this.state.currentProblem.username}</Text>

        <View>
          <Text>Is this a problem?</Text>
          <View style={styles.problem}>
            <TouchableHighlight
              onPress={() => this.handleVerification(true)}
            >
              <FontAwesomeIcon name="check" size={40} color={this.state.upVoteColor} />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.handleVerification(false)}
            >
              <EvilIcon name="close" size={40} color={this.state.downVoteColor} />
            </TouchableHighlight>
          </View>
        </View>
        {/* <Button
          title="Comments"
        /> */}
      </View>
    );
  }

  componentWillMount() {
    const userId = this.props.userInfo.id;
    const probId = this.state.currentProblem.id;
    alert(userId)
    axios
      .get(`https://q3project-server.herokuapp.com/api/verification/${userId}/${probId}`)
      .then((res) => {
        if (res.data) {
          if (res.data.verified) {
            this.setState({
              votedBefore: true,
              upVoteColor: 'green',
              downVoteColor: 'black'
            });
          }
          else {
            this.setState({
              votedBefore: true,
              upVoteColor: 'black',
              downVoteColor: 'red'
            });
          }
        }
        else {
          this.setState({
            votedBefore: false,
            upVoteColor: 'black',
            downVoteColor: 'black'
          });
        }
      })
      .catch((err) => {
        console.error(err.message, userId, probId);
      });
  }
}

export default Problem;
