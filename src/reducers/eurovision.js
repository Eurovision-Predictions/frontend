import { configureStore } from '@reduxjs/toolkit'
import groupsReducer from './groups';
import userReducer from './user';

export default configureStore({
  reducer: {
    groups: groupsReducer,
    user: userReducer,
  },
});
