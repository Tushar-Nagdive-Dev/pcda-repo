import React from 'react'
import welcomescreen from '../../../assets/images/welcome_screen.jpg'
import solider from '../../../assets/images/dummy_pic.png'
import UserDashboardCountCard from "./UserDashboardCountCard.jsx";
import {CalendarDots} from "@phosphor-icons/react";

function UserDashboardWelcomeCard() {
    return (
        <div className="max-h-[350px] grid auto-rows-min gap-4 md:grid-cols-4 hd_screen:grid-cols-6 my-10">
            <div className="h-full w-full col-span-2 ">
                {/* Solider Profile Card  */}
                <div className="flex h-full flex-col ">
                    <div className="h-1/2 rounded-t-md relative">
                        <img
                            src={welcomescreen}
                            alt="Welcome"
                            className="w-full max-h-[130px] object-cover rounded-t-md"
                        />
                        <p className="text-white text-xl font-semibold absolute top-6 left-8 font-raleway">
                            Welcome Back!
                        </p>
                        <div className="absolute bottom-2 right-3">
                            <div className="flex flex-col text-right space-y-2">
                                <p className="text-white  font-raleway">
                                    Last Login:
                                </p>
                                <div className="w-full flex gap-3 ">
                                    <div className="flex gap-2 text-white font-raleway">
                                        <CalendarDots size={20}/>
                                        <p>04 Dec 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-full w-full bg-adminCard rounded-b-md">
                        <div className=" h-full flex justify-between px-6 py-5">
                            <div className=" w-full flex flex-col justify-between gap-3">
                                <img
                                    src={solider}
                                    alt="Person's Picture"
                                    className="absolute -top-8 rounded-full h-16 w-16 border-4 border-white"
                                />
                                <div className={'flex justify-between items-center mt-8'}>
                                    <div className="w-fit flex flex-col gap-1">
                                        <h5 className=" text-titleColor text-xl font-bold font-raleway">
                                            Rajat Singh
                                        </h5>
                                        <p className="text-statebluecolor text-xl ">
                                            96511941C
                                        </p>
                                    </div>
                                    <button type={'button'}
                                            className="w-fit h-fit py-2 px-4 font-raleway bg-statebluecolor rounded-sm text-white text-xl">
                                        {`>`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grievance */
            }
            <UserDashboardCountCard title="Grievance" number={7}/>

            {/* DO-II Orders  */
            }
            <UserDashboardCountCard title="DO Part-II" number={6}/>

            {/* DSOP  */
            }
            <UserDashboardCountCard title="Status of Claim" number={8}/>

            {/* TA/DA Orders  */
            }
            <UserDashboardCountCard title="Personal Message" number={4}/>
        </div>
    );
}

export default UserDashboardWelcomeCard;