/**
 * Created by ms.kim2 on 2016-09-09.
 */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class PageOne extends Component {
  render() {
    const goToPageTwo = () => Actions.pageTwo({text: 'Hello World!'});
    return (
      <View style={{margin: 128}}>
        <Text >This is PageOne!</Text>
        <Text onPress={goToPageTwo}>go To PageTwo!</Text>
        <Text onPress={Actions.pageMain}>Back Main!</Text>
      </View>
    )
  }
}

export default connect()(PageOne);