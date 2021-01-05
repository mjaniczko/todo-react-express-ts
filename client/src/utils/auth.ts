const TOKEN_KEY = 'jwt';

export const hasJWTToken = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};

export const setLocalStorageUserData = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeLocalStorageUserData = () => {
  localStorage.removeItem(TOKEN_KEY);
};
