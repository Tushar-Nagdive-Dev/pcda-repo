import React from "react";
import { Link } from "react-router-dom";
import LandingSlider from "../components/common/Landing/LandingSlider";
import LatestLandingUpdateLists from "../components/common/Landing/LatestLandingUpdateLists";
import ClientTransactionSummary from "../components/common/Landing/ClientTransactionSummary";
import LandingAboutUs from "../components/common/Landing/LandingAboutUs";
import LandingAchievement from "../components/common/Landing/LandingAchievement";
import LandingSections from "../components/common/Landing/LandingSections";
import LandingTestimonial from "../components/common/Landing/LandingTestimonial";
import LandingUpcomingEvents from "../components/common/Landing/LandingUpcomingEvents";
import LandingCalculator from "../components/common/Landing/LandingCalculator";
import LandingImportantLinks from "../components/common/Landing/LandingImportantLinks";
import LandingAppreciations from "../components/common/Landing/LandingAppreciations";

function Main() {
  return (
    <>
      <div className="px-custom space-y-24">
        <div className="w-full mt-10 flex flex-row gap-10">
          <LandingSlider />
          <LatestLandingUpdateLists />
        </div>
        {/* <ClientTransactionSummary /> */}
      </div>
      <LandingImportantLinks />
      <div className="px-custom space-y-24">
        <LandingAboutUs />
      </div>
      <LandingSections />

      <div className="px-custom space-y-24 my-24">
        <LandingCalculator />
      </div>
      <LandingTestimonial />
      {/* <div className="px-custom space-y-24">
        <LandingUpcomingEvents />
      </div> */}
      <LandingAppreciations />
      <LandingAchievement />
    </>
  );
}

export default Main;
