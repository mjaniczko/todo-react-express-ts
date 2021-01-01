import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout } from './../redux/actions/auth/auth-actions';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
