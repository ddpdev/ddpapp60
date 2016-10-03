/**
 * @flow
 */

'use strict';

/* Example location returned
 {
 speed: -1,
 longitude: -0.1337,
 latitude: 51.50998,
 accuracy: 5,
 heading: -1,
 altitude: 0,
 altitudeAccuracy: -1
 }
 */

const GeoLocation = {
  name: 'GeoLocation',
  properties: {
    speed: {type:'int', optional:true},
    longitude: {type:'int', optional:true},
    latitude: {type:'int', optional:true},
    accuracy: {type:'int', optional:true},
    heading: {type:'int', optional:true},
    altitude: {type:'int', optional:true},
    altitudeAccuracy: {type:'int', optional:true},
    getDateTime: {type: 'date', optional: true , indexed: true }, // 선택적 속성
  }
};

const DeviceInfo = {
  name: 'DeviceInfo',
  properties: {
    uniqueId: {type: 'string',optional: true},
    modelName: {type: 'string',optional: true},
    deviceId: {type: 'string',optional: true},
    deviceLocale: {type: 'string',optional: true},
    version: {type: 'string',optional: true},
    brand: {type: 'string',optional: true},
    timezone: {type: 'string',optional: true},
  }
};

const UserLocation = {
  name: 'UserLocation',
  properties: {
    userName: {type:'string', optional:true},
    userId: {type:'string', optional:true, indexed: true},
    deviceInfo: 'DeviceInfo',
    geoLocation: {
      type: 'list',
      objectType: 'GeoLocation'
    }
  }
};

module.exports = {
  schema: [GeoLocation, DeviceInfo, UserLocation],
  schemaVersion: 2,
  migration: () => {}
};
