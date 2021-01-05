import { Reducer } from 'redux';
import { AuthActions, AuthActionTypes } from '../../actions/auth/auth-actions';

import { User } from '../../../types/interfaces';

interface UserSliceState {
  user: User;
}

const INITIAL_STATE: UserSliceState = {
  user: {
    _id: '',
    name: '',
    email: '',
    token: localStorage.getItem('jwt') || '',
  },
};

export const authReducer: Reducer<UserSliceState, AuthActions> = (
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
        user: INITIAL_STATE.user,
      };
    default:
      return state;
  }
};
