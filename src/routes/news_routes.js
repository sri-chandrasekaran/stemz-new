import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const March = lazy(() => import('./March'));
const September = lazy(() => import('./sept'));

// Define route configuration
const newsRoutes = [
  { path: "/news/march", component: March },
  { path: "/news/september", component: September },
];

// Route component for direct usage
const NewsRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {newsRoutes.map((route) => (
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
export { newsRoutes, NewsRoutes };
export default NewsRoutes; 