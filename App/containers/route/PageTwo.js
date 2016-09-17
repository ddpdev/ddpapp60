/**
 * Created by ms.kim2 on 2016-09-09.
 */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

 class PageTwo extends Component {
  render() {
    return (
      <View style={{margin: 128}}>
        <Text>This is PageTwo!</Text>
        <Text>{this.props.text}</Text>
        <Text onPress={Actions.pageOne}>Back PageOne!</Text>
        <Text onPress={Actions.pageProduct}>Back PageProduct!</Text>
      </View>
    )
  }
}

export default connect()(PageTwo);