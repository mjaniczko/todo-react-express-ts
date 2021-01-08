import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { hasJWTToken } from './utils/auth';
import { TodoPage } from './components/TodoPage';
import { LoginPage } from './components/LoginPage';
import { LandingPage } from './components/LandingPage';
import { PrivateRoute } from './components/PrivateRoute';
import { getMe } from './redux/actions/auth/auth-actions';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasJWTToken()) {
      dispatch(getMe());
    }
  }, [dispatch]);

  return (
    <Router>
      <Route exact path='/' component={LandingPage} />
      <Switch>
        <Route path='/login'>
          <LoginPage />
        </Route>

        <PrivateRoute path='/todos' component={TodoPage} />
        <Route render={() => <Redirect to='/' />} />
      </Switch>
    </Router>
  );
};
