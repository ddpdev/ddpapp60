//@flow

'use strict';

import type {Action} from '../actions/types';

export type State = {
  isLoggedIn: boolean;
  id: ?string;
  name: ?string;
};

const initialState : State = {
  isLoggedIn: false,
  id: null,
  name: null,
};

function user(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'LOGGED_IN':
          return Object.assign({}, state, {
                  isLoggedIn: true,
                  id: action.id,
                  name: action.name
              });
    case 'SKIPPED_LOGIN':
        return Object.assign({}, state, {
                isLoggedIn: true,
                id: action.id,
                name: action.name
            });
    case 'LOGGED_OUT':
          return Object.assign({}, state, {
                  isLoggedIn: false,
                  id: null,
                  name: null
              });
    default:
        return state;
  }
}

module.exports = user;
