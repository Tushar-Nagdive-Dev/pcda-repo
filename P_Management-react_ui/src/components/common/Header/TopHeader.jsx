import React, { useContext, useEffect, useState } from "react";
import headerstyle from "./Header.module.css";
import dayjs from "dayjs";
import { EnvelopeSimple, Phone } from "@phosphor-icons/react";
import { AccessibilityContext } from "../../../context/AccessibilityContext";

function TopHeader() {
  const accessibilityCtx = useContext(AccessibilityContext);
  return (
    <div className="flex h-[2.5rem] w-full px-custom  bg-mainprimarycolor text-white">
      <div className="w-full flex justify-between items-center h-full">
        <div className="flex">
          Office Timing: Monday to Friday (09:30h to 18:00h)
        </div>
        <div className="h-full flex gap-2 ">
          <div className="flex gap-3 h-full items-center">
            <p className="m-0">Skip to main content</p>
            <div className="flex gap-2 items-center">
              <p className="inline m-0">Text Size</p>
              <p className="inline m-0">
                <span className="font-bold text-base cursor-pointer" onClick={() => accessibilityCtx.setScale((prev) => Math.max(prev - 0.35, 0.3))}>-</span> A{" "}
                <span className="font-bold text-base cursor-pointer" onClick={() => accessibilityCtx.setScale((prev) => Math.min(prev + 0.35, 1))}>+</span>
              </p>
            </div>
          </div>
          <div className="flex gap-3 h-full items-center">
            <div className="flex gap-2">
              <Phone size={24} color="#ffffff" />
              <p className="m-0">(020) 264-1100</p>
            </div>
            {/* <hr className={headerstyle.vertical_line} /> */}
            <p style={{ color: "var(--state-blue-color)" }} className="m-0">|</p>
            <div className="flex gap-2 items-center">
              <EnvelopeSimple size={24} color="#ffffff" />
              <p className="m-0">generalquery-pcdaopune@nic.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
