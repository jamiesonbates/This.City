import React, { Component } from 'react';
import { Picker, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import axios from 'axios';
import Button from 'react-native-button';
import MiniMap from './MiniMap';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';

const styles = StyleSheet.create({
  container: {
    width: null,
    height: null,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6197e9'
  },
  header: {
    fontSize: 30,
  },
  submitButton: {
    borderWidth: 1,
    height: 50,
    width: 100
  },
  infoContainer: {
    // flexDirection: 'column',
    // flex: 2,
    // backgroundColor: 'white',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5
  },
  inputRow: {
    alignItems: 'center',
    flexDirection: 'row',
    // flex: 1,
    marginBottom: 5
  }
});

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      category_id: 1,
      user_id: this.props.userInfo.id,
      lat: this.props.currentLocation.lat,
      lng: this.props.currentLocation.lng,
      categories: [
        {id: 1, name: 'Other'},
        {id: 2, name: 'Construction Alert'},
        {id: 3, name: 'Biking Hazard'},
        {id: 4, name: 'Pollution Alert'},
        {id: 5, name: 'Noise Alert'},
        {id: 6, name: 'Safety Concern'},
        {id: 7, name: 'Broken Infrastructure'},
        {id: 8, name: 'Recent Crime'},
        {id: 9, name: 'Traffic Alert'}
      ]
    };

    this.navigate = this.navigate.bind(this);
    this.dragMarker = this.dragMarker.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  dragMarker(event) {
    this.setState({ lat: event.nativeEvent.coordinate.latitude, lng: event.nativeEvent.coordinate.longitude });
  }

  navigate(routeName) {
    this.props.navigator.push({ name: routeName })
  }

  handleSubmit() {
    const problem = this.state;
    delete problem.categories;

    axios
      .post('https://q3project-server.herokuapp.com/api/problem', problem)
      .then((res) => {
        if (res.data) {
          this.props.updateMap();
          this.props.toggleReport();
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Report a Problem</Text>

        <View style={styles.infoContainer}>
          <View style={styles.inputRow}>
            <Kohana
              // style={styles.inputField}
              label={'Title'}
              iconClass={MaterialIcons}
              iconName={'report-problem'}
              iconColor={'#89c6f2'}
              name={'title'}
              onChangeText={(title) => this.setState({title})}
              value={this.state.title}
              inputStyle={styles.inputStyle}
            />
            {/* <TextInput
              name="title"
              onChangeText={(title) => this.setState({title})}
              style={styles.inputField}
              value={this.state.title}
            /> */}
          </View>

          <View style={styles.inputRow}>
            <Kohana
              // style={styles.inputField}
              label={'Description'}
              iconClass={MaterialIcons}
              iconName={'description'}
              iconColor={'#89c6f2'}
              name={'description'}
              onChangeText={(description) => this.setState({description})}
              // multiline={true}
              value={this.state.description}
            />
            {/* <TextInput
              name="description"
              onChangeText={(description) => this.setState({description})}
              multiline={true}
              style={styles.inputField}
              value={this.state.description}
            /> */}
          </View>

          <View style={styles.inputRow}>
            <Picker
              selectedValue={this.state.category_id}
              onValueChange={(cat) => this.setState({category_id: cat})}
              >
                {
                  this.state.categories.map(option => <Picker.Item key={option.id} label={option.name} value={option.id} />)
                }
              </Picker>
            </View>
        </View>


        <View style={{flexDirection: 'row'}}>
          <MiniMap
            currentLocation={this.props.currentLocation}
            dragMarker={this.dragMarker}
            markerLat={this.state.lat}
            markerLng={this.state.lng}
          />
        </View>

        <Button
          color="#517cc6"
          onPress={() => this.handleSubmit()}
          style={styles.submitButton}
        >
          Report
        </Button>

      </View>
    );
  }
}

export default Report;
