import { ITodo } from '../../../types/interfaces';
import { Reducer } from 'redux';
import { TodoActions, TodoActionTypes } from '../../actions/todos/todos-actions';

interface IInitialState {
  todoList: ITodo[];
}

const INITIAL_STATE: IInitialState = {
  todoList: [],
};

export const todosReducer: Reducer<IInitialState, TodoActions> = (
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
        todoList: state.todoList.filter((todo: ITodo) => todo._id !== action.payload),
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
    case TodoActionTypes.RESET_TODOS:
      return {
        todoList: [],
      };
    default:
      return state;
  }
};
