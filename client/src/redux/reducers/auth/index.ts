import { Reducer } from 'redux';
import { AuthActions, AuthActionTypes } from '../../actions/auth/auth-actions';

import { User } from '../../../types/interfaces';

interface UserState {
  user: User;
  error: string;
}

const INITIAL_STATE: UserState = {
  user: {
    name: '',
    email: '',
    token: localStorage.getItem('jwt') || '',
  },
  error: '',
};

export const authReducer: Reducer<UserState, AuthActions> = (
  state = INITIAL_STATE,
  action: AuthActions
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case AuthActionTypes.GET_ME:
      return {
        ...state,
        user: action.payload,
      };

    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        user: INITIAL_STATE.user,
      };
    case AuthActionTypes.AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
