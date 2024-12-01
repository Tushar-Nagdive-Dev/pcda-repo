import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminOutletLayout() {
  return (
    <React.Fragment>
        <Outlet />
    </React.Fragment>
  )
}

export default AdminOutletLayout