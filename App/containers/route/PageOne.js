/**
 * Created by ms.kim2 on 2016-09-09.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { SocialIcon, Button  } from 'react-native-elements'

class PageOne extends Component {
  render() {
    const goToPageTwo = () => Actions.pageTwo({text: 'Hello World!'});
    const goToPageCameraRollPicker = () => Actions.pageCameraRollPicker();
    const pageCameraRollPickerUpload = () => Actions.pageCameraRollPickerUpload();
    const pagePhotoBrowser = () => Actions.pagePhotoBrowser();
    const pageMaps = () => Actions.pageMaps();
    const pageCalloutsMap = () => Actions.pageCalloutsMap();

    return (
      <View style={{flex:1, justifyContent: 'flex-start',alignItems: 'flex-start', marginTop: 60}}>
        <ScrollView>
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
                title='카메라롤 픽커 & 업로드(Real)'
                color='#f58'
                onPress={pageCameraRollPickerUpload}
            />
            <Button
                raised
                iconRight
                icon={{name: 'collections'}}
                title='사진 선택 업로드 테스트(Fetch_Blob)'
                color='#f50'
                onPress={goToPageCameraRollPicker}
            />
            <Button
                raised
                iconRight
                icon={{name: 'collections'}}
                title='photo browser'
                color='#f50'
                onPress={pagePhotoBrowser}
            />
            <Button
                raised
                iconRight
                icon={{name: 'collections'}}
                title='GeoLocation'
                color='#f50'
                onPress={pageMaps}
            />
            <Button
                raised
                iconRight
                icon={{name: 'collections'}}
                title='Map1-Callouts'
                color='#f50'
                onPress={pageCalloutsMap}
            />

            <Text onPress={Actions.pageMain}>Back Main!</Text>
            </ScrollView>
      </View>
    )
  }
}

export default connect()(PageOne);