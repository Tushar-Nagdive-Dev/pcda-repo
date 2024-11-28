import * as React from "react";
import { Files, Plus, Radar, ShieldEllipsis, SquareUserRound } from "lucide-react";
import { NavUser } from "@/components/officer/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import pcdaoLogo from "@/assets/logo/pcdao_hd.png";
import ButtonSideBar from "./ButtonSideBar";
import {
  ChartDonut,
  IdentificationCard,
  ShieldStar,
  SignOut,
  UsersThree,
} from "@phosphor-icons/react";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  calendars: [
    {
      name: "My Calendars",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Favorites",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "Other",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-[110px] border-b border-sidebar-border px-6 py-8 bg-white flex justify-center items-center">
        <img src={pcdaoLogo} alt="PCDAO's Logo" className="h-[80px] w-auto" />
      </SidebarHeader>
      <SidebarContent className="bg-white hover:bg-transparent">
        <ButtonSideBar
          title="Dashboard"
          icon={Radar}
          link="/officer"
          currentSection="Dashboard"
        />
        <ButtonSideBar title="Grievance Manager" icon={ShieldEllipsis} link="download"/>
        <ButtonSideBar title="Bulk" icon={Files} link="bulk"/>
        <ButtonSideBar title="TA/DA" icon={Files} link="tada"/>
        <ButtonSideBar title="Officers" icon={SquareUserRound} link="officers"/>
        <ButtonSideBar title="Rent & Alliend" icon={ShieldEllipsis} link="rendandalliend"/>
        <ButtonSideBar title="Claims" icon={ShieldEllipsis} link="claims"/>
        <ButtonSideBar title="DSOP" icon={SquareUserRound} link="dsop"/>
        <ButtonSideBar title="Logout" icon={SignOut} link="logout"/>
      </SidebarContent>
      {/* <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
