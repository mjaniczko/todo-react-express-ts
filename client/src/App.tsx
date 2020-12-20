import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { ITodo } from './utils/interfaces';
import TodoForm from './components/TodoForm';
import Button from './components/UI/Button/Button';
import { fetchTodos, deleteTodo, updateTodo } from './redux/actions/todos/todos-actions';

interface TodosState {
  todosState: { todosList: ITodo[] };
}

function App() {
  const dispatch = useDispatch();
  const state: ITodo[] = useSelector(
    ({ todosState: { todosList } }: TodosState) => todosList,
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDeleteTodo = async (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleCompleteTodo = async (todo: ITodo) => {
    dispatch(updateTodo(todo));
  };

  return (
    <div className=''>
      <TodoForm />
      {state.length > 0 &&
        state.map((todo: ITodo) => {
          return (
            <div key={todo._id} style={{ backgroundColor: `${todo.status ? '#90ee90' : '#fff'}` }}>
              <h1>{todo.name}</h1>
              <p>{todo.description}</p>

              <Button onClick={() => handleCompleteTodo(todo)}>Completed</Button>
              <Button onClick={() => handleDeleteTodo(todo._id)}>X</Button>
            </div>
          );
        })}
    </div>
  );
}

export default App;
