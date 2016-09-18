/**
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';

import {Actions} from 'react-native-router-flux'
import { SocialIcon, Button  } from 'react-native-elements'

import Product from './containers/product/productlistview';
import BottomBar from './containers/route/components/BottomBar';

//type Props = {};
class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : this.props.id,
      name: this.props.name,
    }
    console.log("MainApp:",this.props,this.state);
  };

  render() {
    const { state, actions } = this.props;
    console.log("Props", this.props, state, actions); // everything ok here
    //const gotoDetail = () => Actions.productDetail({ProductItemTitle:uploadfilename, ProductItemPrice:itemPrice, ProductItemURL:imageUri});
    //const imagePicker = () => Actions.imagePicker();
    //const cameraRollPicker = () => Actions.cameraRollPicker({ groupTypes: 'All', assetType: 'Photos' });

    return (
      <View style={styles.container}>
          <View style={styles.topContainer}>
              <Product/>
          </View>
          <View style={styles.bottomContainer}>
            <BottomBar/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
        height: (Dimensions.get('window').height) - 120,
        width: Dimensions.get('window').width,
        backgroundColor: '#90ee90' // lightgreen
        // alignItems: 'center',
        // justifyContent: 'center',
    },
   bottomContainer: {
        flex: 1,
        flexDirection:'row',
        height: Dimensions.get('window').height/2,
        width: Dimensions.get('window').width,
       backgroundColor: '#add8e6' // lightblue
        //alignItems: 'center',
        //justifyContent: 'center',
    },
  button: {
    padding: 10,
    width: Dimensions.get('window').width/3,
    height:25,
    borderRadius:5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
  },
  buttonLabel: {
    color: '#fff',
  },
});

export default connect()(MainApp);

//module.exports = MainApp;
