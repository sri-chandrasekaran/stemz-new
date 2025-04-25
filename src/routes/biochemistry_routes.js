import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Bio1 = lazy(() => import('../pages/biochemistry/bio1'));
const Bio2 = lazy(() => import('../pages/biochemistry/bio2'));
const BioQuiz = lazy(() => import('../pages/biochemistry/Bioquiz'));
const BiochemWorkSheet = lazy(() => import('../pages/biochemistry/BiochemWorkSheet'));

// Define route configuration
const biochemistryRoutes = [
  { path: "/bio1", component: Bio1 },
  { path: "/bio2", component: Bio2 },
  { path: "/bioquiz", component: BioQuiz },
  { path: "/biochemworksheet", component: BiochemWorkSheet },
];

// Route component for direct usage
const BiochemistryRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {biochemistryRoutes.map((route) => (
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
export { biochemistryRoutes, BiochemistryRoutes };
export default BiochemistryRoutes; 