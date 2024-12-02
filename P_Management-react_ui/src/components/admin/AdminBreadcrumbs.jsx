import React from 'react'

function AdminBreadcrumbs({title, subtitle,children}) {
  return (
    <div className='flex justify-between items-center py-4 px-10 bg-adminBreadCrumbsBg text-titleColor'>
        <div className='flex flex-col space-y-2'>
         {title && <p className='font-raleway'>{title}</p>}
            <p className='font-raleway text-lg font-semibold'>{subtitle}</p>
        </div>
        <div className='h-full flex items-center gap-2'>
            {children}
        </div>
    </div>
  )
}

export default AdminBreadcrumbs