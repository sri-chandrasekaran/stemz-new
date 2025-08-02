//App.js
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import AppRoutes from "./routes";
import { ToastContainer } from './components/NotificationToast';
function App() {
  return (
    <>
      <Analytics />
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;