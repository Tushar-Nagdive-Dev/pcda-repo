import React from "react";
import { cn } from "@/lib/utils.ts";

function LeftBorderWithTitle({ className, textSize, title }) {
  return (
    <p
      className={cn(
        `w-full inline-block border-l-4 border-l-newprimaryColor ${textSize} text-mainprimarycolor pl-4`,
        className
      )}
    >
      {title}
    </p>
  );
}

export default LeftBorderWithTitle;
