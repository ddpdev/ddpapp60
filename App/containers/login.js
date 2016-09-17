//@flow

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
var { connect } = require('react-redux');

type Props = {
  };

type State = {
  isLoggedIn : boolean;
  id: string;
  name:string;
};

class Home extends Component {
  props:Props;
  state:State;

  constructor(props:Props) {
    super(props);
    this.state = {
      isLoggedIn:false,
      id:'',
      name:'',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to login!
          id : {this.props.id}, name:{this.props.name}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

function select(store) {
  return {
    //tab: store.navigation.tab,
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    id: store.user.id || '',
    name: store.user.name || '',
  };
}

module.exports = connect(select)(Home);
