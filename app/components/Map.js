import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View
} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    alert(this.state);

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
      </View>
    );
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);

      this.setState({center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }});
      alert(this.state.center.lng)
    });

    this.forceUpdate();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
}
