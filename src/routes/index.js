import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Import route groups
import { mainRoutes } from "./main_routes";
import { authRoutes } from "./auth_routes";
import { astronomyRoutes } from "./astronomy_routes";
import { zoologyRoutes } from "./zoo_routes";
import { psychologyRoutes } from "./psychology_routes";
import { statisticsRoutes } from "./statistics_routes";
import { circuitsRoutes } from "./circuits_routes";
import { environmentalScienceRoutes } from "./environmental_science_routes";
import { chemistryRoutes } from "./chemistry_routes";
import { biochemistryRoutes } from "./biochemistry_routes";
import { codingRoutes } from "./coding_routes";

// Lazy load subject pages
const Astronomy = lazy(() => import("../pages/astronomy/Astronomy"));
const BasicsOfCoding = lazy(() => import("../pages/basics_of_coding/BasicsOfCoding"));
const Biochemistry = lazy(() => import("../pages/biochemistry/Biochemistry"));
const Chemistry = lazy(() => import("../pages/chemistry/Chemistry"));
const Circuits = lazy(() => import("../pages/circuit/Circuits"));
const EnvironmentalScience = lazy(() => import("../pages/environmental_science/EnvironmentalScience"));
const Psychology = lazy(() => import("../pages/psychology/Psychology"));
const Statistics = lazy(() => import("../pages/statistics/Statistics"));
const Zoology = lazy(() => import("../pages/zoology/Zoology"));

// Subject page routes
const subjectRoutes = [
  { path: "/Astronomy", component: Astronomy },
  { path: "/BasicsOfCoding", component: BasicsOfCoding },
  { path: "/Biochemistry", component: Biochemistry },
  { path: "/Chemistry", component: Chemistry },
  { path: "/Circuits", component: Circuits },
  { path: "/EnvironmentalScience", component: EnvironmentalScience },
  { path: "/Psychology", component: Psychology },
  { path: "/Statistics", component: Statistics },
  { path: "/Zoology", component: Zoology },
];

// Combine all routes
const allRoutes = [
  // Include all route groups
  ...mainRoutes,
  ...authRoutes,
  ...subjectRoutes,
  ...astronomyRoutes,
  ...codingRoutes,
  ...biochemistryRoutes,
  ...chemistryRoutes,
  ...circuitsRoutes,
  ...environmentalScienceRoutes,
  ...psychologyRoutes,
  ...statisticsRoutes,
  ...zoologyRoutes,
];

/**
 * Main route configuration component
 * Renders all routes with lazy loading and suspense fallback
 */
const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {allRoutes.map((route) => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={<route.component />} 
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes; 