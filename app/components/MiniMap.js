import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
});

export default class MiniMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: this.props.currentLocation.lat,
        lng: this.props.currentLocation.lng
      },
      marker: {
        latitude: this.props.marker.latitude,
        longitude: this.props.marker.longitude
      }
    };
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
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
       >
         <MapView.Marker
          draggable
          coordinate={this.state.marker}
          onDrag={(e) => {this.props.dragMarker(e)}}
         >
         </MapView.Marker>
       </MapView>
      </View>
    );
  }

  componentWillMount() {
    //
  }

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
}
