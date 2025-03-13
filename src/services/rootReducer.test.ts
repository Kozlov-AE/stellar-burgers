import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import store from './store';

describe('rootReducer', () => {
  it('инициализирует корректное начальное состояние', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(store.getState());
  });
});
