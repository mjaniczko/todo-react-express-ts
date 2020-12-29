import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { isLogin } from './utils/auth';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodosList from './components/TodosList';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) => (isLogin() ? <Component {...props} /> : <Redirect to='/login' />)}
    />
  );
};

const TodoPage = () => {
  return (
    <>
      <Header />
      <TodoForm />
      <TodosList />
    </>
  );
};

function App() {
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
}

export default App;
