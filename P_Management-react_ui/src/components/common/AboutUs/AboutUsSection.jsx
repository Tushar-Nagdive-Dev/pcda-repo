import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import pcdaoTeam from "@/assets/images/pcdao_team.jpg";
import pcdaoStaffSpeech from "@/assets/images/speech.png";
import pcdaoStaff from "@/assets/images/pcdao_staff_2.jpg";
import indiaCountryMap from "@/assets/icons/india_country_map.svg";

const transitionStyles = {
  entering: { opacity: 0.5 },
  entered: {
    opacity: 1,
    transition: "opacity 300ms ease-in",
  },
  exiting: { opacity: 0 },
  exited: {
    opacity: 1,
    transition: "opacity 300ms ease-in",
  },
};

const aboutusData = [
  {
    id: "ab1",
    title: "About PCDA (O)",
    image: pcdaoTeam,
    description:
      "Welcome to the Principal Controller of Defence Accounts (PCDA) (O), a distinguished arm of the Defence Accounts Department (DAD), dedicated to managing the pay and allowances of Indian Army officers. Under the leadership of the Controller General of Defence Accounts (CGDA), we ensure the accurate and timely processing of all pay-related matters, including basic pay, allowances, and entitlements, in accordance with government regulations. Our responsibilities extend to managing various allowances such as house rent, travel, and special compensatory allowances, ensuring that each officer receives their rightful dues without delay. At the PCDA(O), precision, accountability, and service excellence are at the core of our operations. We are committed to maintaining comprehensive pay records and providing transparent, efficient financial management. By supporting Army officers with timely compensation, we contribute directly to their welfare, morale, and operational readiness. With decades of experience, we continue to uphold a legacy of reliable service to the Armed Forces, helping ensure that officers can focus on their mission of safeguarding the nation.",
  },
  {
    id: "ab2",
    title: "Message From PCDA (O)",
    image: pcdaoStaffSpeech,
    description: `It was with a great sense of honour & privilege that I took over the charge of PCDA(O) in the month of July 2022. There has been some delay in posting my first message here to you all. The Office of PCDA(O) is responsible for the correct and timely disbursement of Pay & Allowances of all Army Officers serving throughout the length and breadth of our immense country. I wanted to understand a little of the vast scope of its functioning and the problems facing it before posting my first message here.
I have completed over five months in this Office. I now have first hand experience of its day-to-day functioning. In order to get a better idea of its working and various issues I have also paid visits to different Army stations like Mhow, Chandimandir, Meerut, Ambala and ARTRAC, Shimla and interacted with Officers posted there. I have realized that the majority of problems in the correct and timely disbursement of Pay & Allowances arise from the misinterpretation of rules both by my Office as also by the Officers submitting the claims.
I have also attended a few retirement seminars held at Army HQrs, New Delhi to better understand the issues faced by retiring Officers. One of the main problems is that of huge recoveries from retirement benefits due to the delayed issue of Part II Orders and delayed Review of the IRLAs. This process has to be streamlined at both ends.
In these five (05) months it has been my humble endeavour to take certain steps to improve the functioning of this Office and reduce the number of grievances. The following are some of the
initiatives taken at our end :

a. Stepping up of Pay has been carried out for 3,520 cases of Army Officers in the month of April 2022 on our own.
b. A list of 2,449 cases pertaining to 5th and 6th CPC Anomaly has been prepared and we are ready to re-fix as per Court Judgement and the same will be adjusted as and when Order for implementation is received.
c. Leave statement is being made available in December 2022 Statement of Account.
d. DSOP Fund Statement will be made available to all Officers including Officers on Deputation in the month of April 2023.
e. SPARSH Centre opened at 0/0 PCDA(O) Pune to facilitate pensioners to submit their Life Certificate. Huge response received with approx 150 pensioners visiting this Office everyday throughout November 2022.
I have had the privilege of having a very long tenure of over 10 years as IFA with the Army. During my field visits as IFA I came to fully appreciate the fact that our brave Officers often serve our country in the most difficult of terrains and conditions involving great risk to themselves and great hardship for their families. Hence, it will always be my earnest endeavour to ensure that their Pay & Allowances are disbursed correctly and timely with minimum inconvenience to them. In an Office like this it can never be possible that there will be no pending grievances but I can assure you that no effort will be spared either by me or my team to ensure that these grievances are dispensed with, expeditiously and positively and they remain at the minimum level.
I also sincerely hope to receive your co-operation and support in achieving this objective.
Wishing everyone a very Happy New Year 2023.
!! Jai Hind !!
Jajn
(SANJAY KUMAR SINGH) Pr. Controller`,
  },
  {
    id: "ab3",
    title: "History of PCDA (O)",
    image: pcdaoStaff,
    description:
      "The Principal Controller of Defence Accounts (Officers) originated as the Military Accounts Department during British colonial rule. After India's independence in 1947, it was restructured and formally established as PCDA(O), with its headquarters in Allahabad (now Prayagraj), Uttar Pradesh. Initially focused on managing military officers' accounts, the organization has evolved from manual accounting to digital operations. Today, PCDA(O) functions under the Ministry of Defence, Government of India, providing comprehensive financial services including pension management, medical benefits, and other entitlements for defence personnel.",
  },
  {
    id: "ab4",
    title: "Organization Chart",
    image: pcdaoTeam,
    description: "",
  },
];

function AboutUsSection() {
  const [currentStage, setCurrentStage] = React.useState(0);
  return (
    <div className="w-full h-full  flex px-custom my-12">
      <div className="h-full flex flex-col space-y-5">
        {aboutusData.map((item, index) => (
          <React.Fragment key={item.id}>
            <div
              className={`flex  text-titleColor  items-center gap-14 py-10 px-10 cursor-pointer transition-all  ${
                currentStage !== index
                  ? "mr-4 bg-mainsecondarysecond rounded-lg"
                  : "bg-selectedSecondary rounded-l-lg"
              }`}
              onClick={() => setCurrentStage(index)}
            >
              <h3
                className={`${
                  currentStage !== index
                    ? `text-titleColor`
                    : `text-statebluecolor`
                } text-2xl font-bold max-w-[300px]`}
              >
                {item.title}
              </h3>
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* Content Section */}
      <div className="relative w-3/4">
        <TransitionGroup component={null}>
          <CSSTransition key={currentStage} timeout={300}>
            {(state) => (
              <>
                {aboutusData.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {currentStage === index && (
                      <div
                        style={{
                          ...transitionStyles[state],
                        }}
                        className={`p-10 ${
                          currentStage === index
                            ? index === 1 ? "bg-selectedSecondary rounded-lg" : "bg-selectedSecondary rounded-r-lg rounded-b-lg"
                            : "bg-mainsecondarysecond rounded-lg"
                        }`}
                      >
                        <div className="flex gap-16">
                          <div className="w-full flex flex-col space-y-8 text-ternaryGrey font-medium">
                            <div className="w-full">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-[480px] w-full object-cover rounded-lg"
                              />
                            </div>
                            <p className="max-h-[250px] overflow-y-auto text-justify">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
}

export default AboutUsSection;
