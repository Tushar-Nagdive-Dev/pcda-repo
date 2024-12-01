import * as React from "react";
import { ChevronRight, Radar } from "lucide-react";
import "./adminAppSidebar.css";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import pcdaoLogo from "@/assets/logo/pcdao_hd.png";
import ButtonSideBar from "./ButtonSideBar";
import {
  Circle,
  Globe,
  HandCoins,
  IdentificationBadge,
  PiggyBank,
  Receipt,
  SignOut,
} from "@phosphor-icons/react";
import { ClipboardText, Files } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

const data = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Radar,
  },
  {
    title: "Grievance Manager",
    url: "grievance-manager",
    icon: ClipboardText,
  },
  {
    title: "Advance",
    url: "#",
    icon: Files,
    items: [
      {
        title: "Advance Outstanding",
        url: "#",
      },
      {
        title: "DO-II Uploads",
        url: "#",
        // isActive: true,
      },
      {
        title: "DO-II Casualty Uploads",
        url: "#",
      },
    ],
  },
  {
    title: "TA/DA",
    url: "#",
    icon: Files,
    items: [
      {
        title: "Bulk Outstanding",
        url: "#",
      },
      {
        title: "Bulk-II Uploads",
        url: "#",
      },
    ],
  },
  {
    title: "Officers",
    url: "#",
    icon: IdentificationBadge,
    items: [
      {
        title: "Manage Officers",
        url: "#",
      },
      {
        title: "AAO BSO Officers",
        url: "#",
      },
    ],
  },
  {
    title: "Rent & Allied",
    url: "rent-and-allied",
    icon: HandCoins,
  },
  {
    title: "Claims",
    url: "claims",
    icon: Receipt,
  },
  {
    title: "DSOP",
    url: "#",
    icon: PiggyBank,
    items: [
      {
        title: "DSOP Withdraw",
        url: "#",
      },
      {
        title: "DSOP Subscription",
        url: "#",
      },
    ],
  },
  {
    title: "Website Manager",
    url: "#",
    icon: Globe,
    items: [
      {
        title: "Content Manager",
        url: "#",
      },
      {
        title: "FAQ Manager",
        url: "faq",
      },
      {
        title: "Download Manager",
        url: "#",
      },
      {
        title: "Gallery Manager",
        url: "#",
      },
      {
        title: "Manage Message",
        url: "#",
      },
      {
        title: "Testimonial Manage",
        url: "testimonial",
      },
      {
        title: "News & Notification",
        url: "news-and-notification",
      },
    ],
  },
  {
    title: "Logout",
    url: "logout",
    icon: SignOut,
  },
];

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-[110px] border-b border-sidebar-border px-6 py-8 bg-white flex justify-center items-center">
        <img src={pcdaoLogo} alt="PCDAO's Logo" className="h-[80px] w-auto" />
      </SidebarHeader>
      <SidebarContent className="bg-white hover:bg-transparent">
        {/* <ButtonSideBar
          title="Dashboard"
          icon={Radar}
          link="/admin"
          currentSection="Dashboard"
        />
        <ButtonSideBar title="Grievance Manager" icon={ProtectWebIcon} link="download"/>
        <ButtonSideBar title="Advance" icon={ArchieveIcon} link="bulk"/>
        <ButtonSideBar title="TA/DA" icon={ArchieveIcon} link="tada"/>
        <ButtonSideBar title="Officers" icon={SquareUserRound} link="officers"/>
        <ButtonSideBar title="Rent & Alliend" icon={ProtectWebIcon} link="rendandalliend"/>
        <ButtonSideBar title="Claims" icon={ProtectWebIcon} link="claims"/>
        <ButtonSideBar title="DSOP" icon={SquareUserRound} link="dsop"/>
        <ButtonSideBar title="Website Manger" icon={GlobalEditIcon} />
        <ButtonSideBar title="Logout" icon={SignOut} link="logout"/> */}
        {data.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            className="group/collapsible"
          >
            <SidebarGroup>
              <CollapsibleTrigger className="group/label [data-state=open]:bg-statebluecolor">
                <ButtonSideBar
                  title={item.title}
                  url={item.url}
                  defaultPage={item.title === "Dashboard" ? "Dashboard" : null}
                >
                  <item.icon className="w-6 h-6 group-hover/label:text-statebluecolor group-data-[state=open]/collapsible:text-white" />
                  <p>{item.title}</p>
                  {item?.items?.length > 0 && (
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90 " />
                  )}
                </ButtonSideBar>
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
                                <Circle size={16} />
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
    </Sidebar>
  );
}
