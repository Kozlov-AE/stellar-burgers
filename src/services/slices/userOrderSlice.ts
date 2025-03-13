import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TConstructorItems,
  TIngredient,
  TOrder
} from '@utils-types';
import { orderBurgerApi } from '../../utils/burger-api';

type TUserOrder = {
  constructorItems: TConstructorItems;
  userOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserOrder = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  userOrder: null,
  isLoading: false,
  error: null
};

export const toOrder = createAsyncThunk(
  'orders/toOrder',
  async (items: string[]) => await orderBurgerApi(items)
);

const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload as TIngredient;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = null;
      } else {
        state.constructorItems.ingredients =
          state.constructorItems.ingredients.filter(
            (x) => x.id !== action.payload.id
          );
      }
    },
    moveUp(state, action: PayloadAction<number>) {
      const tmp = state.constructorItems.ingredients[action.payload];
      state.constructorItems.ingredients[action.payload] =
        state.constructorItems.ingredients[action.payload - 1];
      state.constructorItems.ingredients[action.payload - 1] = tmp;
    },
    moveDown(state, action: PayloadAction<number>) {
      const tmp = state.constructorItems.ingredients[action.payload];
      state.constructorItems.ingredients[action.payload] =
        state.constructorItems.ingredients[action.payload + 1];
      state.constructorItems.ingredients[action.payload + 1] = tmp;
    },
    clearOrder(state) {
      state.userOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(toOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка при получении заказа по номеру';
      })
      .addCase(toOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.userOrder = action.payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      });
  },
  selectors: {
    selectIngredients: (state) => state.constructorItems,
    selectUserOrder: (state) => state.userOrder,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  }
});
export default userOrderSlice;

export const userOrderActions = userOrderSlice.actions;
export const userOrderSelectors = userOrderSlice.selectors;
