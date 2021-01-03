import { Reducer } from 'redux';
import { AuthActions, AuthActionTypes } from '../../actions/auth/auth-actions';

import { User } from '../../../types/user';

interface UserSliceState {
  user: User;
}

const INITIAL_STATE: UserSliceState = {
  user: {
    _id: localStorage.getItem('_id') || '',
    name: localStorage.getItem('user') || '',
    email: localStorage.getItem('email') || '',
    token: localStorage.getItem('jwt') || '',
  },
};

const authReducer: Reducer<UserSliceState, AuthActions> = (
  state = INITIAL_STATE,
  action: AuthActions
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
