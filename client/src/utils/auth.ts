const TOKEN_KEY = 'jwt';

export const setJWTToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeJWTToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const hasJWTToken = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};
