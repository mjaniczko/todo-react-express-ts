import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Todo App</h1>
      <Link to='/login'>Login</Link>
      <br />
      <Link to='/todos'>Todos</Link>
    </div>
  );
};

export default LandingPage;
