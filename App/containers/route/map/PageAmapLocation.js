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

import AMapLocation from 'react-native-amap-location';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 35.907757;
const LONGITUDE = 127.766922;
const LATITUDE_DELTA = 10.0;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let id = 0;

 class PageAmapLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentlocation : {
                accuracy: 29,
                adCode: "",
                address: "",
                altitude: 0,
                bearing: 0,
                city: "",
                cityCode: "",
                country: "",
                district: "",
                latitude: LATITUDE,
                locationDetail: "-1",
                locationType: 4,
                longitude: LONGITUDE,
                poiName: "",
                provider: "lbs",
                province: "",
                satellites: 0,
                speed: 0,
                street: "",
                streetNum: ""
            }
        }
        this.locationMapping = this.locationMapping.bind(this);

        console.log("PageAmapLocation:",props, this.state);
    }

     locationMapping(data) {

         if (data.errorCode > 0) {
             console.log('locationMapping Error:', data);
         } else {
             console.log('locationMapping :', data);
             this.setState({currentlocation : data});
         }

     }

     componentDidMount() {
         this.listener = AMapLocation.addEventListener(this.locationMapping(data)); //console.log(data));
         AMapLocation.startLocation({
             accuracy: 'HighAccuracy', //BatterySaving, HighAccuracy, DeviceSensors
             interval: 5000,
             //onceLocation: true,
             wifiActiveScan: true,
             killProcess: true,
             needDetail: true,
         });
     }

     componentWillUnmount() {
         AMapLocation.stopLocation();
         this.listener.remove();
     }

     render() {
         return (

                   <View style={styles.container}>
                     <ScrollView>
                         <Text>
                             <Text style={styles.title}>Initial position: </Text>
                             {LATITUDE}, {LONGITUDE}
                         </Text>
                         <Text>
                             <Text style={styles.title}>Current position: </Text>
                             lat:{this.state.currentlocation.latitude}, lon:{this.state.currentlocation.longitude}
                         </Text>
                     </ScrollView>
                   </View>

         );
     }
 }

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


export default connect()(PageAmapLocation);