import axios from 'axios';
import { Dispatch } from 'redux';

import { User } from '../../../types/interfaces';
import { setLocalStorageUserData, removeLocalStorageUserData } from '../../../utils/auth';

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

interface Login {
  type: AuthActionTypes.LOGIN;
  payload: User;
}

interface Logout {
  type: AuthActionTypes.LOGOUT;
}

export type AuthActions = Login | Logout;

export const loginAction = (user: User) => ({
  type: AuthActionTypes.LOGIN,
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
