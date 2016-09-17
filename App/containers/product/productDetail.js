"use strict";

import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    ListView,
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import { PricingCard } from 'react-native-elements'

export default class ProductPriceCard extends Component {
  constructor(props) {
    super(props);
    console.log("ProductPriceCard",props);
  }
  render() {
    return (
      <View style={styles.container} >
        <Image
          source={{uri: this.props.ProductItemURL}}
          style={styles.orgImage}
        />
          <PricingCard
            color="#3888F8"
            title={this.props.ProductItemTitle}
            price={this.props.ProductItemPrice}
            info={['1 User', 'Basic Support', 'All Core Features']}
            button={{ title: '살래?', icon: 'flight-takeoff' }}
          />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F5FCFF',
  },
  rightContainer:{
    flex:1,
  },
  thumbnail:{
    width:81,
    height:81,
  },
  orgImage:{
    width:300,
    height:300,
  },
  title: {
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 5,
    textAlign: 'left',
  },
  year: {
    fontSize: 10,
    marginLeft: 5,
    textAlign: 'left',
  },
  listView: {
    paddingTop:20,
    backgroundColor:'#F5FCFF',
  },
});

//default.exports = ProductPriceCard;
