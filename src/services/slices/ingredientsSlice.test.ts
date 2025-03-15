import ingredientsSlice, { getIngredients } from './ingredientsSlice';

const initialState = ingredientsSlice.getInitialState();

describe('ingredientsSlice - getIngredients', () => {
  it('getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const newState = ingredientsSlice.reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
  });

  it('getIngredients.fulfilled', () => {
    const mockData = [{ _id: '1', name: 'Булка' }];
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockData
    };
    const newState = ingredientsSlice.reducer(initialState, action);

    expect(newState.data).toEqual(mockData);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeNull();
  });

  it('getIngredients.rejected', () => {
    const error = new Error('Ошибка!');
    const action = {
      type: getIngredients.rejected.type,
      error: error
    };
    const newState = ingredientsSlice.reducer(initialState, action);

    expect(newState.error).toEqual(error.message);
    expect(newState.isLoading).toBe(false);
  });
});
