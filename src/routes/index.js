import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Import route groups
import { mainRoutes } from "./main_routes";
import { authRoutes } from "./auth_routes";
import { newsRoutes } from "./news_routes";
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
const Astronomy = lazy(() => import("./Astronomy"));
const BasicsOfCoding = lazy(() => import("./BasicsOfCoding"));
const Biochemistry = lazy(() => import("./Biochemistry"));
const Chemistry = lazy(() => import("./Chemistry"));
const Circuits = lazy(() => import("./Circuits"));
const EnvironmentalScience = lazy(() => import("./EnvironmentalScience"));
const Psychology = lazy(() => import("./Psychology"));
const Statistics = lazy(() => import("./Statistics"));
const Zoology = lazy(() => import("./Zoology"));

// Subject page routes
const subjectRoutes = [
  { path: "/astronomy", component: Astronomy },
  { path: "/basics-of-coding", component: BasicsOfCoding },
  { path: "/biochemistry", component: Biochemistry },
  { path: "/chemistry", component: Chemistry },
  { path: "/circuits", component: Circuits },
  { path: "/environmental-science", component: EnvironmentalScience },
  { path: "/psychology", component: Psychology },
  { path: "/statistics", component: Statistics },
  { path: "/zoology", component: Zoology },
];

// Combine all routes
const allRoutes = [
  // Include all route groups
  ...mainRoutes,
  ...authRoutes,
  ...newsRoutes,
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