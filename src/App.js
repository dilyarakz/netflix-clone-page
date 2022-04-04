import React from 'react';
import { BrowserRouter,
  Routes,
  Route, Navigate} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { Home, Browse, Signin, Signup } from './pages';
import { useAuthListener } from './custom-hooks';


export function App() {
  const { user } = useAuthListener();
  
  return (
    <BrowserRouter>
      <Routes>
      <Route path={ROUTES.SIGN_IN} element={<Signin />} />
        <Route path={ROUTES.SIGN_UP} element={<Signup />} />
        <Route path={user ? ROUTES.BROWSE : ROUTES.SIGN_IN} element={<Browse />} />
        <Route path={user ? ROUTES.HOME : ROUTES.HOME} element={<Home />} />
        <Route path={!user && ROUTES.BROWSE} element={<Navigate to={ROUTES.SIGN_IN} />} />
      </Routes>
    </BrowserRouter>
  );
}