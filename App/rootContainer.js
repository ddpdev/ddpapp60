import React, { Component } from 'React';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
   Router,
   Scene,
   Actions,
   Reducer,
   ActionConst
 } from 'react-native-router-flux';

import { bindActionCreators} from 'redux';
import { Provider, connect } from 'react-redux';

// 모든 액션, 리듀서 등록
import * as reducers from './reducers';
import * as actions from './actions';

// define Scenes
import mainApp from './mainAppView';
import view1 from './view1';
import view2 from './view2';


const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};


class rootContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log("rootContainer start");
        const { state, actions } = this.props;
		    console.log("Props", this.props, state, actions); // everything ok here

        return (
              <Router createReducer={reducerCreate}>
                <Scene key="root" hideNavBar={true}>
                  <Scene key="mainApp" component={mainApp} title="mainApp"/>
                  <Scene key="view1" component={view1} title="view1"/>
                  <Scene key="view2" component={view1} title="view2"/>
                </Scene>
                </Router>
              );
    }
}

export default connect()(rootContainer);
