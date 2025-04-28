import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Chem1 = lazy(() => import('../pages/chemistry/chem1'));
const Chem2 = lazy(() => import('../pages/chemistry/chem2'));
const Chem3 = lazy(() => import('../pages/chemistry/chem3'));
const Chem4 = lazy(() => import('../pages/chemistry/chem4'));
const ChemQuiz = lazy(() => import('../pages/chemistry/Chemquiz'));

// Define route configuration
const chemistryRoutes = [
  { path: "/chem1", component: Chem1 },
  { path: "/chem2", component: Chem2 },
  { path: "/chem3", component: Chem3 },
  { path: "/chem4", component: Chem4 },
  { path: "/chemquiz", component: ChemQuiz },
];

// Route component for direct usage
const ChemistryRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {chemistryRoutes.map((route) => (
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
export { chemistryRoutes, ChemistryRoutes };
export default ChemistryRoutes; 