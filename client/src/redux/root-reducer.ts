import { combineReducers } from 'redux';
import todosReducer from './reducers/todos';
import authReducer from './reducers/auth';

export default combineReducers({
  todosState: todosReducer,
  auth: authReducer,
});
