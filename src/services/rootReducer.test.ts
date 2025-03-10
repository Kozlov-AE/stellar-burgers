import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('инициализирует корректное начальное состояние', () => {
    const store = configureStore({ reducer: rootReducer });
    const initialState = store.getState();

    expect(initialState.userOrder).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      },
      userOrder: null,
      isLoading: false,
      error: null
    });

    expect(initialState.ingredients).toEqual({
      data: [],
      isLoading: false,
      error: null
    });

    expect(initialState.orders).toEqual({
      orderByNumber: null,
      allOrders: [],
      feed: { total: 0, totalToday: 0 },
      isLoading: false,
      error: null
    });

    expect(initialState.user).toEqual({
      data: null,
      isAuthChecked: false,
      isAuthenticated: false,
      loginUserError: null,
      loginUserRequest: false
    });
  });
});
