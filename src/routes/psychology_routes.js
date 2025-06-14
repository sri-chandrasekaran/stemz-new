import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Psych1p = lazy(() => import('../pages/psychology/Psych1p'));
const Psych1s = lazy(() => import('../pages/psychology/Psych1s'));
const Psych2p = lazy(() => import('../pages/psychology/Psych2p'));
const Psych2s = lazy(() => import('../pages/psychology/Psych2s'));
const Psych3p = lazy(() => import('../pages/psychology/Psych3p'));
const Psych3s = lazy(() => import('../pages/psychology/Psych3s'));
const Psych4p = lazy(() => import('../pages/psychology/Psych4p'));
const Psych4s = lazy(() => import('../pages/psychology/Psych4s'));
const PsychQuiz = lazy(() => import('../pages/psychology/PsychQuiz'));
const PsychWorksheet1 = lazy(() => import('../pages/psychology/PsychWorksheet1'));
const PsychWorksheet2 = lazy(() => import('../pages/psychology/PsychWorksheet2'));

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