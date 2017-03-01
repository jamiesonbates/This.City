import React, { Component } from 'react';
import { Button, Picker, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import axios from 'axios';
import MiniMap from './MiniMap';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  header: {
    fontSize: 30,
  },
  submitButton: {
    borderWidth: 1,
    height: 50,
    width: 100
  },
  inputField: {
    fontSize: 17,
    height: 50,
    width: 270
  },
  inputRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
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
        {id: 2, name: 'Construction'},
        {id: 3, name: 'Biking'},
        {id: 4, name: 'Garbage'},
        {id: 5, name: 'Noise'},
        {id: 6, name: 'Danger'},
        {id: 7, name: 'Broken'},
        {id: 8, name: 'Theft'},
        {id: 9, name: 'Traffic'}
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

        <View style={styles.inputRow}>
          <Text>Issue</Text>
          <TextInput
            name="title"
            onChangeText={(title) => this.setState({title})}
            style={styles.inputField}
            value={this.state.title}
          />
        </View>

        <View style={{ width: 150 }}>
          <Picker
            selectedValue={this.state.category_id}
            onValueChange={(cat) => this.setState({category_id: cat})}
          >
            {
              this.state.categories.map(option => <Picker.Item key={option.id} label={option.name} value={option.id} />)
            }
          </Picker>
        </View>

        <View style={styles.inputRow}>
          <Text>Describe the Issue:</Text>
          <TextInput
            name="description"
            onChangeText={(description) => this.setState({description})}
            multiline={true}
            style={styles.inputField}
            value={this.state.description}
          />
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
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
          title="Report"
        />

      </View>
    );
  }
}

export default Report;
