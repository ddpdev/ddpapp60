/**
 * Created by ms.kim2 on 2016-09-04.
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
 import MainApp from './mainApp';
 //import RootContainer from './containers/route/rootContainer';
 // component can connect and listen to props
 // const connMainApp = connect()(MainApp);



 const store = configureStore();

 export default class Setup extends Component {
   constructor(props) {
     super(props);
     console.log("Setup constructor");
    }
   render() {
     const { state, actions } = this.props;
     console.log("Setup Render");
     // create Scene
    //  const scenes = Actions.create(
    //    <Scene key="scene">
    //      <Scene key="mainApp" Component={MainApp} title="Launch" id={"ddpstyle"} name={"스타일"}  initial={true}  />
    //    </Scene>
    //  ) ;

     return (
       <Provider store={store}>
         <MainApp/>
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
