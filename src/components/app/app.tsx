import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { useDispatch } from '../../services/store';
import ProtectedRoute from '../protected-rout/protected-rout';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { checkUserAuth } from '../../services/slices/userSlice';
import { getOrders } from '../../services/slices/ordersSlice';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const background = location.state && location.state?.background;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path='/ingredients/:id'
          element={
            <Modal title={'детали ингридиента'} onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
