import React from 'react';
import UserDashboardComponents from "../../../components/users/Dashboard/UserDashboardComponents.jsx";
import { Separator } from "@/components/ui/separator"
import UserDashboardTabsWithContent from "../../../components/users/Dashboard/UserDashboardTabsWithContent.jsx";

function UserDashboard() {
    return (
        <div className="p-10 overflow-y-hidden">
            <h2 className="font-raleway text-xl">Dashboard</h2>
            <UserDashboardComponents/>
            <Separator className="my-4 h-1" />
            <UserDashboardTabsWithContent />
        </div>
    );
}

export default UserDashboard;