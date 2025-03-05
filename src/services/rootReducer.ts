import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import ingredientsSlice from './slices/ingredientsSlice';
import ordersSlice from './slices/ordersSlice';
import userOrderSlice from './slices/userOrderSlice';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [userOrderSlice.name]: userOrderSlice.reducer
});
