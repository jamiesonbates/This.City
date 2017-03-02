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
  appName: {
    flexDirection: 'row',
    borderWidth: 1
  },
  appNameText: {
    fontSize: 50
  },
  title: {
    flexDirection: 'column',
    flex: 2
  },
  titleText: {
    fontSize: 25
  },
  description: {
    flexDirection: 'column',
    flex: 2
  },
  descriptionText: {
    fontSize: 25
  },
  problem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  goBack: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1
  },
  user: {
    flexDirection: 'row',
    flex: 1
  },
  userText: {
    fontSize: 15
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  choices: {
    marginLeft: 50,
    marginRight: 50
  },
  problemContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  problemText: {
    fontSize: 30
  },
  textTitle: {
    fontSize: 20
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
        <View style={styles.appName}>
          <Text style={styles.appNameText}>App Name</Text>
        </View>

        <View style={styles.title}>
          <Text style={styles.titleText}>
            Problem
          </Text>
          <Text style={styles.titleText}>
            {this.state.currentProblem.title}
          </Text>
        </View>

        <View style={styles.description}>
          <Text style={styles.titleText}>
            Description
          </Text>
          <Text style={styles.descriptionText}>
            {this.state.currentProblem.description}
          </Text>
        </View>

        <View style={styles.user}>
          <Text style={styles.userText}>
            Submitted by: {this.state.currentProblem.username}
          </Text>
        </View>

        <View style={styles.problemContainer}>
          <Text style={styles.problemText}>Do you think this a problem?</Text>
          <View style={styles.iconContainer}>
            <TouchableHighlight
              onPress={() => this.handleVerification(true)}
              style={styles.choices}
            >
              <FontAwesomeIcon name="check" size={70} color={this.state.upVoteColor} />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.handleVerification(false)}
              style={styles.choices}
            >
              <FontAwesomeIcon name="remove" size={70} color={this.state.downVoteColor} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.goBack}>
          <Button
            title="Go Back"
            onPress={() => alert('works')}
          />
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
