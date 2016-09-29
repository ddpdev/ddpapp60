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
import { SocialIcon, Button  } from 'react-native-elements'
import _ from 'lodash';

import PageGoogleMap from './PageGoogleMap';

import RNALocation from 'react-native-android-location';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 35.907757;
const LONGITUDE = 127.766922;
const LATITUDE_DELTA = 10.0;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

 class PageGoogleMapLocation extends Component {

   static watchID : ?number = null;

    constructor(props) {
        super(props);
        this.state = {
            //currentlocation : {
                lat: LATITUDE,
                lng: LONGITUDE,
                date: Date(),
                initialPosition: [],
                lastPosition: [],
                locData: [],
                pickPosition: [],
            //}
        };

        this.locationMapping = this.locationMapping.bind(this);
        this.getFromGeoLocation = this.getFromGeoLocation.bind(this);

        console.log("PageAndroidLocation:",props, this.state);
    }

     locationMapping(data) {
         if (data.errorCode > 0) {
             console.log('locationMapping Error:', data);
         } else {
             console.log('locationMapping :', data);
             const curPosition = JSON.stringify(data);
             const newArray = this.state.locData.slice();
             newArray.push(curPosition);
             this.setState({locData: newArray, date: Date()});
             console.log('curPosition :', curPosition);
         }
     }

    getFromGeoLocation() {

        console.log("getFromGeoLocation Start");

        navigator.geolocation.getCurrentPosition(
            (position) => {
              const currPosition = JSON.stringify(position);
                //this.setState({initialPosition : initialPosition });
              const newArray = this.state.initialPosition.slice();
                newArray.push(currPosition);
                this.setState({initialPosition:newArray})
                console.log("initialPosition:",currPosition);
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

        this.watchID = navigator.geolocation.watchPosition((position) => {
          const currPosition = JSON.stringify(position);
          //this.setState({lastPosition:position});
          const newArray = this.state.lastPosition.slice();
          newArray.push(currPosition);
          const pickPosition = _.pick(currentPostion, ['longitute','latitude']);

          console.log("pickPostion:",pickPosition);

          this.setState({lastPosition:newArray});

          console.log("lastPosition:",currPosition);
        });
        const pickPosition = _.pick(this.state.currentPostion, ['longitute','latitude']);
        this.setState({pickPostion:pickPosition});

        console.log("Current Postion:",pickPosition);
        console.log("watchID:",this.watchID);
    }

     componentDidMount() {
         console.log("componentDidMount");
         DeviceEventEmitter.addListener('updateLocation', this.locationMapping.bind(this));
         // Initialize RNALocation
         RNALocation.getLocation();
         console.log("componentDidMount RNALocation.getLocation");
         this.getFromGeoLocation();
         console.log("componentDidMount getFromGeoLocation");
     }

     componentWillUnmount() {
         navigator.geolocation.clearWatch(this.watchID);
     }
     // componentWillUnmount() {
     //     AMapLocation.stopLocation();
     //     this.listener.remove();
     // }

     render() {
         return (
                   <View style={styles.container}>
                     <View style={styles.topContainer}>
                        <PageGoogleMap
                          greatPlaceCoords={this.state.pickPosition}
                          zoom = {7}
                          />
                     </View>
                     <View style={styles.bottomContainer}>
                         <ScrollView>
                           <Text>
                               <Text style={styles.location}>Default Position: </Text>
                               {LATITUDE}, {LONGITUDE}
                           </Text>
                             <Text>
                                 <Text style={styles.location}>RNALocation : </Text>
                                 <Text>{this.state.locData}</Text>
                             </Text>
                             <Text>
                                 <Text style={styles.location}>Current Geolocation: {Date()}</Text>{"\n"}
                                 <Text style={styles.location}>InitialPosition Position :{this.state.initialPosition}</Text>{"\n"}
                                 <Text style={styles.location}>lastPosition Position :{this.state.lastPosition}</Text>{"\n"}
                             </Text>
                             <Button
                                 raised
                                 iconRight
                                 icon={{name: 'collections'}}
                                 title='Reload'
                                 color='#f58'
                                 backgroundColor='#89faf8'
                                 onPress={this.getFromGeoLocation}
                             />
                         </ScrollView>
                     </View>
                   </View>
         );
     }
 }

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     marginTop:130,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
  container: {
    flex: 1,
    //flexDirection:'row',
    paddingTop:60,
    height: (Dimensions.get('window').height)-60,
    width: Dimensions.get('window').width,
    backgroundColor: '#f0e68c' //khaki
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    //flexDirection:'row',
    height: (Dimensions.get('window').height) - 150,
    width: Dimensions.get('window').width,
    backgroundColor: '#90ee90' // lightgreen
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    flexDirection:'row',
    marginBottom: 20,
    height: Dimensions.get('window').height/2,
    width: Dimensions.get('window').width,
    backgroundColor: '#add8e6' // lightblue
    //alignItems: 'center',
    //justifyContent: 'center',
  },
    location: {
        textAlign: 'center'
    },
    title: {
        fontWeight: '500',
    },
});


export default connect()(PageGoogleMapLocation);