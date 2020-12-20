import {
  FETCH_TODOS,
  CREATE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
} from '../../actions/todos/action-types';

import { ITodo } from '../../../utils/interfaces';

interface IAction {
  type: string;
  payload: ITodo | ITodo[] | string | any;
}

interface IInitialState {
  todosList: ITodo[];
}

const INITIAL_STATE: IInitialState = {
  todosList: [],
};

const todosReducer = (state = INITIAL_STATE, action: IAction) => {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        todosList: action.payload,
      };
    case DELETE_TODO:
      return {
        ...state,
        todosList: state.todosList.filter((todo: ITodo) => todo._id !== action.payload),
      };
    case CREATE_TODO:
      return {
        ...state,
        todosList: [...state.todosList, action.payload],
      };
    case UPDATE_TODO:
      const arrayIndex = state.todosList.findIndex((el: ITodo) => el._id === action.payload._id);
      let newArray = [...state.todosList];
      newArray[arrayIndex] = action.payload;
      return {
        ...state,
        todosList: [...newArray],
      };
    default:
      return state;
  }
};

export default todosReducer;
