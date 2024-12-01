import React, { useContext } from "react";
import newicon from "@/assets/icons/new_icon.svg";
import { ScrollArea } from "@/components/ui/scroll-area";
import LeftBorderWithTitle from "../../LeftBorderWithTitle";
import { AccessibilityContext } from "../../../context/AccessibilityContext";
import { Link } from "react-router-dom";
import { CalendarDots } from "@phosphor-icons/react";

const updateLists = [
  {
    id: "list1",
    item: "Latest Road Mileage Allowance",
    link: "https://pcdaopune.gov.in/downloads/newRMA.pdf",
    isNew: true,
    date: "24 Nov 2024"
  },
  {
    id: "list2",
    item: "Tracking of Pension Document-list updated on 21-11-2024",
    link: "https://pcdaopune.gov.in/downloads/Dsop_message.pdf",
    isNew: true,
    date: "22 Nov 2024",
  },
  {
    id: "list3",
    item: "Handbook Pay and Allowances 2023",
    link: "https://pcdaopune.gov.in/downloads/newmessages/Handbook_Pay_and_Allowances_2023.pdf",
    date: "12 Oct 2024",
  },
  {
    id: "list4",
    item: "Ceiling of Rs 5 Lakh on subscription to Defence Services Officers Provident (DSOP) Fund in Financial Year",
    link: "https://pcdaopune.gov.in/downloads/pensiondata.pdf",
    date: "12 Oct 2024",
  },
  {
    id: "list5",
    item: "Handbook Pay and Allowances 2023",
    link: "https://pcdaopune.gov.in/downloads/newmessages/Handbook_Pay_and_Allowances_2023.pdf",
    date: "17 Sept 2023",
  },
  {
    id: "list6",
    item: "Ceiling of Rs 5 Lakh on subscription to Defence Services Officers Provident (DSOP) Fund in Financial Year",
    link: "https://pcdaopune.gov.in/downloads/Dsop_message.pdf",
    date: "21 May 2023",
  },
];

function LatestLandingUpdateLists() {
  const accessibilityCtx = useContext(AccessibilityContext);
  return (
    <ScrollArea className="w-full min-w-[350px] max-w-[420px] max-h-[700px] bg-mainsecondarysecond p-9 gap-5 rounded-2xl">
      <div className="flex flex-col gap-5 ">
        <LeftBorderWithTitle
          textSize={`${accessibilityCtx.getFontSizeClass("text-xl")}`}
          title="Latest Updates"
        />
        <div className="w-full flex flex-col space-y-2 !rounded-none overflow-y-auto">
          {updateLists.map((item) => (
            <div key={item.id} className="py-2 flex flex-col border-b-2 border-b-selectedSecondary">
              <div className="flex gap-1">
                {item?.isNew ? <img src={newicon} alt="New Message" /> : <div className="min-w-6 min-h-6 w-6 h-6"></div>}
                <Link to={item.link} target="_blank" rel="noopener noreferrer">
                  <p
                    className={`text-secondaryGrey p-2 m-0 ${accessibilityCtx.getFontSizeClass(
                      "text-base"
                    )}`}
                  >
                    {item.item}
                  </p>
                </Link>
              </div>

              <div className="w-full flex flex-row-reverse text-mainprimarycolor">
                <div className="flex items-center gap-2">
                  <CalendarDots size={24} />
                  <p className="text-mainprimarycolor">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

export default LatestLandingUpdateLists;
