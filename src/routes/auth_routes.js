import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const LoginForm = lazy(() => import('../pages/main/LoginForm'));
const SignUpForm = lazy(() => import('../pages/main/SignUpForm'));
const Dashboard = lazy(() => import('../pages/main/Dashboard'));

// Define route configuration
const authRoutes = [
  { path: "/login", component: LoginForm },
  { path: "/sign-up", component: SignUpForm },
  { path: "/dashboard", component: Dashboard },
];

// Route component for direct usage
const AuthRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {authRoutes.map((route) => (
        <Route 
          key={route.path} 
          path={route.path} 
          element={<route.component />} 
        />
      ))}
    </Routes>
  </Suspense>
);

// Export both the routes array and the component
export { authRoutes, AuthRoutes };
export default AuthRoutes; 