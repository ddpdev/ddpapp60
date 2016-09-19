/**
 * Created by ms.kim2 on 2016-09-09.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { SocialIcon, Button  } from 'react-native-elements'

class PageOne extends Component {
  render() {
    const goToPageTwo = () => Actions.pageTwo({text: 'Hello World!'});
    const goToPageCameraRollPicker = () => Actions.pageCameraRollPicker({text: 'Hello World!'});
    return (
      <View style={{flex:1, justifyContent: 'flex-start',alignItems: 'flex-start', marginTop: 100}}>
        <Text >This is 테스트페이지 모음</Text>
        <Button
          iconRight
          icon={{name: 'smartphone'}}
          title='go To PageTwo!'
          backgroundColor='#397af8'
          onPress={goToPageTwo}
        />
        <Button
          iconRight
          icon={{name: 'web'}}
          title='Web View'
          color='#517fa4'
          backgroundColor='#89faf8'
          onPress={Actions.pageThree}
        />
          <Button
              iconRight
              icon={{name: 'web'}}
              title='Draft Editor'
              color='#517fa4'
              backgroundColor='#89faf8'
              onPress={Actions.pageEditor}
          />
        <Button
          raised
          iconRight
          icon={{name: 'collections'}}
          title='go To 카메라롤 픽커'
          color='#f50'
          onPress={goToPageCameraRollPicker}
        />
        <Text onPress={Actions.pageMain}>Back Main!</Text>
      </View>
    )
  }
}

export default connect()(PageOne);