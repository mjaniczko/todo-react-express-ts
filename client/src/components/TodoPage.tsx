import { Header } from './Header';
import { TodoForm } from './TodoForm';
import { TodosList } from './TodosList';

export const TodoPage = () => {
  return (
    <>
      <Header />
      <TodoForm />
      <TodosList />
    </>
  );
};
