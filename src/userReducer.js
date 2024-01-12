// userReducer.js
import { REGISTER_USER } from './ActionTypes';

const initialState = {
  isAuthenticated: false,
  // other user-related state properties
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      // Handle registration logic, update state accordingly
      return {
        ...state,
        isAuthenticated: true, // For simplicity, consider the user as authenticated after registration
        // Update other user-related state properties based on your requirements
      };
    // Handle other action types if needed
    default:
      return state;
  }
};

export default userReducer;
