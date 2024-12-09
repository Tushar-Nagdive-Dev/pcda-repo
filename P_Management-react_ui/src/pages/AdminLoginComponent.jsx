import React from "react";
import LoginBanner from "@/assets/images/pcdao_login_banner.svg";
// import LoginBanner from "@/assets/images/Login_Banner.png";
import {Link} from "react-router-dom";
import pcdaoLogo from "@/assets/logo/pcdao_logo-removebg.png";
import AdminLoginForm from "../components/LoginForm/AdminLoginForm.jsx";


function AdminLoginComponent() {
    return (<>
            <div
                className="relative h-[100svh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-60-40 lg:px-0">
                <div className="relative hidden lg:block w-full h-full lg:flex-[3_3_0%]">
                    <img
                        src={LoginBanner}
                        width={1280}
                        alt="Army People"
                        className="block object-cover object-left w-full h-[100svh]"
                    />
                </div>
                <div className="w-full h-full border-l-slate-200 border-l-2">
                    <div
                        className="mx-auto flex w-full h-full flex-col justify-center md:max-lg:space-y-2 mid_hd_screen:max-full_hd_screen:space-y-3 space-y-6 sm:w-[400px]">
                        <div className="text-left mb-5">
                            <div className="flex flex-col space-y-3">
                                <h2 className="md:max-lg:text-xl mid_hd_screen:max-full_hd_screen:text-3xl text-4xl tracking-tight raleway-font">
                                    Welcome to
                                </h2>
                                <h2 className="md:max-lg:text-2xl mid_hd_screen:max-full_hd_screen:text-3xl text-4xl font-black tracking-tight raleway-font text-statebluecolor">
                                    PCDA(O)
                                </h2>
                            </div>
                        </div>
                        <AdminLoginForm/>
                        <Link
                            to={"/forgotpassword"}
                            className="px-8 text-center text-sm text-statebluecolor raleway-font underline-offset-2"
                        >
                            Forgot Your Password?
                        </Link>
                    </div>
                </div>
            </div>
        </>);
}

export default AdminLoginComponent;