import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Button} from "@/components/ui/button";
import UserIvrsTable from "../../../pages/UserPanel/Dashboard/IVRS/UserIVRSTable.jsx";

const userDashboardTabMenuList = [
    {
        id: "udt1",
        title: "IVRS Registration",
    },
    {
        id: "udt2",
        title: "Outstanding Advances",
    },
    {
        id: "udt3",
        title: "Status of DO-II Orders",
    },
    {
        id: "udt4",
        title: "Payment Details",
    },
    {
        id: "udt5",
        title: "Download",
    },
    {
        id: "udt6",
        title: "DSOP",
    },
    {
        id: "udt7",
        title: "Declaration of Saving",
    },
    {
        id: "udt8",
        title: "Abbreviation in Salary Slip",
    },
];

function UserDashboardTabsWithContent() {
    const [currentTab, setCurrentTab] = React.useState("IVRS Registration");
    return (
        <div className="w-full h-full space-y-8 py-8 mx-auto my-8">
            {/* Menu Button*/}
            <div className="w-full flex ">
                <div className="flex items-center h-full w-full overflow-x-auto">
                    <TransitionGroup component={null}>
                        {userDashboardTabMenuList.map((item) => (
                            <CSSTransition
                                key={item.id}
                                timeout={300}
                                classNames="navLink"
                                unmountOnExit
                            >
                                <Button
                                    variant={currentTab === item.title ? "custom_default" : "custom_hover"}
                                    onClick={() => setCurrentTab(item.title)}
                                    className="w-full h-20 text-lg"
                                >
                                    {item.title}
                                </Button>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
            </div>
            {/* Content */}
            <div className="w-full">
                {currentTab === "IVRS Registration" && (
                    <UserIvrsTable />
                )}
            </div>
        </div>
    );
}

export default UserDashboardTabsWithContent;