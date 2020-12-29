import { Reducer } from 'redux';
import { AuthActions, AuthActionTypes } from '../../actions/auth/auth-actions';

interface IInitialState {
  user: {
    _id: string;
    name: string;
    email: string;
    token: string;
  };
}

const INITIAL_STATE: IInitialState = {
  user: {
    _id: '',
    name: '',
    email: '',
    token: '',
  },
};

const authReducer: Reducer<any, AuthActions> = (state = INITIAL_STATE, action: AuthActions) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default authReducer;
