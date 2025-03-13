import userOrderSlice, { userOrderActions } from './userOrderSlice';
// import { expect, jest, test } from '@jest/globals';
import { nanoid } from '@reduxjs/toolkit';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'mocked-id'
}));

const initialState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  userOrder: null,
  isLoading: false,
  error: null
};

const ing1 = {
  _id: 'qwe1',
  id: 'mocked-id',
  name: 'ingr1',
  type: 'bun',
  proteins: 10,
  fat: 20,
  carbohydrates: 30,
  calories: 100,
  price: 100,
  image: 'image1.jpg',
  image_large: 'image1.jpg',
  image_mobile: 'image1.jpg'
};

const ing2 = {
  _id: 'qwe2',
  id: 'mocked-id',
  name: 'ingr2',
  type: 'main',
  proteins: 15,
  fat: 25,
  carbohydrates: 35,
  calories: 50,
  price: 1050,
  image: 'image2.jpg',
  image_large: 'image2.jpg',
  image_mobile: 'image2.jpg'
};

const ing3 = {
  _id: 'qwe3',
  id: 'ingr3',
  name: 'ingr3',
  type: 'main',
  proteins: 18,
  fat: 43,
  carbohydrates: 25,
  calories: 50,
  price: 150,
  image: 'image3.jpg',
  image_large: 'image3.jpg',
  image_mobile: 'image3.jpg'
};

const notEmptyState = {
  constructorItems: {
    bun: ing1,
    ingredients: [ing2, ing3]
  },
  userOrder: null,
  isLoading: false,
  error: null
};

describe('userOrderSlice', () => {
  it('addIngredient', () => {
    const action = userOrderActions.addIngredient(ing1);
    const newState = userOrderSlice.reducer(initialState, action);

    expect(newState.constructorItems.bun).toEqual(ing1);
  });

  it('removeIngredient', () => {
    const action = userOrderActions.removeIngredient(ing2);
    const newState = userOrderSlice.reducer(notEmptyState, action);

    expect(newState.constructorItems.ingredients).toHaveLength(1);
  });

  it('moveUp', () => {
    const action = userOrderActions.moveUp(1);
    const newState = userOrderSlice.reducer(notEmptyState, action);

    expect(newState.constructorItems.ingredients).toEqual([ing3, ing2]);
  });

  it('moveDown', () => {
    const action = userOrderActions.moveDown(0);
    const newState = userOrderSlice.reducer(notEmptyState, action);

    expect(newState.constructorItems.ingredients).toEqual([ing3, ing2]);
  });
});
