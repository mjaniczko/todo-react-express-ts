import { ITodo } from '../../../utils/interfaces';
import { Reducer } from 'redux';
import { TodoActions, TodoActionTypes } from '../../actions/todos/todos-actions';

interface IInitialState {
  todosList: ITodo[];
}

const INITIAL_STATE: IInitialState = {
  todosList: [],
};

const todosReducer: Reducer<IInitialState, TodoActions> = (
  state = INITIAL_STATE,
  action: TodoActions
) => {
  switch (action.type) {
    case TodoActionTypes.FETCH_TODOS:
      return {
        ...state,
        todosList: action.payload,
      };
    case TodoActionTypes.DELETE_TODO:
      return {
        ...state,
        todosList: state.todosList.filter((todo: ITodo) => todo._id !== action.payload),
      };
    case TodoActionTypes.CREATE_TODO:
      return {
        ...state,
        todosList: [...state.todosList, action.payload],
      };
    case TodoActionTypes.UPDATE_TODO:
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
