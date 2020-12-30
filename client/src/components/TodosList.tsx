import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import Button from './UI/Button/Button';
import { ITodo } from './../utils/interfaces';
import { fetchTodos, deleteTodo, updateTodo } from './../redux/actions/todos/todos-actions';

interface TodosState {
  todosState: { todoList: ITodo[] };
}

const TodosList = () => {
  const dispatch = useDispatch();
  const todos: ITodo[] = useSelector(
    ({ todosState: { todoList } }: TodosState) => todoList,
    shallowEqual
  );
  const userId: string = useSelector(({ auth }: any) => auth.user._id, shallowEqual);

  useEffect(() => {
    dispatch(fetchTodos(userId));
  }, [userId, dispatch]);

  const handleDeleteTodo = async (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleCompleteTodo = async (todo: ITodo) => {
    dispatch(updateTodo(todo));
  };

  return (
    <div>
      {todos.length > 0 &&
        todos.map((todo: ITodo) => {
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
