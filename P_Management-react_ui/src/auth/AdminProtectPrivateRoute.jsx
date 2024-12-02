import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { isTokenExpired } from "./isTokenExpired";

const navigate = useNavigate();

const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token); // Decode token to extract expiration
    return exp * 1000 > Date.now(); // Check if token is still valid
  } catch (error) {
    return false; // Invalid token
  }
};

const AdminProtectPrivateRoute = ({ children }) => {
  if (isTokenExpired()) {
    console.warn("Token expired or invalid. Redirecting to login...");
    return navigate('/login');
  }
  return children;
};


export default AdminProtectPrivateRoute;
