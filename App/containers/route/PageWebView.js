/**
 * Created by ms.kim2 on 2016-09-09.
 */
import React, { Component } from 'react';
import { View, Text ,StyleSheet, WebView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

 class PageWebView extends Component {
     constructor(props){
         super(props);
         console.log("webVeiw:",props);
         // uri = 'http://app.ddpstyle.com/common/awsfileupload'
         // http://istarkov.github.io/google-map-react/map/main
     }

      render() {
        return (
          <WebView
            source={{uri: this.props.uri }}
            style={{marginTop: 20}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate='normal'
            startInLoadingState={true}
          />
        );
    }
 }

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default connect()(PageWebView);