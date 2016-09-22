/**
 * Created by ms.kim2 on 2016-09-09.
 * @flow
 */
import React, { Component } from 'react';
import { View, Text ,StyleSheet, WebView, Dimensions,ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 35.907757;
const LONGITUDE = 127.766922;
const LATITUDE_DELTA = 10.0;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

 class PageMaps extends Component {

    constructor(props) {
      super(props);
      this.state = {
        region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        initialPosition : this.region,
        lastPosition : this.region,
      };

      console.log("map:",this.props,this.state);
    }

     render() {
         return (
             <View>
               <ScrollView>
                   <MapView
                     initialRegion={{
                       latitude: LATITUDE,
                       longitude: LONGITUDE,
                       latitudeDelta: LATITUDE_DELTA,
                       longitudeDelta: LONGITUDE_DELTA,
                     }}
                   />
                   <Text>
                       <Text style={styles.title}>Initial position: </Text>
                       {this.state.initialPosition}
                   </Text>
                   <Text>
                       <Text style={styles.title}>Current position: </Text>
                       {this.state.lastPosition}
                   </Text>
                 </ScrollView>
             </View>
         );
     }
 }

var styles = StyleSheet.create({
    title: {
        fontWeight: '500',
    },
});

export default connect()(PageMaps);