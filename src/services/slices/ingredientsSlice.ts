import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';

type TIngredientsState = {
  data: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  data: [],
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (reducer) => {
        reducer.isLoading = true;
        reducer.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error =
          action.error.message || 'Ошибка при получении ингридиентов';
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      });
  },
  selectors: {
    getIngredients: (state) => state.data,
    getIngredientsLoadingError: (state) => state.error,
    getLoadingState: (state) => state.isLoading
  }
});
export default ingredientsSlice;

export const ingredientsSelectors = ingredientsSlice.selectors;
