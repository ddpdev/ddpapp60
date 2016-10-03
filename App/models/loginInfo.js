/**
 * realm db schema
 * @flow
 *
* */

export type DeviceInfo = {
    uniqueId: ?string,
    modelName: ?string,
    deviceId: ?string,
    deviceLocale: ?string,
    version: ?string,
    brand: ?string,
    timezone: ?any,
};

export type GeoLocationInfo = {
    speed: ?number,
    longitude: ?number,
    latitude: ?number,
    accuracy: ?number,
    heading: ?number,
    altitude: ?number,
    altitudeAccuracy: ?number,
    getDateTime: ?any,
};

export type UserLocation = {
    userName: ?string,
    userId: ?string,
    deviceInfo: ?DeviceInfo,
    geoLocation: ?Array<GeoLocation>,
};
