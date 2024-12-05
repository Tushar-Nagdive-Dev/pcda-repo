import React, { useContext, useEffect, useState } from 'react'
import Login from './Login'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserRoleContext } from '../context/UserRoleContext'
import LoginComponent from '../components/LoginComponent'

function LoginProtectRoute() {
 const [isLoggedIn, setIsLoggedIn] = useState(false)
 return (
  <>
   {isLoggedIn ? (
    <OfficersRootLayout />
   ) : (
    <LoginComponent onLoginSuccess={(flag) => setIsLoggedIn(flag)} />
   )}
  </>
 )
}

export default LoginProtectRoute
