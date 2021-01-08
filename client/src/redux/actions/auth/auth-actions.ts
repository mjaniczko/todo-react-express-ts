import axios from 'axios';
import { Dispatch } from 'redux';

import { User } from '../../../types/interfaces';
import {
  setLocalStorageUserData,
  removeLocalStorageUserData,
  getLocalStorageUserToken,
} from '../../../utils/auth';

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  GET_ME = 'GET_ME',
}

interface Login {
  type: AuthActionTypes.LOGIN;
  payload: User;
}
interface Logout {
  type: AuthActionTypes.LOGOUT;
}

interface GetMe {
  type: AuthActionTypes.GET_ME;
  payload: User;
}

export type AuthActions = Login | Logout | GetMe;

export const loginAction = (user: User) => ({
  type: AuthActionTypes.LOGIN,
  payload: user,
});

export const getMeAction = (user: User) => ({
  type: AuthActionTypes.GET_ME,
  payload: user,
});

export const logoutAction = () => ({
  type: AuthActionTypes.LOGOUT,
});

export const login = ({ email, password }: { email: string; password: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.post('http://localhost:8000/api/v1/user/login', { email, password });
      const data = res.data;
      setLocalStorageUserData(data.token);
      dispatch(loginAction({ token: data.token, ...data.user }));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      removeLocalStorageUserData();
      dispatch(logoutAction());
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const getMe = () => {
  return async (dispatch: Dispatch) => {
    try {
      const token = getLocalStorageUserToken();
      const res = await axios.get('http://localhost:8000/api/v1/user/me', {
        params: { token },
      });
      dispatch(getMeAction({ ...res.data, token }));
    } catch (err) {
      console.log(err.message);
    }
  };
};
