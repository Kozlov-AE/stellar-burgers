
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TUserOrder = {
  ingridients: TIngredient[];
  isBunAdded: boolean;
};

const initialState: TUserOrder = {
  ingridients: [],
  isBunAdded: false
};

const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {
    addIngridient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        if (state.isBunAdded){
          return;
        }
        state.isBunAdded = true;
      }
      state.ingridients.push(action.payload);
    },
    removeIngridient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun'){
        state.isBunAdded = false;
      }
      state.ingridients = state.ingridients.filter(x => x._id !== action.payload._id);
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingridients,
    selectIsBunAdded: (state) => state.isBunAdded,
  }
});
export default userOrderSlice;

export const userOrderSelectors = userOrderSlice.selectors;
export const userOrderActions = userOrderSlice.actions;
export const {addIngridient} = userOrderSlice.actions;
