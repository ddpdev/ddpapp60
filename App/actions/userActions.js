
'use strict';

import type { Action } from './types';

function userLogin(): Action {
  return {
    type: 'LOGGED_IN',
    isLoggedIn:true,
    id : 'aaa',
    name : '가가가'
  };
}

function userLogout(): Action {
  return {
    type: 'LOGGED_OUT',
    isLoggedIn:false,
    id : '',
    name : ''
  };
}


function userSkippedLogin(): Action {
  return {
    type: 'SKIPPED_LOGIN',
    isLoggedIn:true,
    id : 'autologinid',
    name : '마이네임이즈~'
  };
}


module.exports = {
  userLogin,
  userLogout,
  userSkippedLogin,
};
