import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const GetInvolved = lazy(() => import('./GetInvolved'));
const Contact = lazy(() => import('./Contact'));
const OnlineClasses = lazy(() => import('./OnlineClasses'));
const SelfPacedClasses = lazy(() => import('./SelfPacedClasses'));
const CourseBoxes = lazy(() => import('./CourseBoxes'));
const News = lazy(() => import('./News'));
const Volunteer = lazy(() => import('./volunteer'));

// Define route configuration
const mainRoutes = [
  { path: "/", component: Home },
  { path: "/about-us", component: About },
  { path: "/get-involved", component: GetInvolved },
  { path: "/volunteer", component: Volunteer },
  { path: "/contact", component: Contact },
  { path: "/online-classes", component: OnlineClasses },
  { path: "/self-paced-classes", component: SelfPacedClasses },
  { path: "/course-boxes", component: CourseBoxes },
  { path: "/news", component: News },
];

// Route component for direct usage
const MainRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {mainRoutes.map((route) => (
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
export { mainRoutes, MainRoutes };
export default MainRoutes; 