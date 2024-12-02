import React from "react";
import LoginBanner from "@/assets/images/Login_Banner.png";
import { Link } from "react-router-dom";
import pcdaoLogo from "@/assets/logo/pcdao_logo-removebg.png";
import LoginForm from "./LoginForm/LoginForm";

function LoginComponent() {
  return (
    <>
      <div className="relative h-[100svh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-60-40 lg:px-0">
        <div className="relative hidden lg:block w-full h-full lg:flex-[3_3_0%]">
          <img
            src={LoginBanner}
            width={1280}
            alt="Army People"
            className="block object-cover object-left w-full h-[100svh]"
          />
        </div>
        {/* <div className=" relative hidden md:block w-full h-full lg:flex-[3_3_0%]">
          <img
            src={armyPicture}
            width={1280}
            alt="Army People"
            className="block object-cover object-left w-full h-full"
          /> */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-65 bg-gradient-to-r from-black/65 to-transparent mix-blend-multiply"></div> */}
        {/* </div> */}
        <div className="w-full">
          <div className="w-full border-l-[12px] border-l-statebluecolor flex justify-center items-center mb-[2rem] full_hd_screen:mb-[4rem]">
            <img src={pcdaoLogo} alt="PCDA(O)'s Logo" className="mid_hd_screen:max-full_hd_screen:w-[300px] full_hd_screen:w-[400px]" />
          </div>
          {/* <div className="lg:p-8"> */}
          <div className="mx-auto flex w-full flex-col justify-center md:max-lg:space-y-2 mid_hd_screen:max-full_hd_screen:space-y-3 space-y-6 sm:w-[400px]">
            <div className="flex flex-col">
              <h2 className="md:max-lg:text-xl mid_hd_screen:max-full_hd_screen:text-3xl text-4xl tracking-tight raleway-font">
                Welcome to
              </h2>
              <h2 className="md:max-lg:text-2xl mid_hd_screen:max-full_hd_screen:text-3xl text-4xl font-black tracking-tight raleway-font text-statebluecolor">
                PCDA (Officers)
              </h2>
            </div>
            <div></div>

            <LoginForm />
            <Link
              to={"/forgotpassword"}
              className="px-8 text-center text-sm text-statebluecolor raleway-font underline-offset-2"
            >
              Forgot Your Password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
