/**
 * Created by ms.kim2 on 2016-09-09.
 */
import React, { Component } from 'react';
import { View, Text ,StyleSheet, WebView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import MapView from 'react-native-maps';

 class PageMaps extends Component {
     state = {
         initialPosition: 'unknown',
         lastPosition: 'unknown',
     };

     watchID: ?number = null;

     componentDidMount() {
         navigator.geolocation.getCurrentPosition(
             (position) => {
                 var initialPosition = JSON.stringify(position);
                 this.setState({initialPosition});
             },
             (error) => alert(error),
             {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
         );
         this.watchID = navigator.geolocation.watchPosition((position) => {
             var lastPosition = JSON.stringify(position);
             this.setState({lastPosition});
         });
         console.log("position",position);
     }

     componentWillUnmount() {
         navigator.geolocation.clearWatch(this.watchID);
     }

     render() {
         return (
             <View>
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

var styles = StyleSheet.create({
    title: {
        fontWeight: '500',
    },
});

export default connect()(PageMaps);