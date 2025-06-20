import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components 
const Astrovid1s = lazy(() => import('../pages/astronomy/Astrovid1s'));
const Astrovid1p = lazy(() => import('../pages/astronomy/Astrovid1p'));
const Astrovid2s = lazy(() => import('../pages/astronomy/Astrovid2s'));
const Astrovid2p = lazy(() => import('../pages/astronomy/Astrovid2p'));
const Astrovid3s = lazy(() => import('../pages/astronomy/Astrovid3s'));
const Astrovid3p = lazy(() => import('../pages/astronomy/Astrovid3p'));
const Astrovid4s = lazy(() => import('../pages/astronomy/Astrovid4s'));
const Astrovid4p = lazy(() => import('../pages/astronomy/Astrovid4p'));
const AstroWorksheet1 = lazy(() => import('../pages/astronomy/AstroWorksheet1'));
const AstroWorksheet2 = lazy(() => import('../pages/astronomy/AstroWorksheet2'));
const AstroQuiz = lazy(() => import('../pages/astronomy/AstroQuiz'));

// Define route configuration
const astronomyRoutes = [
  { path: "/astrovid1s", component: Astrovid1s },
  { path: "/astrovid1p", component: Astrovid1p },
  { path: "/astrovid2s", component: Astrovid2s },
  { path: "/astrovid2p", component: Astrovid2p },
  { path: "/astrovid3s", component: Astrovid3s },
  { path: "/astrovid3p", component: Astrovid3p },
  { path: "/astrovid4s", component: Astrovid4s },
  { path: "/astrovid4p", component: Astrovid4p },
  { path: "/astroworksheet1", component: AstroWorksheet1 },
  { path: "/astroworksheet2", component: AstroWorksheet2 },
  { path: "/astroquiz", component: AstroQuiz },
];

// Route component for direct usage
const AstronomyRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {astronomyRoutes.map((route) => (
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
export { astronomyRoutes, AstronomyRoutes };
export default AstronomyRoutes; 