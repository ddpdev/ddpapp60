/**
 * Created by ms.kim2 on 2016-09-09.
 */
import React, { Component } from 'react';
import { Alert, View, Text ,StyleSheet, Image,Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import _ from 'lodash';
import Path from 'path';
import ActionButton from 'react-native-action-button';
import CameraRollPicker from 'react-native-camera-roll-picker';
//import Icon from 'react-native-vector-icons/Ionicons';

import { SocialIcon, Button, Icon  } from 'react-native-elements'
import RNFetchBlob from 'react-native-fetch-blob'
import Base64 from 'base-64';

const UPLOAD_URL = 'http://app.ddpstyle.com/common/awsfileuploadTest';
const prefix = ((Platform.OS === 'android') ? 'file://' : '')

class PageCameraRollPicker extends Component {
  constructor(props) {
    super(props);
    const groupTypes = ['Album', 'All', 'Event', 'Faces', 'Library', 'PhotoStream','SavedPhotos'];

    selectType = props.groupTypes === 'undefinded' ? 'All' : 'SavedPhotos';
    //selectImages = [];

    this.state = {
      num: 0,
      selected: [],
      selectImagesUri : "",
      uploadProgressPercent : 0,
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
      uploadProgressPercent: 0,
    });
    //selectImages = this.state.selected.join();
    console.log("current:" +JSON.stringify(current));
    console.log("images:", JSON.stringify(images));
    console.log("selected:" + JSON.stringify(this.state.selected));
  }

  uploadImages(selectImages) {
    // width, height, uri
    var selectFiles = [];
    selectFiles = _.mapValues(selectImages, "uri");
    console.log("uploadImages:",selectImages.length,",",selectFiles);
    let dirName = "";
    let fileName = "";
    let extName = "";
    let srcFile = "";
    //let data = new FormData();

    if( selectImages.length > 0) {
      for (var i=0; i<selectImages.length; i++) {
        let tmpFile = selectImages[i].uri;
        dirName = Path.dirname(tmpFile);
        fileName = Path.basename(tmpFile);
        extName = Path.extname(tmpFile);


        if (Platform.OS === 'ios') {
           srcFile = selectImages[i].uri.replace('file://', '');
           console.log("upload[" + i + "]:" + selectImages[i].uri.replace('file://', '') + "," + dirName, ",filename:"+fileName, "ext:"+extName);
        } else {
          srcFile = selectImages[i].uri;
           console.log("upload[" + i + "]:" + selectImages[i].uri + "," + dirName, ",filename:"+fileName, "ext:"+extName);
        }

        //data.append('file',srcFile);

        console.log("RNFetchBlob Start["+i+"]:",fileName+"_"+i,", SERVER:",UPLOAD_URL);

        var base64ImageString = Base64.encode(srcFile);

        RNFetchBlob.fetch('POST', UPLOAD_URL, {

            originalFileName: fileName,
            path: srcFile,
            otherHeader : "foo",
            'Content-Type': 'multipart/form-data',
        }, [
          { name : 'myfile', filename: srcFile, type:'image/png', data : base64ImageString}
          ])
          //'Content-Type' : 'multipart/form-data;' // charset=utf-8; boundary: ------DDPStyleBoundaryQGvWeNAiOE4g2VM5--;', //application/octet-stream
        // }, [
        //   //{"fieldName":"myfile","originalFilename":
        //   // append field data from file path
        //   { name : "myfile", filename : fileName+"_"+i,  data: Base64.encode(srcFile) },
        //   //{ fieldName : "myfile", "originalFilename" : srcFile, "type":'image/*', data:  RNFetchBlob.wrap(srcFile) },
        // ])    // listen to upload progress event
          .uploadProgress((written, total) => {
            console.log('uploaded:', + Math.floor(written/total*100) + '%', written / total);
            this.setState({
              uploadProgressPercent : Math.floor(written/total*100)
            });
          })
          // listen to download progress event
          // .progress((received, total) => {
          //   console.log('download progress', + Math.floor(received/total*100) + '%', received / total);
          // })
          .then((resp) => {
            if (resp.status !== 200){
              console.log("response status:", resp.status);
            } else {
              console.log("response OK status:", resp.status);
            }
            console.log("Upload Fetch Response", resp);
          }).catch((err) => {
          console.log("Upload Fetch Error", err);
        });

      }
   }

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
              { this.state.selected.length > 0 && this.state.selectImagesUri != "" ?
                <Image  source={{uri: this.state.selectImagesUri}} style={styles.thumbnail}>
                <Text style={styles.imageInfo}>{this.state.selectImagesUri}</Text>
                </Image>
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
                              {text:'OK', onPress:()=> this.uploadImages(this.state.selected)},
                            ]
                        )}
                />
              <Text style={styles.bold}>{this.state.uploadProgressPercent}%</Text>
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
    //width: Dimensions.get('window').width/3,
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
  imageInfo: {
    fontSize: 6,
    alignItems: 'flex-start',
    color: 'black',
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

export default connect()(PageCameraRollPicker);