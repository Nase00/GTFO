import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import navigationReducer from './navigation';
import layoutReducer from './layout';

export default combineReducers({
  navigationReducer,
  layoutReducer,
  router: connectRouter(history)
});
