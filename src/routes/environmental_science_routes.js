import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Es1s = lazy(() => import('../pages/environmental_science/ES1s'));
const Es2s = lazy(() => import('../pages/environmental_science/ES2s'));
const Es3s = lazy(() => import('../pages/environmental_science/ES3s'));
const Es4s = lazy(() => import('../pages/environmental_science/ES4s'));
const ESquiz = lazy(() => import('../pages/environmental_science/ESQuiz'));
const EsWorkSheet1 = lazy(() => import('../pages/environmental_science/ESWorksheet1'));

// Define route configuration
const environmentalScienceRoutes = [
  { path: "/es1s", component: Es1s },
  { path: "/es2s", component: Es2s },
  { path: "/es3s", component: Es3s },
  { path: "/es4s", component: Es4s },
  { path: "/esquiz", component: ESquiz },
  { path: "/esworksheet1", component: EsWorkSheet1 },
];

// Route component for direct usage
const EnvironmentalScienceRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {environmentalScienceRoutes.map((route) => (
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
export { environmentalScienceRoutes, EnvironmentalScienceRoutes };
export default EnvironmentalScienceRoutes; 