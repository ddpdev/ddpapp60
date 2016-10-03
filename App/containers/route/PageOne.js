/**
 * Created by ms.kim2 on 2016-09-09.
 * @flow
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { SocialIcon, Button  } from 'react-native-elements'
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';


class PageOne extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoggedIn : false,
        };

        this.goToPageTwo = this.goToPageTwo.bind(this);
        this.goToPageCameraRollPicker = this.goToPageCameraRollPicker.bind(this);
        this.pageCameraRollPickerUpload = this.pageCameraRollPickerUpload.bind(this);
        this.pagePhotoBrowser = this.pagePhotoBrowser.bind(this);
        this.pageImagePicker = this.pageImagePicker.bind(this);
        this.pageMapExamples = this.pageMapExamples.bind(this);
        this.pageMaps = this.pageMaps.bind(this);
        this.pageWebView = this.pageWebView.bind(this);
        this.pageReactMap = this.pageReactMap(this);

        console.log("PageOne:",props,this.state);
    }

  goToPageTwo() {
    Actions.pageTwo({text: 'Hello World!'});
  }
  goToPageCameraRollPicker () {
    Actions.pageCameraRollPicker();
  }
  pageCameraRollPickerUpload() {
    Actions.pageCameraRollPickerUpload();
  }
  pagePhotoBrowser () {
    Actions.pagePhotoBrowser();
  }
  pageImagePicker () {
    Actions.pageImagePicker();
  }
  pageMapExamples () {
    Actions.pageMapExamples();
  }
  pageMaps () {
    Actions.pageMaps();
  }
  pageWebView () {
    Actions.pageWebView({uri:'http://istarkov.github.io/google-map-react/map/main'});
  }
  pageReactMap () {
    Actions.pageReactMap({provider:'google'})
  }


  render() {

    //const pageLocation = () => Actions.pageLocation();

    return (
      <View style={{flex:1, justifyContent: 'flex-start',alignItems: 'flex-start', marginTop: 60}}>
        <ScrollView>
            <Text >This is 테스트페이지 모음</Text>

            <Button
                raised
                iconRight
                icon={{name: 'collections'}}
                title='카메라롤 픽커 & 업로드(Real)'
                color='#f58'
                backgroundColor='#89faf8'
                onPress={this.pageCameraRollPickerUpload}
            />
            <Button
                raised
                iconRight
                icon={{name: 'collections'}}
                title='사진 선택 업로드 테스트(Fetch_Blob)'
                color='#f50'
                backgroundColor='#39fbf7'
                onPress={this.goToPageCameraRollPicker}
            />
            <Button
              raised
              iconRight
              icon={{name: 'collections'}}
              title='Image Picker,Camera,Video'
              color='#386'
              backgroundColor='#89faf8'
              onPress={this.pageImagePicker}
            />
            <Button
              raised
              iconRight
              icon={{name: 'collections'}}
              title='photo browser'
              color='#7c5'
              //backgroundColor='#39fbf7'
              onPress={this.pagePhotoBrowser}
            />
            <Button
              iconRight
              icon={{name: 'web'}}
              title='Web View(DDP)'
              color='#517fa4'
              backgroundColor='#89faf8'
              onPress={Actions.pageThree}
            />
            <Button
                iconRight
                icon={{name: 'web'}}
                title='google map 연동 테스트'
                color='#317fc4'
                backgroundColor='#89faf8'
                onPress={this.pageWebView}
            />
            <Button
                raised
                iconRight
                icon={{name: 'collections'}}
                title='Map 예제모음'
                color='#c93'
                backgroundColor='#89faf8'
                onPress={this.pageMapExamples}
            />
            <Button
                 iconRight
                 icon={{name: 'collections'}}
                 title='현재 위치 조회(GPS,WIFI)'
                 color='#517fa4'
                 backgroundColor='#89faf8'
                 onPress={Actions.pageAmapLocation}
            />
            <Button
                iconRight
                icon={{name: 'collections'}}
                title='현재 위치 조회(GPS,WIFI)-Android'
                color='#737ad4'
                backgroundColor='#c9fab8'
                onPress={Actions.pageAndroidLocation}
            />
            <Button
              iconRight
              icon={{name: 'collections'}}
              title='현재위치 - React GoogleMap 연동'
              color='#737fa4'
              backgroundColor='#a9cab8'
              onPress={this.pageReactMap}
            />
            <Button
                raised
                iconRight
                icon={{name: 'collections'}}
                title='지도 표시 테스트'
                color='#d47'
                backgroundColor='#79f9b3'
                onPress={this.pageMaps}
            />
            <Button
              iconRight
              icon={{name: 'web'}}
              title='Editor(draft) 테스트'
              color='#517fa4'
              backgroundColor='#89faf8'
              onPress={Actions.pageEditor}
            />
            <Button
              iconRight
              icon={{name: 'smartphone'}}
              title='go To PageTwo!'
              backgroundColor='#397af8'
              onPress={this.goToPageTwo}
            />

            <Text onPress={Actions.pageMain}>Back Main!</Text>
            </ScrollView>
      </View>
    )
  }
}

export default connect()(PageOne);