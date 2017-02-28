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
        lat: null,
        lng: null
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
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
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

       <Control nav={this.props.navigator}/>

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
        this.setState({center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }});
      },
      (error) => alert('hello'),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);

      this.setState({center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }});
    });

    // axios
    //   .get('https://q3project-server.herokuapp.com/api/markers', {
    //     lat: this.state.center.lat,
    //     lng: this.state.center.lng
    //   })
    //   .then((res) => {
    //     const markers = res.data;
    //
    //     this.setState({
    //       markers: markers
    //     });
    //
    //     alert(markers);
    //   })
    //   .catch((err) => {
    //     console.error(err.message);
    //   });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
}
