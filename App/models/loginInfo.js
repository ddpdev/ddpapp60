/**
 * realm db schema
 * @flow
 *
* */

const UserInfo = {
    name : 'UserInfo',
    properties : {
        isLoggedIn: 'boolean',
        id : 'string',
        name : 'string',
        icon : 'string'
    }
};

const LocationInfo = {
    name : 'LocationInfo',
    properties {
        latitude: 'int',
        longitude: 'int',
        latitudeDelta: 'int',
        longitudeDelta: 'int',
        lastdate: 'date'
    }
};

const UserLocation = {
    name : 'UserLocation',
    properties : {
        id : 'string',
        lastdate: 'date',
        location : {type:'list', objectType:'LocationInfo'}
    }
};
