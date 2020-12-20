import { useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const createNewTodo = async (e: MouseEvent) => {
    e.preventDefault();
    dispatch(createTodo(newTodo));
    setNewTodo({ name: '', description: '' });
  };

  return (
    <div>
      <h1>Create a new Todo</h1>

      <form>
        <Input
          type='text'
          name='name'
          className=''
          value={newTodo.name}
          placeholder='Todo title'
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <Input
          type='text'
          className=''
          name='description'
          placeholder='Todo description'
          value={newTodo.description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <Button onClick={(e: MouseEvent) => createNewTodo(e)}>Submit new todo</Button>
      </form>
    </div>
  );
};

export default TodoForm;
