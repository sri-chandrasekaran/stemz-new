import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Psych1p = lazy(() => import('./psych1p'));
const Psych1s = lazy(() => import('./psych1s'));
const Psych2p = lazy(() => import('./psych2p'));
const Psych2s = lazy(() => import('./psych2s'));
const Psych3p = lazy(() => import('./psych3p'));
const Psych3s = lazy(() => import('./psych3s'));
const Psych4p = lazy(() => import('./psych4p'));
const Psych4s = lazy(() => import('./psych4s'));
const PsychQuiz = lazy(() => import('./Psycquiz'));
const PsychWorksheet1 = lazy(() => import('./PsychWorkSheet1'));
const PsychWorksheet2 = lazy(() => import('./PsychWorkSheet2'));

// Define route configuration
const psychologyRoutes = [
  { path: "/psych1p", component: Psych1p },
  { path: "/psych1s", component: Psych1s },
  { path: "/psych2p", component: Psych2p },
  { path: "/psych2s", component: Psych2s },
  { path: "/psych3p", component: Psych3p },
  { path: "/psych3s", component: Psych3s },
  { path: "/psych4p", component: Psych4p },
  { path: "/psych4s", component: Psych4s },
  { path: "/psychquiz", component: PsychQuiz },
  { path: "/psychworksheet1", component: PsychWorksheet1 },
  { path: "/psychworksheet2", component: PsychWorksheet2 },
];

// Route component for direct usage
const PsychologyRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {psychologyRoutes.map((route) => (
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
export { psychologyRoutes, PsychologyRoutes };
export default PsychologyRoutes; 