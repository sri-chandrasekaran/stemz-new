import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const ZooWorksheet1 = lazy(() => import('../pages/zoology/ZooWorksheet1'));
const ZooWorksheet2 = lazy(() => import('../pages/zoology/ZooWorksheet2'));
const ZooWorksheet3 = lazy(() => import('../pages/zoology/ZooWorksheet3'));
const Zoo1p = lazy(() => import('../pages/zoology/Zoo1p'));
const Zoo1s = lazy(() => import('../pages/zoology/Zoo1s'));
const Zoo2p = lazy(() => import('../pages/zoology/Zoo2p'));
const Zoo2s = lazy(() => import('../pages/zoology/Zoo2s'));
const Zoo3p = lazy(() => import('../pages/zoology/Zoo3p'));
const Zoo3s = lazy(() => import('../pages/zoology/Zoo3s'));
const Zoo4p = lazy(() => import('../pages/zoology/Zoo4p'));
const Zoo4s = lazy(() => import('../pages/zoology/Zoo4s'));
const Zoo5p = lazy(() => import('../pages/zoology/Zoo5p'));
const Zoo5s = lazy(() => import('../pages/zoology/Zoo5s'));
const ZooQuiz = lazy(() => import('../pages/zoology/ZooQuiz'));

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
  { path: "/zooworksheet1", component: ZooWorksheet1 },
  { path: "/zooworksheet2", component: ZooWorksheet2 },
  { path: "/zooworksheet3", component: ZooWorksheet3 },
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