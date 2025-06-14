import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Home = lazy(() => import('../pages/main/Home'));
const About = lazy(() => import('../pages/main/About'));
const GetInvolved = lazy(() => import('../pages/main/GetInvolved'));
const Contact = lazy(() => import('../pages/main/Contact'));
const OnlineClasses = lazy(() => import('../pages/main/OnlineClasses'));
const SelfPacedClasses = lazy(() => import('../pages/main/SelfPacedClasses'));
const CourseBoxes = lazy(() => import('../pages/main/CourseBoxes'));
const Volunteer = lazy(() => import('../pages/main/Volunteer'));

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