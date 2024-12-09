import React from 'react';
import soliderPicture from '@/assets/images/dummy_pic.png'
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Button} from "@/components/ui/button";
import UserPersonalInfo from "../../../components/users/UserProfileSideBar/UserPersonalInfo.jsx";
import UserEditPassword from "../../../components/users/UserProfileSideBar/UserEditPassword.jsx";
import UserEditMobileNum from "../../../components/users/UserProfileSideBar/UserEditMobileNum.jsx";

const userProfileTabMenuList = [
    {
        id: "t1",
        title: "Personal Info",
    },
    {
        id: "t2",
        title: "Edit Password",
    },
    {
        id: "t3",
        title: "Edit Mobile No",
    },
];

function UserProfileSidebar() {
    const [currentTab, setCurrentTab] = React.useState("Personal Info");
    return (
        <div className="w-full h-full justify-center space-y-10 max-w-[500px] py-12 mx-auto">
            <h2 className="font-raleway text-2xl text-center">User Profile</h2>
            <div className="flex justify-center">
                <img src={soliderPicture} className="w-24 h-24 rounded-full border-4 border-statebluecolor object-cover"/>
            </div>
            {/* Menu Button*/}
            <div className="w-full flex ">
                <div className="flex items-center h-full w-full">
                    <TransitionGroup component={null}>
                        {userProfileTabMenuList.map((item) => (
                            <CSSTransition
                                key={item.id}
                                timeout={300}
                                classNames="navLink"
                                unmountOnExit
                            >
                                <Button
                                    variant={currentTab === item.title ? "default" : "hover"}

                                    onClick={() => setCurrentTab(item.title)}
                                    className="w-full h-10 text-lg"
                                >
                                    {item.title}
                                </Button>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
            </div>
            {/* Content */}
            <div>
                {currentTab === "Personal Info" && (
                    <UserPersonalInfo />
                )}

                {currentTab === "Edit Password" && (
                    <UserEditPassword />
                )}

                {currentTab === "Edit Mobile No" && (
                    <UserEditMobileNum />
                )}

            </div>


        </div>
    );
}

export default UserProfileSidebar;