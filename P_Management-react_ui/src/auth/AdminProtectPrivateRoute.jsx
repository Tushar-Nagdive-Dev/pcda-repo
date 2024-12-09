import React from "react";
import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {isTokenExpired} from "./TokenExp.jsx";
import {toast} from "react-toastify";


// const isTokenValid = (token) => {
//     if (!token) return false;
//
//     try {
//         const {exp} = jwtDecode(token); // Decode token to extract expiration
//         return exp * 1000 > Date.now(); // Check if token is still valid
//     } catch (error) {
//         return false; // Invalid token
//     }
// };

const AdminProtectPrivateRoute = ({children}) => {
    // Check if the token is expired or invalid
    if (isTokenExpired()) {
        toast.error("Session expired. Redirecting to login...");
        return <Navigate to="/pcdao-login" replace/>;
    }

    // If valid, render children
    return children;
};


export default AdminProtectPrivateRoute;
