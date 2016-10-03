/**
 * Created by ms.kim2 on 2016-10-03.
 * @flow
 */

'use strict';

import realm from '../realm';

class UserLocationService {

  //
  async initialize() {
    let context = realm.current();

    try {
      let userLocation = context.objects('UserLocation');
      if(userLocation.length > 0) {
        return;
      }
      let currnetLocation = await this.getCurrentLocationFromApi();

    }

  }

  async getCurrentLocationFromApi() {

    let geo_options = {
      enableHighAccuracy: true,
      maximumAge        : 30000,
      timeout           : 27000
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let initialPosition = JSON.stringify(position);
        console.log("initialPosition",initialPosition);
        //this.updatePosition(initialPosition);
        currentRegion.latitude = position.coords.latitude;
        currentRegion.longitude = position.coords.longitude;

        this.setState({region : currentRegion});
      },
      (error) => console.log("error:",error), //alert(JSON.stringify(error)),
      geo_options
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      let lastPosition = JSON.stringify(position);
      //console.log("initialPosition",lastPosition);
      //this.updatePosition(lastPosition);
      //this.setState(this.state.region.latitude: position.latitude, this.state.region.longitude : position.longitude);
      currentRegion.latitude = position.coords.latitude;
      currentRegion.longitude = position.coords.longitude;

      this.setState({region : currentRegion});
      console.log("currentPosition:", this.watchID, lastPosition);
    });

  }

}