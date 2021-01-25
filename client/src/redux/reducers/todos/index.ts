import { Todo } from '../../../types/interfaces';
import { Reducer } from 'redux';
import { TodoActions, TodoActionTypes } from '../../actions/todos/todos-actions';

interface TodoState {
  todoList: Todo[];
  error: string;
}

const INITIAL_STATE: TodoState = {
  todoList: [],
  error: '',
};

export const todosReducer: Reducer<TodoState, TodoActions> = (
  state = INITIAL_STATE,
  action: TodoActions
) => {
  switch (action.type) {
    case TodoActionTypes.FETCH_TODOS:
      return {
        ...state,
        todoList: action.payload,
      };
    case TodoActionTypes.DELETE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter((todo: Todo) => todo._id !== action.payload),
      };
    case TodoActionTypes.CREATE_TODO:
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    case TodoActionTypes.UPDATE_TODO:
      return {
        ...state,
        todoList: state.todoList.map((t) => (t._id === action.payload._id ? action.payload : t)),
      };
    case TodoActionTypes.TODOS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TodoActionTypes.RESET_TODOS:
      return {
        ...state,
        todoList: [],
      };
    default:
      return state;
  }
};
