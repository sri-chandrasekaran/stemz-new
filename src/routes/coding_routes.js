import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Bc1p = lazy(() => import('./bc1p'));
const Bc1s = lazy(() => import('./bc1s'));
const Bc2p = lazy(() => import('./bc2p'));
const Bc2s = lazy(() => import('./bc2s'));
const Bc3p = lazy(() => import('./bc3p'));
const Bc3s = lazy(() => import('./bc3s'));
const Bc4p = lazy(() => import('./bc4p'));
const Bc4s = lazy(() => import('./bc4s'));
const BCQuiz = lazy(() => import('./BCquiz'));

// Define route configuration
const codingRoutes = [
  { path: "/bc1p", component: Bc1p },
  { path: "/bc1s", component: Bc1s },
  { path: "/bc2p", component: Bc2p },
  { path: "/bc2s", component: Bc2s },
  { path: "/bc3p", component: Bc3p },
  { path: "/bc3s", component: Bc3s },
  { path: "/bc4p", component: Bc4p },
  { path: "/bc4s", component: Bc4s },
  { path: "/bcquiz", component: BCQuiz },
];

// Route component for direct usage
const CodingRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {codingRoutes.map((route) => (
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
export { codingRoutes, CodingRoutes };
export default CodingRoutes; 