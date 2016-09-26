/**
 * Created by ms.kim2 on 2016-09-09.
 * @flow
 */
import React, { Component } from 'react';
import { View,
          Text ,
          StyleSheet,
          WebView,
          Dimensions,
          Geolocation,
          ScrollView,
          DeviceEventEmitter
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import MapView from 'react-native-maps';

import {Location} from 'react-native-gps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 35.907757;
const LONGITUDE = 127.766922;
const LATITUDE_DELTA = 10.0;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let id = 0;

function randomColor() {
  return '#${Math.floor(Math.random() * 16777215).toString(16)}';
}


 class PageLocation extends Component {

   state = {
     initialPosition: 'unknown',
     lastPosition: 'unknown',
     currentPostion:'unknown',
   };

   watchID: ?number = null;

   componentWillMount() {
     Location.startUpdatingLocation();
   }


   const subscription = DeviceEventEmitter.addListener(
                         'locationUpdated',
                         (location) => {
                           let nowPostion = JSON.stringify(location);
                           console.log("Gps location",nowPostion);
                           this.setState(this.state.currentPostion = )
                           /* Example location returned
                            {
                            speed: -1,
                            longitude: -0.1337,
                            latitude: 51.50998,
                            accuracy: 5,
                            heading: -1,
                            altitude: 0,
                            altitudeAccuracy: -1
                            }
                            */
                         }
                       );

   componentDidMount() {
     navigator.geolocation.getCurrentPosition(
       (position) => {
         var initialPosition = JSON.stringify(position);
         console.log("initialPosition",initialPosition);

         this.setState({initialPosition});
       },
       (error) => alert(JSON.stringify(error)),
       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
     );
     this.watchID = navigator.geolocation.watchPosition((position) => {
       var lastPosition = JSON.stringify(position);
       console.log("initialPosition",lastPosition);
       this.setState({lastPosition});
     });
   }

   componentWillUnmount() {
     navigator.geolocation.clearWatch(this.watchID);
   }

     render() {
         return (
                   <View style={styles.container}>
                     <Text>
                         <Text style={styles.title}>Initial position: </Text>
                         {this.state.initialPosition}
                     </Text>
                     <Text>
                         <Text style={styles.title}>Current position: </Text>
                         {this.state.lastPosition}
                     </Text>
                   </View>
         );
     }
 }

// PageLocation.propTypes = {
//   provider: MapView.ProviderPropType,
// };

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: '500',
  },
});


export default connect()(PageLocation);