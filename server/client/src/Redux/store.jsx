import { configureStore } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  selectedFolderId: null,
};

// Define the reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    default:
      return state;
  }
};

// Create the Redux store
const store = configureStore({
  reducer: {
    folderState: reducer,
  },
});

export default store;