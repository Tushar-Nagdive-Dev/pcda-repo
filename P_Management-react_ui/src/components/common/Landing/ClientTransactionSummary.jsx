import React from "react";

const summaryLists = [
  {
    id: "summary1",
    number: "+24,567",
    title_one: "Monthly Pay",
    title_two: "Transactions",
  },
  {
    id: "summary2",
    number: "+15,304",
    title_one: "Pensions",
    title_two: "Payments",
  },
  {
    id: "summary3",
    number: "+8,912",
    title_one: "Allowance",
    title_two: "Adjustments",
  },
  {
    id: "summary4",
    number: "+1,294",
    title_one: "DSOP Fund",
    title_two: "Submissions",
  },
  {
    id: "summary5",
    number: "+1,698",
    title_one: "RTI Requests",
    title_two: "Filed",
  },
];

function ClientTransactionSummary() {
  return (
    <div className="w-full bg-mainsecondarysecond px-[50px] py-8 rounded-sm">
      <div className="flex flex-row text-right w-full">
        {summaryLists.map((item, index) => (
          <div
            key={item.id}
            className={`w-full flex justify-center ${
              index !== summaryLists.length - 1
                ? "border-r-4 border-r-borderSecondaryColor"
                : ""
            }`}
          >
            <div>
              <h3 className="text-[42px] font-bold text-newprimaryColor">
                {item.number}
              </h3>
              <div>
                <p className="text-titleColor p-0 m-0">{item.title_one}</p>
                <p className="text-titleColor p-0 m-0">{item.title_two}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientTransactionSummary;
