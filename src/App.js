//App.js
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import AppRoutes from "./routes";
import ChatbotLauncher from "./components/ChatbotLauncher";

function App() {
  return (
    <>
      <Analytics />
      <AppRoutes />
      <ChatbotLauncher />
    </>
  );
}

export default App;
