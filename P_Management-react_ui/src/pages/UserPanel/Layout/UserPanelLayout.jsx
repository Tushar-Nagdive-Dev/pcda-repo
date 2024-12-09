import React, { useState } from 'react'
import {UserSidebar} from "../../../components/users/Layout/UserSidebar.jsx";
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Outlet } from 'react-router-dom'
import soliderPicture from '@/assets/images/dummy_pic.png'
import { CaretDown } from '@phosphor-icons/react'
import UserProfileSidebar from "../UserProfileSidebar/UserProfileSidebar.jsx";

function UserPanelLayout() {
    return (
        <SidebarProvider>
            <UserSidebar />
            <SidebarInset >
                <header className="sticky top-0 flex h-[110px] shrink-0 items-center gap-2 border-b bg-background px-10 z-[999]">
                    <SidebarTrigger className="-ml-1 text-titleColor" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <h2 className="m-0 p-0 text-2xl text-titleColor font-raleway font-bold">
                            PCDA(O) Portal
                        </h2>
                    </Breadcrumb>
                    <div className="ml-auto px-3">
                        <div className="flex gap-7 items-center">
                            <div className="flex gap-3 items-center">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <div className="flex gap-2 items-center bg-adminBreadCrumbsBg px-6 py-2 rounded-md cursor-pointer ">
                                            <div className="flex gap-2 items-center">
                                                <img
                                                    src={soliderPicture}
                                                    alt="Profile picture"
                                                    className="w-10 h-10 object-cover rounded-full border border-statebluecolor"
                                                />
                                                <p className="font-raleway font-bold">Rajat Singh</p>
                                            </div>
                                            <CaretDown size={22}/>
                                        </div>
                                    </SheetTrigger>
                                    <SheetContent className="min-width-[850px]">
                                        <UserProfileSidebar />
                                    </SheetContent>
                                </Sheet>

                            </div>
                        </div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col overflow-y-auto">
                    <Outlet/>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default UserPanelLayout
