import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';
import { useSelector } from '../../services/store';
import { ordersSelectors } from '../../services/slices/ordersSlice';
import { Preloader } from '@ui';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const isLoading = useSelector(ordersSelectors.selectIsLoading);

  const orders: TOrder[] = useSelector(ordersSelectors.selectAllOrders);
  const feed = useSelector(ordersSelectors.selectFeed);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FeedInfoUI
          readyOrders={readyOrders}
          pendingOrders={pendingOrders}
          feed={feed}
        />
      )}
    </>
  );
};
