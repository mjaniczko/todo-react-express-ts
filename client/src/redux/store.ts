import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

const middlewares = [thunk];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
export type RootState = ReturnType<typeof rootReducer>;
