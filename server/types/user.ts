import { Todo } from './todo';
export interface User {
  name?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  todos: Todo[];
}
