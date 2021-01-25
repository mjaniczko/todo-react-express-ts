import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <Link to='/login'>Login</Link>
      </div>
      <div>
        <Link to='/todos'>Todos</Link>
      </div>
    </div>
  );
};
