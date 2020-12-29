import { useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from './UI/Input/Input';
import Button from './UI/Button/Button';
import { isLogin } from './../utils/auth';
import { login } from './../redux/actions/auth/auth-actions';

const LoginPage = () => {
  const [auth, setAuth] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuth({ ...auth, [name]: value });
  };

  const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    await dispatch(login(auth));
    setAuth({ email: '', password: '' });
    if (isLogin()) history.push('/todos');
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <Input
          type='password'
          name='password'
          value={auth.password}
          placeholder='Password'
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <Button onClick={(e: MouseEvent) => handleLogin(e)}>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
