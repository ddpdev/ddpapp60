/**
 * Created by ms.kim2 on 2016-09-09.
 */
import React, { Component } from 'react';
import { View, Text ,StyleSheet, WebView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

 class PageThree extends Component {
  render() {
    return (
      <WebView
        source={{uri: 'http://app.ddpstyle.com/common/awsfileupload'}}
        style={{marginTop: 20}}
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

export default connect()(PageThree);