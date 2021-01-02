import { User } from '../types/user';

const TOKEN_KEY = 'jwt';
const USER_NAME = 'user';
const USER_EMAIL = 'email';
const USER_ID = '_id';

export const hasJWTToken = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};

export const setLocalStorageUserData = (user: User) => {
  localStorage.setItem(TOKEN_KEY, user.token);
  localStorage.setItem(USER_ID, user._id);
  localStorage.setItem(USER_EMAIL, user.email);
  localStorage.setItem(USER_NAME, user.name);
};

export const removeLocalStorageUserData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(USER_EMAIL);
  localStorage.removeItem(USER_NAME);
};
