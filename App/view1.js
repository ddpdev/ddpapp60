/**
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
//import StatusBar from 'StatusBar';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux'
//import Home from './containers/Home';

//type Props = {};
class View1 extends Component {
  constructor(props) {
    super(props);
    const state = {
      id : this.props.id,
      name: this.props.name,
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>난 첫번째 View {this.props.title}</Text>
        <Text>id : {this.state.id}</Text>
        <Text>name : {this.state.name}</Text>
        <Button onPress={Actions.mainApp}>Go to Main page</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function select(store) {
    return {
      isLoggedIn: store.user.isLoggedIn || false,
      id: store.user.id || '',
      name: store.user.name || '',
    };
}

module.exports = connect(select)(View1);
