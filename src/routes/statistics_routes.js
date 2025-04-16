import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Stat1p = lazy(() => import('./stat1p'));
const Stat1s = lazy(() => import('./stat1s'));
const Stat2p = lazy(() => import('./stat2p'));
const Stat2s = lazy(() => import('./stat2s'));
const Stat3p = lazy(() => import('./stat3p'));
const Stat3s = lazy(() => import('./stat3s'));
const Stat4p = lazy(() => import('./stat4p'));
const Stat4s = lazy(() => import('./stat4s'));
const Stat5p = lazy(() => import('./stat5p'));
const Stat5s = lazy(() => import('./stat5s'));
const StatQuiz = lazy(() => import('./Statquiz'));
const StatWorkSheet1 = lazy(() => import('./statWorkSheet1'));
const StatWorkSheet2 = lazy(() => import('./statWorkSheet2'));
const StatWorkSheet3 = lazy(() => import('./statWorkSheet3'));

// Define route configuration
const statisticsRoutes = [
  { path: "/stat1p", component: Stat1p },
  { path: "/stat1s", component: Stat1s },
  { path: "/stat2p", component: Stat2p },
  { path: "/stat2s", component: Stat2s },
  { path: "/stat3p", component: Stat3p },
  { path: "/stat3s", component: Stat3s },
  { path: "/stat4p", component: Stat4p },
  { path: "/stat4s", component: Stat4s },
  { path: "/stat5p", component: Stat5p },
  { path: "/stat5s", component: Stat5s },
  { path: "/statquiz", component: StatQuiz },
  { path: "/statworksheet1", component: StatWorkSheet1 },
  { path: "/statworksheet2", component: StatWorkSheet2 },
  { path: "/statworksheet3", component: StatWorkSheet3 },
];

// Route component for direct usage
const StatisticsRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {statisticsRoutes.map((route) => (
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
export { statisticsRoutes, StatisticsRoutes };
export default StatisticsRoutes; 