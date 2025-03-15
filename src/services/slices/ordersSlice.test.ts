import { TOrder } from '@utils-types';
import { getOrderByNumber, getOrders, getFeeds } from './ordersSlice';
import ordersSlice, { TOrderState } from './ordersSlice';
import { TFeed } from '../../components/ui/feed-info/type';
import { TFeedsResponse } from '../../utils/burger-api';

let initialState: TOrderState;
let error: Error;
let mockOrders: TOrder[];
let feed: TFeed;
let feedResponse: TFeedsResponse;

beforeEach(() => {
  jest.clearAllMocks();
  initialState = ordersSlice.getInitialState();
  error = new Error('Ошибка!');
  mockOrders = [
    {
      _id: '1',
      name: 'Order 1',
      status: '',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: []
    },
    {
      _id: '2',
      name: 'Order 2',
      status: '',
      createdAt: '',
      updatedAt: '',
      number: 2,
      ingredients: []
    }
  ];
  feedResponse = {
    success: true,
    orders: mockOrders,
    total: 100,
    totalToday: 50
  };
});

describe('ordersSlice - getOrderByNumber', () => {
  it('getOrderByNumber.pending', () => {
    const action = { type: getOrderByNumber.pending.type };
    const newState = ordersSlice.reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('getOrderByNumber.fulfilled', () => {
    const mockOrder = mockOrders[0];
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [mockOrder] }
    };
    const newState = ordersSlice.reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeNull();
    expect(newState.orderByNumber).toEqual(mockOrder);
  });

  it('getOrderByNumber.rejected', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: error
    };
    const newState = ordersSlice.reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(error.message);
  });
});

describe('ordersSlice - getOrders', () => {
  it('getOrders.pending', () => {
    const action = { type: getOrders.pending.type };
    const newState = ordersSlice.reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('getOrders.fulfilled', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: mockOrders
    };
    const newState = ordersSlice.reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeNull();
    expect(newState.allOrders).toEqual(mockOrders);
  });

  it('getOrders.rejected', () => {
    const action = {
      type: getOrders.rejected.type,
      error: error
    };
    const newState = ordersSlice.reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(error.message);
  });
});

describe('ordersSlice - getFeeds', () => {
  it('getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const newState = ordersSlice.reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('getFeeds.fulfilled', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: feedResponse
    };
    const newState = ordersSlice.reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeNull();
    expect(newState.allOrders).toEqual(mockOrders);
    expect(newState.feed.total).toBe(feedResponse.total);
    expect(newState.feed.totalToday).toBe(feedResponse.totalToday);
  });

  it('getFeeds.rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: error
    };
    const newState = ordersSlice.reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(error.message);
  });
});
