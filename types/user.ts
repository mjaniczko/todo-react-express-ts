import { ITodo } from './todo';
export interface IUser {
  name?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  todos: ITodo[];
}
