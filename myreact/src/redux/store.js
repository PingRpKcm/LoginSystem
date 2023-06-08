import { legacy_createStore as createStore } from "redux";
// Define the initial state
const initialState = {
  isAuthenticated: false,
  username: '',
};

// Action creator
export const setUsernameStore = (username) => ({
  type: 'SET_USERNAME',
  payload: username,
});

// Define the reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    default:
      return state;
  }
};

// Retrieve state from SessionStorage
const savedState = JSON.parse(sessionStorage.getItem('reduxState'));

// Create the Redux store
const store = createStore(reducer, savedState || initialState);

store.subscribe(() => {
  const state = store.getState();
  sessionStorage.setItem('reduxState', JSON.stringify(state));
});

export default store;