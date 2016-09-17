/**
 * Created by leesy on 2016-08-26.
 */

'use strict';

import { combineReducers }  from 'redux';
import users  from './users';
//import routes  from './routes';
//import itemlist  from './ItemListReducer';

module.exports = combineReducers({
    users,
   //routes,
   // itemlist,
});
