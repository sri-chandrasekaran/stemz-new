import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Bio1 = lazy(() => import('../pages/biochemistry/Biochem1'));
const Bio2 = lazy(() => import('../pages/biochemistry/Biochem2'));
const BioQuiz = lazy(() => import('../pages/biochemistry/BiochemQuiz'));
const BiochemWorksheet = lazy(() => import('../pages/biochemistry/BiochemWorksheet'));

// Define route configuration
const biochemistryRoutes = [
  { path: "/bio1", component: Bio1 },
  { path: "/bio2", component: Bio2 },
  { path: "/bioquiz", component: BioQuiz },
  { path: "/biochemworksheet", component: BiochemWorksheet },
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