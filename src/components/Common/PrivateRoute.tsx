import * as React from 'react';
import { Redirect, RouteProps, Route } from 'react-router-dom';

export function PrivateRoute(props: RouteProps) {
  // Check if user is logged in
  // If yes, show route
  // Otherwise, redirect to login page
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  const isAdmin = Boolean(localStorage.getItem('userRole') === 'SysAdmin');
  if (!isLoggedIn || !isAdmin) return <Redirect to="/admin-login" />;

  return <Route {...props} />;
}

export function CarCompanyRoute(props: RouteProps) {
  // Check if user is logged in
  // If yes, show route
  // Otherwise, redirect to login page
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  const isCarCompany = Boolean(localStorage.getItem('userRole') === 'CarCompany');
  if (!isLoggedIn || !isCarCompany) return <Redirect to="/home" />;

  return <Route {...props} />;
}