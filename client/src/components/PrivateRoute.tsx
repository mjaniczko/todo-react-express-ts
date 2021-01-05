import { Route, Redirect, RouteProps } from 'react-router-dom';

import { hasJWTToken } from '../utils/auth';

interface PrivateRouteProps extends RouteProps {
  component: (props: any) => JSX.Element;
}

export const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) => (hasJWTToken() ? <Component {...props} /> : <Redirect to='/login' />)}
    />
  );
};
