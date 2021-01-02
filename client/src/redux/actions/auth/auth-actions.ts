import axios from 'axios';
import { Dispatch } from 'redux';

import { User } from '../../../types/user';
import { setLocalStorageUserData, removeLocalStorageUserData } from '../../../utils/auth';

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

interface Login {
  type: AuthActionTypes.LOGIN;
  payload: string;
}

interface Logout {
  type: AuthActionTypes.LOGOUT;
  payload: User;
}

export type AuthActions = Login | Logout;

export const loginAction = (user: User) => ({
  type: AuthActionTypes.LOGIN,
  payload: user,
});

export const logoutAction = (user: {
  token: string;
  name: string;
  email: string;
  _id: string;
}) => ({
  type: AuthActionTypes.LOGOUT,
  payload: user,
});

export const login = ({ email, password }: { email: string; password: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.post('http://localhost:8000/api/v1/user/login', { email, password });
      const data = await res.data;
      setLocalStorageUserData(data.user);
      dispatch(loginAction({ token: data.token, ...data.user }));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      const user = { email: '', token: '', name: '', _id: '' };
      removeLocalStorageUserData();
      dispatch(logoutAction(user));
    } catch (err) {
      console.log(err.message);
    }
  };
};
