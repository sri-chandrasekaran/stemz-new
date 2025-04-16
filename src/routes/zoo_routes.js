import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const ZooWorkSheet1 = lazy(() => import('./zooWorkSheet1'));
const ZooWorkSheet2 = lazy(() => import('./zooWorkSheet2'));
const ZooWorkSheet3 = lazy(() => import('./zooWorkSheet3'));
const Zoo1p = lazy(() => import('./zoo1p'));
const Zoo1s = lazy(() => import('./zoo1s'));
const Zoo2p = lazy(() => import('./zoo2p'));
const Zoo2s = lazy(() => import('./zoo2s'));
const Zoo3p = lazy(() => import('./zoo3p'));
const Zoo3s = lazy(() => import('./zoo3s'));
const Zoo4p = lazy(() => import('./zoo4p'));
const Zoo4s = lazy(() => import('./zoo4s'));
const Zoo5p = lazy(() => import('./zoo5p'));
const Zoo5s = lazy(() => import('./zoo5s'));
const ZooQuiz = lazy(() => import('./Zooquiz'));

// Define route configuration
const zoologyRoutes = [
  { path: "/zoo1p", component: Zoo1p },
  { path: "/zoo1s", component: Zoo1s },
  { path: "/zoo2p", component: Zoo2p },
  { path: "/zoo2s", component: Zoo2s },
  { path: "/zoo3p", component: Zoo3p },
  { path: "/zoo3s", component: Zoo3s },
  { path: "/zoo4p", component: Zoo4p },
  { path: "/zoo4s", component: Zoo4s },
  { path: "/zoo5p", component: Zoo5p },
  { path: "/zoo5s", component: Zoo5s },
  { path: "/zooquiz", component: ZooQuiz },
  { path: "/zooworksheet1", component: ZooWorkSheet1 },
  { path: "/zooworksheet2", component: ZooWorkSheet2 },
  { path: "/zooworksheet3", component: ZooWorkSheet3 },
];

// Route component for direct usage
const ZooRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {zoologyRoutes.map((route) => (
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
export { zoologyRoutes, ZooRoutes };
export default ZooRoutes; 