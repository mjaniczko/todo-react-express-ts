import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { TodoPage } from './components/TodoPage';
import { LoginPage } from './components/LoginPage';
import { LandingPage } from './components/LandingPage';
import { PrivateRoute } from './components/PrivateRoute';

export const App = () => {
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
