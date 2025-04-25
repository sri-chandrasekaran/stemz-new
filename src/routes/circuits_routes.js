import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Circuit1s = lazy(() => import('../pages/circuit/circuit1s'));
const Circuit2s = lazy(() => import('../pages/circuit/circuit2s'));
const Circuit3s = lazy(() => import('../pages/circuit/circuit3s'));
const Circuit1p = lazy(() => import('../pages/circuit/circuit1p'));
const Circuit2p = lazy(() => import('../pages/circuit/circuit2p'));
const Circuit3p = lazy(() => import('../pages/circuit/circuit3p'));
const CircuitQuiz = lazy(() => import('../pages/circuit/Circuitquiz'));
const CircuitWorkSheet = lazy(() => import('../pages/circuit/CircuitWorkSheet'));

// Define route configuration
const circuitsRoutes = [
  { path: "/circuit1s", component: Circuit1s },
  { path: "/circuit2s", component: Circuit2s },
  { path: "/circuit3s", component: Circuit3s },
  { path: "/circuit1p", component: Circuit1p },
  { path: "/circuit2p", component: Circuit2p },
  { path: "/circuit3p", component: Circuit3p },
  { path: "/circuitquiz", component: CircuitQuiz },
  { path: "/circuitworksheet", component: CircuitWorkSheet },
];

// Route component for direct usage
const CircuitsRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {circuitsRoutes.map((route) => (
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
export { circuitsRoutes, CircuitsRoutes };
export default CircuitsRoutes; 