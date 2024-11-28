import React from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import AboutUsSection from "../components/common/AboutUs/AboutUsSection";

function AboutUs() {
  return (
    <div className="space-y-10 pb-20">
      <Breadcrumbs title="About Us" />
      <AboutUsSection />
    </div>
  );
}

export default AboutUs;
