import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Stat1p = lazy(() => import('../pages/statistics/stat1p'));
const Stat1s = lazy(() => import('../pages/statistics/stat1s'));
const Stat2p = lazy(() => import('../pages/statistics/stat2p'));
const Stat2s = lazy(() => import('../pages/statistics/stat2s'));
const Stat3p = lazy(() => import('../pages/statistics/stat3p'));
const Stat3s = lazy(() => import('../pages/statistics/stat3s'));
const Stat4p = lazy(() => import('../pages/statistics/stat4p'));
const Stat4s = lazy(() => import('../pages/statistics/stat4s'));
const Stat5p = lazy(() => import('../pages/statistics/stat5p'));
const Stat5s = lazy(() => import('../pages/statistics/stat5s'));
const StatQuiz = lazy(() => import('../pages/statistics/Statquiz'));
const StatWorkSheet1 = lazy(() => import('../pages/statistics/statWorkSheet1'));
const StatWorkSheet2 = lazy(() => import('../pages/statistics/statWorkSheet2'));
const StatWorkSheet3 = lazy(() => import('../pages/statistics/statWorkSheet3'));

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