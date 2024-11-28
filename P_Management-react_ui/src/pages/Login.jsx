import React from "react";
import LoginComponent from "../components/LoginComponent";

function Login({ onLoginSuccess }) {
  return (
    <>
      <LoginComponent onLoginSuccess={onLoginSuccess} />
    </>
  );
}

export default Login;
