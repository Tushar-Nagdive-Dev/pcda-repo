import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AccessibilityContextProvider from "./context/AccessibilityContext.jsx";
import UserRoleContextProvider from "./context/UserRoleContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserRoleContextProvider>
      <AccessibilityContextProvider>
        <App />
      </AccessibilityContextProvider>
    </UserRoleContextProvider>
  </StrictMode>
);
