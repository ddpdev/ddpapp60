import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Router, Scene, Actions, Modal,NavBar,TabBar, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Error from './Error';
import StatusModal from './components/StatusModal';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import PageWebView from './PageWebView';
import PageEditor from './PageEditor';
import MainApp from '../../mainApp';
import Product from '../product/productlistview';
import ProductDetail from '../product/productDetail';
import PageImagePicker from './PageImagePicker';
import CameraRollPicker from './cameraRollPicker';
import PageCameraRollPicker from './PageCameraRollPicker';
import PageCameraRollPickerUpload from './PageCameraRollPickerUpload';
import PagePhotoBrowser from './PagePhotoBrowser';
import PageMaps from './map/PageMaps';
import PageAmapLocation from './map/PageAmapLocation';
import PageAndroidLocation from './map/PageAndroidLocation';
import PageMapExamples from './map/PageMapExamples';
//import PageCameraRoll from './camera/PageCameraRoll';

import Icon from "react-native-vector-icons/EvilIcons";
//import * as actions from '../../actions'

// class Right extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log("Right:",props);
//   }
//   render(){
//     return <Text style={{
//       width: 80,
//       height: 37,
//       position: "absolute",
//       bottom: 4,
//       right: 2,
//       padding: 8,
//     }} onClick={()=>Actions.pageProduct}>{this.props.rightTitle}</Text>
//   }
// }

class RootContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn : false,
    }
    console.log("App:",props,this.state);
  }
  // componentDidMount() {
  //   //const { state} = this.props;
  //
  //   console.log("DidMount:",state,actions);
  //
  //   if(this.state.isLoggedIn) {
  //     console.log("isLoggedIn",this.state.isLoggedIn);
  //     userActions.userlogin();
  //   }
  // }

  render() {
    //const { state, actions } = this.props;
    //const { userActions } = actions;

    console.log("render:", this.props, this.state); // everything ok here
    const scenes = Actions.create(
      <Scene key="scene">
        <Scene key="modal" component={Modal} >
          <Scene key="root" hideNavBar={false}>
              <Scene key="pageOne" component={PageOne} title="Page One"
                onRight={()=>(Actions.pageMain({type: ActionConst.REPLACE}))}
                rightTitle='Main'
                />
              <Scene key="pageTwo" component={PageTwo} title="Page Two" />
              <Scene key="pageThree" component={PageThree} title="웹뷰(DDPStyle)"
                     onRight={()=>(Actions.pageMain({type: ActionConst.REPLACE}))}
                     rightTitle='Main'
              />
              <Scene key="pageWebView" component={PageWebView} title="웹뷰"
                     onRight={()=>(Actions.pageMain({type: ActionConst.REPLACE}))}
                     rightTitle='Main'
              />
              <Scene key="pageMaps" component={PageMaps} title="Map Location 테스트"
                     onRight={()=>(Actions.pageMain({type: ActionConst.REPLACE}))}
                     rightTitle='Main'
              />
              <Scene key="pageAmapLocation" component={PageAmapLocation} title="현재 위치(GPS,WIFI)"
                    onRight={()=>(Actions.pageMain({type: ActionConst.REPLACE}))}
                    rightTitle='Main'
              />
              <Scene key="pageAndroidLocation" component={PageAndroidLocation} title="현재 위치(GPS,WIFI)-Android"
                     onRight={()=>(Actions.pageMain({type: ActionConst.REPLACE}))}
                     rightTitle='Main'
              />
              <Scene key="pageMapExamples" component={PageMapExamples} title="Map Examples"
                     onRight={()=>(Actions.pageMain({type: ActionConst.REPLACE}))}
                     rightTitle='Main'
              />
              {/*<Scene key="pageCameraRoll" component={PageCameraRoll} title="기본 카메라롤"*/}
                     {/*onRight={()=>(Actions.pageMain({type: ActionConst.REPLACE}))}*/}
                     {/*rightTitle='Main'*/}
              {/*/>*/}


              <Scene key="pageEditor" component={PageEditor} title="에디터"
                     onRight={()=>(Actions.pageMain({type: ActionConst.REPLACE}))}
                     rightTitle='Main'
              />
              <Scene key="pageCameraRollPicker" component={PageCameraRollPicker} title="사진 업로드(Test)"
                     onRight={()=>(Actions.pageMain({type: ActionConst.REPLACE}))}
                     rightTitle='Main'
              />
              <Scene key="pageCameraRollPickerUpload" component={PageCameraRollPickerUpload} title="사진 업로드(Real)"
                     onRight={()=>(Actions.pageMain({type: ActionConst.REPLACE}))}
                     rightTitle='Main'
              />

              <Scene key="productList" component={Product} title="Product List"
                  onRight={()=>(Actions.productDetail({type: ActionConst.REPLACE}))}
                  rightTitle='상품설명'
                />
                <Scene  key="productDetail" component={ProductDetail} title="Product Detail"
                       onRight={()=>(Actions.productList({type: ActionConst.REPLACE}))}
                       rightTitle='리스트'
                />
            <Scene key="pageImagePicker" component={PageImagePicker} title="Image Picker"
                   onRight={()=>(Actions.pageMain({type: ActionConst.REPLACE}))}
                   rightTitle='Main' />
            <Scene key="cameraRollPicker" component={CameraRollPicker} title="Camera Roll Picker"
                     onRight={()=>(Actions.pageMain({type: ActionConst.REPLACE}))}
                     rightTitle='Main' />

            <Scene key="pagePhotoBrowser" component={PagePhotoBrowser} title="Photo Browser"
                     onRight={()=>(Actions.pageMain({type: ActionConst.REPLACE}))}
                     rightTitle='Main' />


              <Scene key="pageMain" component={MainApp} title="Main" initial={true}
                onLeft={()=>(Actions.pageOne({type: ActionConst.REPLACE}))}
                leftTitle="모음"
                onRight={()=>(Actions.productList({type: ActionConst.REPLACE}))}
                rightTitle='리스트' />

          <Scene key="statusModal" component={StatusModal} />
          <Scene key="error" component={Error}/>
            </Scene>
        </Scene>
      </Scene>
    );
    return (
            <Router hideNavBar={false}  scenes={scenes} />
    );
  }
}
//
// function select(store) {
//   console.log("select:",store);
//   return {
//     isLoggedIn: store.user.isLoggedIn || false,
//   };
// }
// export default connect(select)(App);
export default connect()(RootContainer);
