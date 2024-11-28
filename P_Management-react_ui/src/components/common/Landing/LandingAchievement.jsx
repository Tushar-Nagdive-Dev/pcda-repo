import React, { useContext } from "react";
import acheivementLogo from "@/assets/images/achievement.png";
import LeftBorderWithTitle from "../../LeftBorderWithTitle";
import { AccessibilityContext } from "../../../context/AccessibilityContext";

function LandingAchievement() {
  const accessibilityCtx = useContext(AccessibilityContext);
  return (
    <div className="w-full px-custom py-36  mt-24">
      <div className="flex gap-14">
        <img
          src={acheivementLogo}
          alt="PCDAOs Achievement"
          className="w-[45%] "
        />
        <div className="flex flex-col space-y-6">
          <LeftBorderWithTitle
            textSize="text-base"
            title="PCDA(o)"
            className="text-titleColor"
          />
          <h4 className="text-3xl text-titleColor font-bold">Honor</h4>
          <p className={`text-titleColor ${accessibilityCtx.getFontSizeClass("text-base")} `}>
            Welcome to the Principal Controller of Defence Accounts (PCDA) (O),
            a distinguished arm of the Defence Accounts Department (DAD),
            dedicated to managing the pay and allowances of Indian Army
            officers. Under the leadership of the Controller General of Defence
            Accounts (CGDA), we ensure the accurate and timely processing of all
            pay-related matters, including basic pay, allowances, and
            entitlements, in accordance with government regulations. Our
            responsibilities extend to managing vario.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingAchievement;
