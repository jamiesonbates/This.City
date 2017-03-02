import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View,
  Button,
  Modal
} from 'react-native';
import MapView from 'react-native-maps';
import Control from './Control';
import Problem from './Problem';
import axios from 'axios';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  marker: {
    backgroundColor: '#FF2413',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 50
  },
  person: {
    backgroundColor: '#397AFF',
    padding: 8,
    borderRadius: 50
  },
  calloutContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  callout: {
    width: 250,
    height: 125,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  calloutTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  calloutTitle: {
    fontSize: 25,
    fontFamily: 'alegreya_sans_sc_regular',
    color: 'black',
    textAlign: 'center'
  },
  votesContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  votes: {
    fontSize: 20,
    fontFamily: 'raleway_regular',
    color: 'black',
    marginRight: 5
  },
  categoryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 10,
    marginRight: 10
  },
  category: {
    fontFamily: 'raleway_regular',
    fontSize: 16
  },
  fakeLink: {
    color: 'lightcoral',
    fontFamily: 'raleway_regular',
    fontSize: 14
  },
  detailsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 4
  },
  trafficIconContainer: {
    backgroundColor: '#FFD037',
    borderRadius: 50,
    padding: 4,
    borderWidth: 2,
    borderColor: 'black'
  },
  trafficIcon: {
    fontSize: 30,
    color: 'black'
  },
  constructionIconContainer: {
    backgroundColor: '#FF3D31',
    borderRadius: 50,
    padding: 4,
    borderWidth: 2,
    borderColor: 'black'
  },
  constructionIcon: {
    fontSize: 30,
    color: 'white'
  },
  bikingIconContainer: {
    backgroundColor: 'rgba(126, 227, 119, 0.6)',
    borderRadius: 50,
    padding: 4,
    borderWidth: 2,
    borderColor: 'black'
  },
  bikingIcon: {
    fontSize: 30,
    color: 'black'
  },
  trashIconContainer: {
    backgroundColor: 'rgba(131, 161, 230, 0.6)',
    borderRadius: 50,
    padding: 6,
    borderWidth: 2,
    borderColor: 'black'
  },
  trashIcon: {
    fontSize: 25,
    color: 'black'
  },
  noiseIconContainer: {
    backgroundColor: 'rgba(219, 198, 246, 0.6)',
    borderRadius: 50,
    padding: 6,
    borderWidth: 2,
    borderColor: 'black'
  },
  noiseIcon: {
    fontSize: 25,
    color: 'black'
  },
  dangerIconContainer: {
    backgroundColor: 'rgba(237, 85, 113, 0.6)',
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: 'black'
  },
  dangerIcon: {
    fontSize: 25,
    color: 'black'
  },
  brokenIconContainer: {
    backgroundColor: 'rgba(236, 226, 101, 0.6)',
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: 'black'
  },
  brokenIcon: {
    fontSize: 25,
    color: 'black'
  },
  theftIconContainer: {
    backgroundColor: 'rgba(236, 173, 116, 0.6)',
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: 'black'
  },
  theftIcon: {
    fontSize: 25,
    color: 'black'
  },
  otherIconContainer: {
    backgroundColor: 'rgba(124, 123, 123, 0.6)',
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: 'black'
  },
  otherIcon: {
    fontSize: 25,
    color: 'black'
  }
});

const TrafficIcon = (
  <View style={styles.trafficIconContainer}>
    <MaterialIcons name="traffic" style={styles.trafficIcon} />
  </View>
);

const ConstructionIcon = (
  <View style={styles.constructionIconContainer}>
    <IonIcons name="ios-hammer" style={styles.constructionIcon} />
  </View>
);

const BikingIcon = (
  <View style={styles.bikingIconContainer}>
    <MaterialIcons name="directions-bike" style={styles.bikingIcon} />
  </View>
);

const TrashIcon = (
  <View style={styles.trashIconContainer}>
    <FontAwesomeIcons name="trash-o" style={styles.trashIcon} />
  </View>
);

const NoiseIcon = (
  <View style={styles.noiseIconContainer}>
    <FontAwesomeIcons name="volume-up" style={styles.noiseIcon} />
  </View>
);

const DangerIcon = (
  <View style={styles.dangerIconContainer}>
    <FontAwesomeIcons name="exclamation" style={styles.dangerIcon} />
  </View>
);

const BrokenIcon = (
  <View style={styles.brokenIconContainer}>
    <FontAwesomeIcons name="chain-broken" style={styles.brokenIcon} />
  </View>
);

const TheftIcon = (
  <View style={styles.theftIconContainer}>
    <EntypoIcons name="lock-open" style={styles.theftIcon} />
  </View>
);

const OtherIcon = (
  <View style={styles.otherIconContainer}>
    <EntypoIcons name="infinity" style={styles.otherIcon} />
  </View>
)

const categories = {
  traffic: TrafficIcon,
  construction: ConstructionIcon,
  biking: BikingIcon,
  garbage: TrashIcon,
  noise: NoiseIcon,
  danger: DangerIcon,
  broken: BrokenIcon,
  theft: TheftIcon,
  other: OtherIcon
}

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        // lat: 47.5993,
        // lng: -122.334
        lat: 0,
        lng: 0
      },
      problems: [],
      problemModalOpen: false
    }

    this.watchId = null;
    this.handleViewProblem = this.handleViewProblem.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.toggleProblem = this.toggleProblem.bind(this);
  }

  toggleProblem() {
    if (this.state.problemModalOpen) {
      this.setState({ problemModalOpen: false });
    }
    else {
      this.setState({ problemModalOpen: true });
    }
  }

  handleViewProblem(currentProblem) {
    this.props.saveCurrentProblem(currentProblem);

    this.setState({ problemModalOpen: true });
  }

  viewProblem() {
    this.props.navigator('')
  }

  updateMap() {
    axios({
      method: 'post',
      url: 'https://q3project-server.herokuapp.com/api/markers',
      data: {
        lat: this.state.center.lat,
        lng: this.state.center.lng
      }
    })
    .then((res) => {
      const markers = res.data;

      this.setState({
        problems: markers
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          onRequestClose={this.toggleProblem}
          visible={this.state.problemModalOpen}
        >
          <Problem
            currentProblem={this.props.currentProblem}
            userInfo={this.props.userInfo}
          />
        </Modal>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.center.lat,
            longitude: this.state.center.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
       >
         {
           this.state.problems
             .map(marker => {
               for (const category in categories) {
                 if (category === marker.category) {
                   marker.icon = categories[category];
                 }
               }
               return marker;
             })
             .map(marker => (
             <MapView.Marker
               key={marker.id}
               coordinate={
                 {
                   latitude: marker.lat,
                   longitude: marker.lng
                 }
               }
             >
                 {marker.icon}
               <MapView.Callout
                 style={styles.callout}
                 onPress={() => this.handleViewProblem(marker)}
               >
                 <View style={styles.calloutContainer}>
                   <View style={styles.calloutTitleContainer}>
                     <Text style={styles.calloutTitle}>
                       {marker.title}
                     </Text>
                   </View>

                   <View style={styles.categoryContainer}>
                     <Text style={styles.category}>
                       {marker.category}
                     </Text>
                   </View>
                   <View style={styles.detailsContainer}>
                     <View style={styles.votesContainer}>
                       <Text style={styles.votes}>
                         {marker.total}
                       </Text>
                       <IonIcons name="ios-people" size={35} color="#89c6f2" />
                     </View>
                     <Text style={styles.fakeLink}>MORE DETAILS</Text>
                   </View>
                 </View>
               </MapView.Callout>
             </MapView.Marker>
           ))
         }

        <MapView.Marker
          coordinate={
            {
              latitude: this.state.center.lat,
              longitude: this.state.center.lng
            }
          }
        >
          <View style={styles.person}></View>
        </MapView.Marker>
       </MapView>

       <Control
         currentLocation={this.state.center}
         nav={this.props.navigator}
         updateMap={this.updateMap}
         userInfo={this.props.userInfo}
       />

      </View>
    );
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });

        this.updateMap();
      },
      (err) => console.error(err.message, 'it\'s me')
      // ,
      // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });

      this.updateMap();
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
}
