import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from './UI/Button/Button';
import { RootState } from '../redux/store';
import { ITodo } from '../types/interfaces';
import { fetchTodos, deleteTodo, updateTodo } from './../redux/actions/todos/todos-actions';

export const TodosList = () => {
  const dispatch = useDispatch();

  const name = useSelector((state: RootState) => state.auth.user.name);
  const todos = useSelector((state: RootState) => state.todosState.todoList);

  useEffect(() => {
    if (name.length > 0) {
      dispatch(fetchTodos());
    }
  }, [name, dispatch]);

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const toggleTodoStatus = (todo: ITodo) => {
    dispatch(updateTodo({ ...todo, status: !todo.status }));
  };

  return (
    <div>
      {todos.length > 0 &&
        todos.map((todo) => {
          return (
            <div key={todo._id} style={{ backgroundColor: `${todo.status ? '#90ee90' : '#fff'}` }}>
              <h1>{todo.name}</h1>
              <p>{todo.description}</p>

              <Button onClick={() => toggleTodoStatus(todo)} type='button'>
                Completed
              </Button>
              <Button onClick={() => handleDeleteTodo(todo._id)} type='button'>
                Delete
              </Button>
            </div>
          );
        })}
    </div>
  );
};
