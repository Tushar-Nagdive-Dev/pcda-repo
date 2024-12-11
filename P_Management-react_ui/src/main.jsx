import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AccessibilityContextProvider from "./context/AccessibilityContext.jsx";
import UserRoleContextProvider from "./context/UserRoleContext.jsx";
import DemoUserFlowPurposeContext from "./context/DemoUserFlowPurposeContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/*<UserRoleContextProvider>*/}
        <DemoUserFlowPurposeContext>
            <AccessibilityContextProvider>
                <App/>
            </AccessibilityContextProvider>
        </DemoUserFlowPurposeContext>
        {/*</UserRoleContextProvider>*/}
    </StrictMode>
);
