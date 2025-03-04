import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  toOrder,
  userOrderActions,
  userOrderSelectors
} from '../../services/slices/userOrderSlice';
import { userSelectors } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(userOrderSelectors.selectIngredients);
  const orderRequest = useSelector(userOrderSelectors.selectIsLoading);
  const orderModalData = useSelector(userOrderSelectors.selectUserOrder);
  const isAutorised = useSelector(userSelectors.isAuthenticated);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAutorised) {
      return navigate('/login');
    }
    const ingredients = [
      ...constructorItems.ingredients.map((x) => x._id),
      constructorItems.bun._id
    ];
    dispatch(toOrder(ingredients));
  };

  const closeOrderModal = () => {
    dispatch(userOrderActions.clearOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
