import { useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from './UI/Input/Input';
import { Button } from './UI/Button/Button';
import { RootState } from '../redux/store';
import { createTodo } from '../redux/actions/todos/todos-actions';

export const TodoForm = () => {
  const [newTodo, setNewTodo] = useState({ name: '', description: '' });

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.user.token);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const createNewTodo = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(createTodo(newTodo, token));
    setNewTodo({ name: '', description: '' });
  };

  return (
    <div>
      <h1>Create a new Todo</h1>

      <form>
        <Input
          type='text'
          name='name'
          value={newTodo.name}
          placeholder='Todo title'
          onChange={handleChange}
        />
        <Input
          type='text'
          name='description'
          value={newTodo.description}
          placeholder='Todo description'
          onChange={handleChange}
        />
        <Button onClick={createNewTodo} type='submit'>
          Submit new todo
        </Button>
      </form>
    </div>
  );
};
