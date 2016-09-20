/**
 * Created by ms.kim2 on 2016-09-09.
 */
import React, { Component } from 'react';
import { Alert, View, Text ,StyleSheet, Image,Platform, DeviceEventEmitter,FormData } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import _ from 'lodash';
import Path from 'path';
import ActionButton from 'react-native-action-button';
import CameraRollPicker from 'react-native-camera-roll-picker';
//import Icon from 'react-native-vector-icons/Ionicons';
import { SocialIcon, Button, Icon  } from 'react-native-elements';


//const UPLOAD_URL = 'http://app.ddpstyle.com/common/awsfileuploadTest';
const UPLOAD_URL = 'http://app.ddpstyle.com/json/post/uploadFormTest';
const prefix = ((Platform.OS === 'android') ? 'file://' : '')

class PageCameraRollPickerFormData extends Component {
  constructor(props) {
    super(props);
    const groupTypes = ['Album', 'All', 'Event', 'Faces', 'Library', 'PhotoStream','SavedPhotos'];

    selectType = props.groupTypes === 'undefinded' ? 'All' : 'SavedPhotos';
    //selectImages = [];

    this.state = {
      num: 0,
      selected: [],
      selectImagesUri : "",
    };

    this.getSelectedImages = this.getSelectedImages.bind(this);

    console.log("PageImagePicker",this.props,this.state);

  }


  getSelectedImages(images, current) {
    var num = images.length;

    this.setState({
      num: num,
      selected: images,
      selectImagesUri: current.uri.toString(),
    });

    //selectImages = this.state.selected.join();

    console.log("selectImagesUri:", current.uri.toString());
    console.log("images:", images);
    console.log(this.state.selected);
  }


  doUpload(selectImages){

    // width, height, uri
    var selectFiles = [];
    selectFiles = _.mapValues(selectImages, "uri");

    console.log("doUpload:",selectImages.length,",",selectFiles,",",Path.basename(_.mapValues(selectImages, "uri")));

    let dirName = "";
    let fileName = "";
    let extName = "";
    let srcFile = "";
    let data = new FormData();
    let uploadFiles = [];

    if( selectImages.length > 0) {
      for (var i = 0; i < selectImages.length; i++) {
        let tmpFile = selectImages[i].uri;
        dirName = Path.dirname(tmpFile);
        fileName = Path.basename(tmpFile);
        extName = Path.extname(tmpFile);

        if (Platform.OS === 'ios') {
          srcFile = selectImages[i].uri.replace('file://', '');
          console.log("upload[" + i + "]:" + selectImages[i].uri.replace('file://', '') + "," + dirName, ",filename:" + fileName, "ext:" + extName);
        } else {
          srcFile = selectImages[i].uri;
          console.log("upload[" + i + "]:" + selectImages[i].uri + "," + dirName, ",filename:" + fileName, "ext:" + extName);
        }
        uploadFileInfo = {
          name: 'file[]',
          filename: fileName,
          filepath: srcFile,  // image from camera roll/assets library
          filetype: 'image/*',
        };
        uploadFiles = uploadFiles.concat(uploadFileInfo);
      }
      console.log("uploadFiles:",uploadFiles);
    }
  }

  postData (url, params, fileURL) {
    let data = new FormData();

    let dirName = Path.dirname(tmpFile);
    let fileName = Path.basename(tmpFile);
    let extName = Path.extname(tmpFile);

    if (fileURL) {
      data.append('image', {uri: fileURL, name: 'image.jpg', type: 'image/jpg'})
    }
    _.each(params, (value, key) => {
      if (value instanceof Date) {
        data.append(key, value.toISOString())
      } else {
        data.append(key, String(value))
      }
    })
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data; boundary=ddpstyle-----6ff46e0b6b5148d984f148b6542e5a5d',
        'Content-Language': 'utf-8',
        //'Authorization': 'Token ABCDEF123457890',
      },
      body: data,
    }
    return fetch(API_URL + url, config)
      .then(checkStatusAndGetJSONResponse)
  }




   // groupTypes : The group where the photos will be fetched, one of 'Album', 'All', 'Event', 'Faces', 'Library', 'PhotoStream' and 'SavedPhotos'. (Default: SavedPhotos)
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.imageContent}>
            <CameraRollPicker
              scrollRenderAheadDistance={500}
              initialListSize={1}
              pageSize={3}
              removeClippedSubviews={true}
              groupTypes={selectType}
              batchSize={5}
              maximum={15}
              selected={this.state.selected}
              assetType='Photos'
              imagesPerRow={3}
              imageMargin={5}
              callback={this.getSelectedImages} />
          </View>
          <View style={styles.content}>
            <View style={styles.view1}>
              <Text style={styles.text}>
                <Text style={styles.bold}> {this.state.num} </Text> images selected
              </Text>
            </View>
            <View style={styles.view2}>
              { this.state.selectImagesUri != "" ?
                <Text style={styles.bold}>
                <Image  source={{uri: this.state.selectImagesUri}} style={styles.thumbnail}/>
                 {this.state.selectImagesUri}
                 </Text>
                : null }
            </View>
            {/*{action button}*/}
            <View style={styles.view3}>
              <Icon
                raised
                name='image'
                type='font-awesome'
                color='#f50'
                onPress={()=> Alert.alert(
                            '파일업로드',
                            '선택한파일을 등록하시겠습니까?',
                            [
                              {text:'Cancel', onPress:()=> console.log('Cancel Pressed')},
                              {text:'OK', onPress:()=> this.doUpload(this.state.selected)},
                            ]
                        )}
                />
            </View>
          </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: Dimensions.get('window').height ,
    //width: Dimensions.get('window').width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start', //'center',
    backgroundColor: 'green',
  },
  imageContent: {
    //flex: 1,
    marginTop: 130,
    //height: 250,
    flexDirection: 'row',
    height: Dimensions.get('window').height/2 + 100 ,
    width: Dimensions.get('window').width,
    //justifyContent: 'flex-start',
    //alignItems: 'flex-start',
    backgroundColor: 'steelblue',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    //marginTop: 15,
    //height: 150,
    height: Dimensions.get('window').height/2 -100,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'skyblue',
    //flexWrap: 'wrap',
  },
  view1:{
    marginTop: 5,
    width: Dimensions.get('window').width/3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'skyblue',
  },
  view2:{
    marginTop: 5,
    width: Dimensions.get('window').width/3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  view3:{
    marginTop: 5,
    width: Dimensions.get('window').width/3,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'steelblue',
    backgroundColor: 'skyblue',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: 'black',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
  thumbnail:{
    width:80,
    height:80,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default connect()(PageCameraRollPickerFormData);