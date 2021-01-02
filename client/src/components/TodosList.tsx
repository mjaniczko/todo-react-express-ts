import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import Button from './UI/Button/Button';
import { RootState } from '../redux/store';
import { ITodo } from './../utils/interfaces';
import { fetchTodos, deleteTodo, updateTodo } from './../redux/actions/todos/todos-actions';

const TodosList = () => {
  const dispatch = useDispatch();
  const selectUserId = (state: RootState) => state.auth.user._id;
  const selectTodos = (state: RootState) => state.todosState.todoList;

  const userId = useSelector(selectUserId);
  const todos = useSelector(selectTodos, shallowEqual);

  useEffect(() => {
    dispatch(fetchTodos(userId));
  }, [userId, dispatch]);

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleCompleteTodo = (todo: ITodo) => {
    dispatch(updateTodo(todo));
  };

  return (
    <div>
      {todos.length > 0 &&
        todos.map((todo) => {
          return (
            <div key={todo._id} style={{ backgroundColor: `${todo.status ? '#90ee90' : '#fff'}` }}>
              <h1>{todo.name}</h1>
              <p>{todo.description}</p>

              <Button onClick={() => handleCompleteTodo(todo)} type='button'>
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

export default TodosList;
