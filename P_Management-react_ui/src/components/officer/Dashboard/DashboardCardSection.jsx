import React from "react";
import welcomeAdminScreen from "../../../assets/images/welcome_screen.jpg";
import solider from "../../../assets/images/dummy_pic.png";
import DashboardCountCard from "./DashboardCountCard";

function DashboardCardSection() {
  return (
    <div className="max-h-[350px] grid auto-rows-min gap-4 md:grid-cols-5 md:grid-rows-2">
      <div className="h-full w-full relative col-span-2 row-span-2">
        {/* Solider Profile Card  */}
        <div className="flex h-full flex-col ">
          <div className="h-1/2 rounded-t-md">
            <img
              src={welcomeAdminScreen}
              alt="Welcome"
              className="w-full h-full object-cover rounded-t-md"
            />
            <p className="text-white font-bold absolute top-4 left-4 font-raleway">
              Welcome Veer!
            </p>
          </div>

          <div className="h-full w-full bg-adminCard rounded-b-md">
            <div className="h-full flex justify-between px-5 py-5">
              <div className="flex flex-col justify-between gap-3">
                <img
                  src={solider}
                  alt="Person's Picture"
                  className="rounded-full h-14 w-14 border-4 border-white"
                />
                <div className="w-full flex flex-col gap-2">
                  <h5 className="text-lg text-titleColor font-bold font-raleway">
                    Veer Sharma
                  </h5>
                  <p className="text-statebluecolor text-sm font-raleway">
                    Major
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Send  */}
      <DashboardCountCard title="Request Send" number={10} />

      {/* In-Progress Send  */}
      <DashboardCountCard title="In-Progress" number={2} />

      {/* Resolved  */}
      <DashboardCountCard title="Resolved" number={6} />

      {/* Rejected  */}
      <DashboardCountCard title="Rejected" number={1} />
      <DashboardCountCard title="Document Support" number={1} />
      <DashboardCountCard title="Resolved" number={10} />
    </div>
  );
}

export default DashboardCardSection;
