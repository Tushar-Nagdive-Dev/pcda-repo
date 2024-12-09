import React from "react";
import LoginBanner from "@/assets/images/pcdao_officer_login_banner.svg";
// import LoginBanner from "@/assets/images/Login_Banner.png";
import {Link} from "react-router-dom";
import pcdaoLogo from "@/assets/logo/pcdao_logo-removebg.png";
import UserLoginForm from "../../components/LoginForm/UserLoginForm.jsx";

function UserLoginComponent() {
    return (<>
        <div
            className="relative h-[100svh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-60-40 lg:px-0">
            <div className="relative hidden lg:block w-full h-full lg:flex-[3_3_0%]">
                <img
                    src={LoginBanner}
                    width={1280}
                    alt="Army People"
                    className="block object-cover object-top w-full h-[100svh]"
                />
            </div>
            <UserLoginForm/>
        </div>
    </>);
}

export default UserLoginComponent;
