//@flow

'use strict';

// model type 정의
export type {loignInfo} from '../models/loignInfo';

// type 상수 정의
// status값을 같이 정의해줘야 함.
export type Action =
    { type: 'SKIPPED_LOGIN', loginInfo }
  | { type: 'LOGGED_OUT', loginInfo }
  | { type: 'LOGGED_IN', loginInfo }
;
