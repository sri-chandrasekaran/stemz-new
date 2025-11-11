//App.js
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import AppRoutes from "./routes";
import ChatbotLauncher from "./components/ChatbotLauncher";
import { ToastContainer } from './components/NotificationToast';

function App() {
  return (
    <>
      <Analytics />
      <AppRoutes />
      <ChatbotLauncher />
      <ToastContainer />
    </>
  );
}

export default App;