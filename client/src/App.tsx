import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TodoPage from './components/TodoPage';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Route exact path='/' component={LandingPage} />
      <Switch>
        <Route exact path='/login'>
          <LoginPage />
        </Route>

        <PrivateRoute exact path='/todos' component={TodoPage} />
      </Switch>
    </Router>
  );
};

export default App;
