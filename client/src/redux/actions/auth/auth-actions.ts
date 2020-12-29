import axios from 'axios';
import { Dispatch } from 'redux';

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
}

export type AuthActions = Login | Logout;

export const loginAction = (user: { token: string; name: string; email: string; _id: string }) => ({
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
      const data = await res.data;
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('_id', data.user._id);
      localStorage.setItem('user', data.user.name);
      dispatch(loginAction({ token: data.token, ...data.user }));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      localStorage.removeItem('jwt');
      localStorage.removeItem('_id');
      localStorage.removeItem('user');
      dispatch(logoutAction());
    } catch (err) {
      console.log(err.message);
    }
  };
};
