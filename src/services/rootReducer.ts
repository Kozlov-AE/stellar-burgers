import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import ingredientsSlice from './slices/ingredientsSlice';
import ordersSlice from './slices/ordersSlice';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer

  // Здесь будут остальные редьюсеры
});
