import React from "react";
import LoginBanner from "@/assets/images/pcdao_officer_login_banner.svg";
import {Link} from "react-router-dom";
import UserForgetPasswordForm from "../../components/LoginForm/User/UserForgetPasswordForm.jsx";

function UserForgetPassword() {
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
            <div className="w-full h-full border-l-slate-200 border-l-2">
                <div
                    className="mx-auto flex w-full h-full flex-col justify-center md:max-lg:space-y-2 mid_hd_screen:max-full_hd_screen:space-y-3 space-y-6 sm:w-[400px]">
                    <div className="text-left mb-5">
                        <div className="flex flex-col space-y-3">
                            <h2 className="md:max-lg:text-xl mid_hd_screen:max-full_hd_screen:text-3xl text-4xl tracking-tight raleway-font">
                                Forgot Password
                            </h2>
                            {/*<h2 className="md:max-lg:text-2xl mid_hd_screen:max-full_hd_screen:text-3xl text-4xl font-black tracking-tight raleway-font text-statebluecolor">*/}
                            {/*    PCDA(O)*/}
                            {/*</h2>*/}
                        </div>
                    </div>
                    <UserForgetPasswordForm />
                </div>
            </div>
        </div>
    </>);
}

export default UserForgetPassword;
