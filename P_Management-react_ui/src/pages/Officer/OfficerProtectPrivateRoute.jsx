import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import OfficersRootLayout from "./OfficersRootLayout";
import Login from "../Login";

function OfficerProtectPrivateRoute() {
  // const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <>{isLoggedIn ? <OfficersRootLayout /> : <Login onLoginSuccess={(flag) => setIsLoggedIn(flag)} />}</>;
}

export default OfficerProtectPrivateRoute;
