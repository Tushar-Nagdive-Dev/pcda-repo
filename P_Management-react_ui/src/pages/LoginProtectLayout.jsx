import React, { useContext, useEffect, useState } from "react";
import Login from "./Login";
import { Navigate, useNavigate } from "react-router-dom";
import { UserRoleContext } from "../context/UserRoleContext";

function LoginProtectRoute() {
  const navigate = useNavigate();
  const [checkingRole, setCheckingRole] = useState(true);
  const userRoleCTX = useContext(UserRoleContext);

  useEffect(() => {
    if (userRoleCTX.role && userRoleCTX.user) {
      switch (userRoleCTX.role) {
        case "admin":
          navigate("/admin");
          break;
        case "officer":
          /* Not yet components */
          navigate("/officer");
          break;
        case "super-admin":
          /* Not yet components */
          navigate("/super-admin");
          break;

        default:
          break;
      }
    } else {
      setCheckingRole(false); // Done checking role, no navigation needed
    }
  }, [userRoleCTX, navigate]);

  // Render Login only if role checking is complete
  if (checkingRole) {
    return null;
  }

  return <Login />;
}

export default LoginProtectRoute;
