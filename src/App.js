//App.js
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <Analytics />
      <AppRoutes />
    </>
  );
}

export default App;
