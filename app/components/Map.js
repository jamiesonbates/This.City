import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import Control from './Control';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 0.8
  },
});

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 37.78825,
        lng: -122.4324
      },
      markers: [{id: 1, lat: 37.78825, lng: -122.4324}]
    }

    this.watchId = null;
  }

  render() {
    const { region } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.center.lat,
            longitude: this.state.center.lng,
            latitudeDelta: 0.1922,
            longitudeDelta: 0.1421,
          }}
       >
         {
           this.state.markers.map(marker => (
             <MapView.Marker
               key={marker.id}
               coordinate={
                 {
                   latitude: marker.lat,
                   longitude: marker.lng
                 }
               }
             />
           ))
         }
       </MapView>

       <Control />

      </View>
    );
  }

  componentWillMount() {
    //
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        alert('HIHIHIIHI')
        this.setState({center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }});
      },
      (error) => alert(this.state.center.lat),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);

      this.setState({center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }});
      alert(this.state.center.lng)
    });

    axios
      .get('https://q3project-server.herokuapp.com/api/markers', {
        lat: this.state.center.lat,
        lng: this.state.center.lng
      })
      .post((res) => {
        const markers = res.data;
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
}
