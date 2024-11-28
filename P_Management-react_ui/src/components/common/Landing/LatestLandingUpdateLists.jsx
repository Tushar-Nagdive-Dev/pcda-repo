import React, { useContext } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import LeftBorderWithTitle from "../../LeftBorderWithTitle";
import { AccessibilityContext } from "../../../context/AccessibilityContext";
import { Link } from "react-router-dom";

const updateLists = [
  {
    id: "list1",
    item: "Latest Road Mileage Allowance",
    link: "https://pcdaopune.gov.in/downloads/newRMA.pdf",
  },
  {
    id: "list2",
    item: "Ceiling of Rs 5 Lakh on subscription to Defence Services Officers Provident (DSOP) Fund in Financial Year",
    link: "https://pcdaopune.gov.in/downloads/Dsop_message.pdf",
  },
  {
    id: "list3",
    item: "Handbook Pay and Allowances 2023",
    link: "https://pcdaopune.gov.in/downloads/newmessages/Handbook_Pay_and_Allowances_2023.pdf",
  },
  {
    id: "list4",
    item: "Tracking of Pension Document-list updated on 21-11-2024",
    link: "https://pcdaopune.gov.in/downloads/pensiondata.pdf",
  },
  {
    id: "list5",
    item: "Handbook Pay and Allowances 2023",
    link: "https://pcdaopune.gov.in/downloads/newmessages/Handbook_Pay_and_Allowances_2023.pdf",
  },
  {
    id: "list6",
    item: "Ceiling of Rs 5 Lakh on subscription to Defence Services Officers Provident (DSOP) Fund in Financial Year",
    link: "https://pcdaopune.gov.in/downloads/Dsop_message.pdf",
  },
];

function LatestLandingUpdateLists() {
  const accessibilityCtx = useContext(AccessibilityContext);
  return (
    <ScrollArea className="w-full min-w-[250px] max-w-[500px] bg-mainsecondarysecond p-9 gap-5 rounded-2xl">
      <div className="flex flex-col gap-5">
        <LeftBorderWithTitle
          textSize={`${accessibilityCtx.getFontSizeClass("text-xl")}`}
          title="Latest Updates"
        />
        <div className="w-full flex flex-col space-y-2 !rounded-none">
          {updateLists.map((item) => (
            <Link key={item.id} to={item.link} target="_blank" rel="noopener noreferrer">
              <p
                className={`text-secondaryGrey p-2 border-b-2 border-b-secondaryGrey m-0 underline underline-offset-2 ${accessibilityCtx.getFontSizeClass(
                  "text-base"
                )}`}
              >
                {item.item}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

export default LatestLandingUpdateLists;
