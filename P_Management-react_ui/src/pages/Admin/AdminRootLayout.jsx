import React, { useState } from 'react'
import { AppSidebar } from '@/components/admin/app-sidebar'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
 SidebarInset,
 SidebarProvider,
 SidebarTrigger,
} from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'
import soliderPicture from '../../assets/images/dummy_pic.png'
import { CaretDown } from '@phosphor-icons/react'

function AdminRootLayout() {
 return (
  <SidebarProvider>
   <AppSidebar />
   <SidebarInset>
    <header className="sticky top-0 flex h-[110px] shrink-0 items-center gap-2 border-b bg-background px-10">
     <SidebarTrigger className="-ml-1 text-titleColor" />
     <Separator orientation="vertical" className="mr-2 h-4" />
     <Breadcrumb>
      <h2 className="m-0 p-0 text-2xl text-titleColor font-raleway">
       PCDA(O) Portal
      </h2>
     </Breadcrumb>
     <div className="ml-auto px-3">
      <div className="flex gap-7 items-center">
       <p className="font-raleway">
        Last Login:{' '}
        <span className="font-bold font-raleway">
                  29-10-2024 | 12:30 PM
                </span>
       </p>
       <div className="flex gap-3 items-center">
        <div className="flex gap-2 items-center bg-adminBreadCrumbsBg px-6 py-2 rounded-md cursor-pointer ">
         <div className="flex gap-2 items-center">
          <img
           src={soliderPicture}
           alt="Veer's picture"
           className="w-10 h-10 object-cover rounded-full border border-statebluecolor"
          />
          <p className="font-raleway font-bold">Admin</p>
         </div>
         <CaretDown size={22} />
        </div>
       </div>
      </div>
     </div>
    </header>
    <div className="flex flex-1 flex-col overflow-y-auto">
     {/* <div className="grid auto-rows-min gap-4 md:grid-cols-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-muted/50" />
            ))}
          </div> */}
     <Outlet />
    </div>
   </SidebarInset>
  </SidebarProvider>
 )
}

export default AdminRootLayout
