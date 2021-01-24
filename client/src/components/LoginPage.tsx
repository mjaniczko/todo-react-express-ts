import { useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Input } from './UI/Input/Input';
import { RootState } from '../redux/store';
import { Button } from './UI/Button/Button';
import { hasJWTToken } from './../utils/auth';
import { login } from './../redux/actions/auth/auth-actions';

export const LoginPage = () => {
  const [auth, setAuth] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuth({ ...auth, [name]: value });
  };

  const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    await dispatch(login(auth));
    setAuth({ email: '', password: '' });
    if (hasJWTToken()) {
      history.push('/todos');
    }
  };

  return (
    <div>
      <h1>Login into your Todo account</h1>
      <form>
        <Input
          type='email'
          name='email'
          value={auth.email}
          placeholder='Email'
          onChange={handleChange}
        />
        <Input
          type='password'
          name='password'
          value={auth.password}
          placeholder='Password'
          onChange={handleChange}
        />
        {authError.length > 0 && <span>{authError}</span>}
        <Button onClick={handleLogin} type='button'>
          Login
        </Button>
      </form>
    </div>
  );
};
