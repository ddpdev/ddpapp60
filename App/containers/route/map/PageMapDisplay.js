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
import GoogleMap from 'google-map-react';
import shouldPureComponentUpdate from 'react-pure-render/function';

//https://github.com/istarkov/google-map-react-examples/blob/master/web/flux/components/examples/x_main/main_map_block.jsx
//import MapView from 'react-native-maps';

import RNALocation from 'react-native-android-location';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 35.907757;
const LONGITUDE = 127.766922;
const LATITUDE_DELTA = 10.0;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

 class PageAndroidLocation extends Component {


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

        const watchID ; //: ?number = null;

        console.log("getFromGeoLocation Start");

        navigator.geolocation.getCurrentPosition(
            (position) => {
              const currPosition = JSON.stringify(position);
                //this.setState({initialPosition : initialPosition });
              const newArray = this.state.initialPosition.slice();
                // const newArray = [...this.state.initialPosition];
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
            this.setState({lastPosition:newArray})

            console.log("lastPosition:",currPosition);
        });



        console.log("watchID:",watchID);

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
         );
     }
 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:130,
        justifyContent: 'center',
        alignItems: 'center',
    },
    location: {
        textAlign: 'center'
    },
    title: {
        fontWeight: '500',
    },
});


export default connect()(PageAndroidLocation);