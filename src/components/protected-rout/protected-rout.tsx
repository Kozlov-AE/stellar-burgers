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
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    // const background = location.state?.background || { pathname: '/' };
    const background = location.state?.from || { pathname: '/' };
    return <Navigate replace to={background} />;
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        replace
        to='/login'
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

  return children;
}

export default ProtectedRoute;
