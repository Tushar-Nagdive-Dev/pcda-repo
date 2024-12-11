import * as React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ChevronRight, Radar} from 'lucide-react'
import './UserSidebar.css'
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupContent,
    SidebarFooter
} from '@/components/ui/sidebar'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogFooter,
    DialogClose,
    DialogHeader
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'

import pcdaoLogo from '@/assets/logo/pcdao_new.png'
import UserButtonSideBar from './UserButtonSideBar.jsx'
import {
    Circle, EnvelopeSimple,
    Receipt,
    SignOut,
} from '@phosphor-icons/react'
import {ClipboardText, Files} from '@phosphor-icons/react'
import {NavLink} from 'react-router-dom'
import {clearToken} from "../../../auth/TokenExp.jsx";

const data = [
    {
        title: 'Home',
        url: '/user',
        icon: Radar,
    },
    {
        title: 'Register Grievance',
        url: 'register-grievance',
        icon: ClipboardText,
    },
    {
        title: 'Statement of Account',
        url: 'statement-account',
        icon: ClipboardText,
    },
    {
        title: 'TA/DA',
        url: '#',
        icon: Files,
        items: [
            {
                title: 'Requisition',
                url: '#',
            },
            {
                title: 'Bills',
                url: '#',
            },
            {
                title: 'Advance',
                url: '#',
            },
        ],
    },
    {
        title: 'Status of Claims',
        url: 'status-claims',
        icon: Receipt,
    },
    {
        title: 'Personal Message',
        url: 'message',
        icon: EnvelopeSimple,
    },
    {
        title: 'Status of Letters',
        url: 'letters',
        icon: EnvelopeSimple,
    },
    {
        title: 'Logout',
        url: '#',
        icon: SignOut,
    },
]

export function UserSidebar({...props}) {
    const navigate = useNavigate();

    return (
        <Sidebar {...props}>
            <SidebarHeader
                className="h-[110px] border-b border-sidebar-border px-6 py-8 bg-white flex justify-center items-center">
                <Link to={'/user'}><img src={pcdaoLogo} alt="PCDAO's Logo" className="h-[60px] w-auto"/></Link>
            </SidebarHeader>
            <SidebarContent className="bg-white hover:bg-transparent">
                {data.map((item) => (
                    <Collapsible
                        key={item.title}
                        title={item.title}
                        className="group/collapsible"
                    >
                        <SidebarGroup>
                            <CollapsibleTrigger className="group/label [data-state=open]:bg-statebluecolor">
                                <UserButtonSideBar
                                    title={item.title}
                                    url={item.url}
                                    defaultPage={item.title === 'Dashboard' ? 'Dashboard' : null}
                                >
                                    {item.title === 'Logout' ? (
                                        <div onClick={() => {
                                            clearToken();
                                            navigate("/login")
                                        }}
                                             className="w-full flex gap-2">
                                            <item.icon
                                                className="w-6 h-6 group-hover/label:text-statebluecolor group-data-[state=open]/collapsible:text-white"/>
                                            <p>{item.title}</p>
                                        </div>
                                    ) : (
                                        <>
                                            <item.icon
                                                className="w-6 h-6 group-hover/label:text-statebluecolor group-data-[state=open]/collapsible:text-white"/>
                                            <p>{item.title}</p>
                                            {item?.items?.length > 0 && (
                                                <ChevronRight
                                                    className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90 "/>
                                            )}
                                        </>
                                    )}
                                </UserButtonSideBar>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="CollapsibleContent">
                                <SidebarGroupContent className=" bg-adminSideBarSubMenuList">
                                    <SidebarMenu className=" space-y-4 py-2">
                                        {item?.items
                                            ? item?.items.map((subItem) => (
                                                <SidebarMenuItem key={subItem?.title}>
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={subItem?.isActive}
                                                    >
                                                        <div className="flex gap-2">
                                                            <Circle size={16}/>
                                                            <NavLink
                                                                to={subItem?.url}
                                                                className="text-lg font-raleway"
                                                            >
                                                                {subItem?.title}
                                                            </NavLink>
                                                        </div>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))
                                            : null}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
            </SidebarContent>
            <SidebarFooter className="p-0 cursor-pointer">
                <div className="w-full h-[44px] bg-adminBreadCrumbsBg flex justify-center items-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <p className="font-raleway font-semibold">Disclaimer</p>
                        </DialogTrigger>
                        <DialogContent className="font-raleway text-lg text-justify w-[900px]">
                            <DialogHeader className="font-raleway font-bold">
                                Disclaimer
                            </DialogHeader>
                            The information provided on this website is based on relevant Govt. orders, Army
                            Instructions and Army Orders. However contents of this web site cannot be quoted as
                            authority in any of the correspondence with the Office of the Principal Controller of
                            Defence Accounts (Officers) or with any other organisation. No classified information will
                            be provided or received through this web site. The copyright and ownership as regard to the
                            domain name, contents and web design rests with the Principal Controller of Defence Accounts
                            (Officers), Golibar Maidan, Pune, India - 411001.

                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
