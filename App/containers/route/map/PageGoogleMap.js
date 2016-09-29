/**
 * Created by ms.kim2 on 2016-09-29.
 * @flow
 */

import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

// import { Actions } from 'react-native-router-flux';
// import { connect } from 'react-redux';

import GoogleMap from 'google-map-react';
import MyGreatPlace from './MyGreatPlace';

export default class PageGoogleMap extends Component {

  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any,
    //checktime?: PropTypes.any,
  };

  static defaultProps = {
    center: {lat: 37.5321114, lng: 126.8465744},
    zoom: 9,
    greatPlaceCoords: {lat: 37.5321114, lng: 126.8465744}
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);

    this.state = {
      curPostion : [],
      placeCoords : [],
      checktime:[],
    }
    console.log("PageGoogleMap",props,this.state);
  }

  render() {
    return (
      <GoogleMap
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}>
        <MyGreatPlace lat={37.5477261} lng={126.9250935} text={'A'}  />
        <MyGreatPlace {...this.props.greatPlaceCoords} text={'B'}  />
      </GoogleMap>
    );
  }
}

//export default connect()(PageGoogleMap);