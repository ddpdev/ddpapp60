/**
 * @flow
 */


 'use strict';

 import React, { Component } from 'React';
 import {
   StyleSheet,
   Text,
   View
 } from 'react-native';

 import { Provider, connect } from 'react-redux';
 import {
    Router,
    Scene,
    Actions,
  } from 'react-native-router-flux';

 const RouterWithRedux = connect()(Router);

 import configureStore from './store/configureStore';
 //import MainApp from './mainApp';
 import RootContainer from './containers/route/rootContainer';
 // component can connect and listen to props
 // const connMainApp = connect()(MainApp);



 //const store = configureStore();

 export default class Setup extends Component {
    // @flow Type define
  //   state : {
  //    isLoading : boolean,
  //    isLogin : boolean,
  //    store:any,
  //  }

   constructor(props) {
     super(props);
     this.state = {
       isLoading : true,
       isLogin : true,
       store: configureStore(),
     }
    console.log("Setup constructor:",this.state);
  }

   render() {
     //const { state, actions } = this.props;
     console.log("Setup Render:");
     // create Scene
    //  const scenes = Actions.create(
    //    <Scene key="scene">
    //      <Scene key="mainApp" Component={MainApp} title="Launch" id={"ddpstyle"} name={"스타일"}  initial={true}  />
    //    </Scene>
    //  ) ;

     return (
       <Provider store={this.state.store}>
         <RootContainer />
       </Provider>
     );
   }
  }

//<Scene key="mainApp" Component={MainApp} title="Launch" id={"ddpstyle"} name={"스타일"}  initial={true} state={state} {...actions} />
 global.LOG = (...args) => {
   console.log('/------------------------------\\');
   console.log(...args);
   console.log('\\------------------------------/');
   return args[args.length - 1];
 };
