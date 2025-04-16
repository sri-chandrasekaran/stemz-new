import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Astrovid1s = lazy(() => import('./Astrovid1s'));
const Astrovid1p = lazy(() => import('./Astrovid1p'));
const Astrovid2s = lazy(() => import('./Astrovid2s'));
const Astrovid2p = lazy(() => import('./Astrovid2p'));
const Astrovid3s = lazy(() => import('./Astrovid3s'));
const Astrovid3p = lazy(() => import('./Astrovid3p'));
const Astrovid4s = lazy(() => import('./Astrovid4s'));
const Astrovid4p = lazy(() => import('./Astrovid4p'));
const AstroWorksheet1 = lazy(() => import('./AstroWorksheet1'));
const AstroWorksheet2 = lazy(() => import('./AstroWorksheet2'));
const Astroquiz = lazy(() => import('./Astroquiz'));

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
  { path: "/astroWorksheet1", component: AstroWorksheet1 },
  { path: "/astroWorksheet2", component: AstroWorksheet2 },
  { path: "/astroquiz", component: Astroquiz },
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