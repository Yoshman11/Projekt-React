// reducers.js

import { combineReducers } from 'redux';
import userReducer from './userReducer';

const exampleReducer = (state = {}, action) => {
  switch (action.type) {
    // Handle actions here
    default:
      return state;
  }
};

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  example: exampleReducer,
  user: userReducer,
  // Add more reducers as needed
});

export default rootReducer;
