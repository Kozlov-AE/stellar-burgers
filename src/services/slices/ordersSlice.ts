import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  getFeedsApi
} from '@api';
import { TFeed } from '../../components/ui/feed-info/type';

type TOrderState = {
  orderByNumber: TOrder | null;
  allOrders: TOrder[];
  feed: TFeed;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderByNumber: null,
  allOrders: [],
  feed: { total: 0, totalToday: 0 },
  isLoading: false,
  error: null
};

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

export const toOrder = createAsyncThunk(
  'orders/toOrder',
  async (order: TOrder) => await orderBurgerApi(order.ingredients)
);

export const getFeeds = createAsyncThunk(
  'orders/feeds',
  async () => await getFeedsApi()
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка при получении заказа по номеру';
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderByNumber = action.payload.orders[0];
      })

      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка при получении заказа по номеру';
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.allOrders = action.payload;
      })

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
        state.orderByNumber = action.payload.order;
      })

      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка при получении ленты заказов';
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.allOrders = action.payload.orders;
        state.feed = {
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
      });
  },
  selectors: {
    selectAllOrders: (state) => state.allOrders,
    selectOrderByNumber: (state) => state.orderByNumber,
    selectFeed: (state) => state.feed,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  }
});
export const ordersSelectors = ordersSlice.selectors;

export default ordersSlice;
