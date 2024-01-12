// userActions.js

import { LOGIN_USER, LOGOUT_USER } from '../ActionTypes';
import { REGISTER_USER } from '../ActionTypes';

export const registerUser = (userData) => ({
  type: REGISTER_USER,
  payload: userData,
});

// Action creators
export const loginUser = (userData) => {
  const authenticatedUser = {
    username: userData.login,
    isAuthenticated: true,
  };

  return {
    type: LOGIN_USER,
    payload: authenticatedUser,
  };
};

export const logoutUser = () => {
  // Perform logout logic here (e.g., clear session, etc.)
  return {
    type: LOGOUT_USER,
  };
};
