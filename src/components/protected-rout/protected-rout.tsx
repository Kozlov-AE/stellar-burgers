import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { userSelectors } from '../../services/slices/userSlice';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

function ProtectedRoute({ children, onlyUnAuth }: ProtectedRouteProps) {
  const location = useLocation();
  const user = useSelector(userSelectors.getUser);
  const isAuthChecked = useSelector(userSelectors.isAuthChecked);

  if (!isAuthChecked) {
    console.log('WAIT USER CHECKOUT');
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    console.log('NAVIGATE FROM LOGIN TO INDEX');
    const background = location.state?.background || { pathname: '/' };
    return <Navigate replace to={background} />;
  }

  if (!onlyUnAuth && !user) {
    console.log('NAVIGATE FROM PAGE TO LOGIN');
    return (
      <Navigate
        replace
        to={'/login'}
        state={{
          from: {
            ...location,
            background: location.state,
            state: null
          }
        }}
      />
    );
  }

  console.log('RENDER COMPONENT');

  return children;
}

export default ProtectedRoute;
