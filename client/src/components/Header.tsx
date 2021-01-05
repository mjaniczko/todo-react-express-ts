import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout } from '../redux/actions/auth/auth-actions';
import { resetTodoAction } from '../redux/actions/todos/todos-actions';

export const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(resetTodoAction());
    history.push('/');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
