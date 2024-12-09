import React, {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import AdminRootLayout from "./AdminRootLayout";
import {UserRoleContext} from "../../context/UserRoleContext";

function AdminProtectPrivateRoute() {
    const userRoleCTX = useContext(UserRoleContext);
    return (
        <>
            {userRoleCTX.role === "admin" && userRoleCTX.user !== null ? (
                <AdminRootLayout/>
            ) : (
                <Navigate to="/pcdao-login"/>
            )}
        </>
    );
}

export default AdminProtectPrivateRoute;
