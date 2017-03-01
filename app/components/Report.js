import React, { Component } from 'react';
import { Button, Picker, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
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
      lat: null,
      lng: null,
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
  }

  navigate(routeName) {
    this.props.navigator.push({ name: routeName })
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
          <MiniMap currentLocation={this.props.currentLocation} />
        </View>

        <View style={styles.views}>
          <Text>Location</Text>
          <Button
            title="Edit"
            onPress={() => console.error(this.state)}
          />
        </View>

        <View style={styles.views}>
          <Text>Add Photo</Text>
          <Button
            title="Photo"
            onPress={() => this.navigate('map')}
          />
        </View>

        <View style={styles.views}>
          <Text>Enter Tag</Text>
          <TextInput
            value={this.state.tag}
            style={styles.textInputs}
          />
        </View>

        <TouchableHighlight
          style={styles.submitButton}
          onPress={() => this.navigate('map')}
        >
          <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Report;
