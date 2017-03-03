import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Modal } from 'react-native';
import IconStyle1 from 'react-native-vector-icons/SimpleLineIcons';
import IconStyle2 from 'react-native-vector-icons/FontAwesome';
import IconStyle3 from 'react-native-vector-icons/Foundation';
import Report from './Report';

const userIcon = (<IconStyle1 name="user" size={40} color="white"/>);
const reportIcon = (<IconStyle2 name="exclamation-triangle" size={50} color="white"/>);
const trendingIcon = (<IconStyle3 name="graph-trend" size={50} color="white"/>);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242823',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    fontSize: 15
  }
})

class Control extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportModalOpen: false
    }

    this.toggleReport = this.toggleReport.bind(this);
  }

  toggleReport() {
    if (this.state.reportModalOpen) {
      this.setState({ reportModalOpen: false });
    }
    else {
      this.setState({ reportModalOpen: true });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          onRequestClose={this.toggleReport}
          visible={this.state.reportModalOpen}

        >
          <Report
            currentLocation={this.props.currentLocation} navigator={this.props.nav}
            toggleReport={this.toggleReport}
            updateMap={this.props.updateMap}
            userInfo={this.props.userInfo}
          />
        </Modal>

        <TouchableHighlight>
          <View>{trendingIcon}</View>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.toggleReport}>
          <View>{reportIcon}</View>
        </TouchableHighlight>

        <TouchableHighlight>
          <View>{userIcon}</View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Control;
