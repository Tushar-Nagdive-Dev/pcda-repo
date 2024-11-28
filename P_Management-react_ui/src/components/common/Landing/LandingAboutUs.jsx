import React, { useContext } from "react";
import pcdaoBuildingClipped from "@/assets/images/About_us_section.png";
import LeftBorderWithTitle from "../../LeftBorderWithTitle";
import { AccessibilityContext } from "../../../context/AccessibilityContext";

function LandingAboutUs() {
  const accessibilityCtx = useContext(AccessibilityContext);
  return (
    <div className="w-full flex flex-col space-y-6 my-24">
      <LeftBorderWithTitle
        textSize="text-base"
        title="Principal Controller of Defence Accounts (Officers)"
        className="text-mainprimarycolor"
      />
      <h4
        className={`text-3xl text-mainprimarycolor font-bold`}
      >
        About Us
      </h4>
      <div className="w-full flex gap-10">
        <div className="w-[65%] relative">
          <img
            src={pcdaoBuildingClipped}
            alt="PCDAO's Building"
            className="w-full"
          />
        </div>
        <div className="w-full text-ternaryGrey">
          <p
            className={`w-full m-0 p-0 text-justify ${accessibilityCtx.getFontSizeClass(
              "text-base"
            )}`}
          >
            Welcome to the Principal Controller of Defence Accounts (PCDA) (O),
            a distinguished arm of the Defence Accounts Department (DAD),
            dedicated to managing the pay and allowances of Indian Army
            officers. Under the leadership of the Controller General of Defence
            Accounts (CGDA), we ensure the accurate and timely processing of all
            pay-related matters, including basic pay, allowances, and
            entitlements, in accordance with government regulations. Our
            responsibilities extend to managing various allowances such as house
            rent, travel, and special compensatory allowances, ensuring that
            each officer receives their rightful dues without delay. At the
            PCDA(O), precision, accountability, and service excellence are at
            the core of our operations. We are committed to maintaining
            comprehensive pay records and providing transparent, efficient
            financial management. By supporting Army officers with timely
            compensation, we contribute directly to their welfare, morale, and
            operational readiness. With decades of experience, we continue to
            uphold a legacy of reliable service to the Armed Forces, helping
            ensure that officers can focus on their mission of safeguarding the
            nation.
          </p>
          {/* <p className="w-full p-0 my-2">
          Welcome to the Principal Controller of Defence Accounts (PCDA) (O), a
          distinguished arm of the Defence Accounts Department (DAD), dedicated
          to managing the pay and allowances of Indian Army officers. Under the
          leadership of the Controller General of Defence Accounts (CGDA), we
          ensure the accurate and timely processing of all pay-related matters,
          including basic pay, allowances, and entitlements, in accordance with
          government regulations. Our responsibilities extend to managing
          various allowances such as house rent, travel, and special
          compensatory allowances, ensuring that each officer receives their
          rightful dues without delay. At the PCDA(O), precision,
          accountability, and service excellence are at the core of our
          operations. We are committed to maintaining comprehensive pay records
          and providing transparent, efficient financial management. By
          supporting Army officers with timely compensation, we contribute
          directly to their welfare, morale, and operational readiness. With
          decades of experience, we continue to uphold a legacy of reliable
          service to the Armed Forces, helping ensure that officers can focus on
          their mission of safeguarding the nation.
        </p> */}
        </div>
      </div>
    </div>
  );
}

export default LandingAboutUs;
