import { useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from './UI/Input/Input';
import Button from './UI/Button/Button';
import { createTodo } from '../redux/actions/todos/todos-actions';

interface NewTodo {
  name: string;
  description: string;
}

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState<NewTodo>({ name: '', description: '' });
  const dispatch = useDispatch();
  const userId: string = useSelector(({ auth }: any) => auth.user._id);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const createNewTodo = async (e: MouseEvent) => {
    e.preventDefault();
    dispatch(createTodo(newTodo, userId));
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <Input
          type='text'
          name='description'
          value={newTodo.description}
          placeholder='Todo description'
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <Button onClick={(e: MouseEvent) => createNewTodo(e)}>Submit new todo</Button>
      </form>
    </div>
  );
};

export default TodoForm;
