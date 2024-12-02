import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import calculatorIcon from "@/assets/icons/calculator.svg";
import CalculatorCard from "./Calculator/CalculatorCard";

const transitionStyles = {
  entering: { opacity: 0.5 },
  entered: {
    opacity: 1,
    transition: "opacity 300ms ease-in",
  },
  exiting: { opacity: 0.5 },
  exited: {
    opacity: 1,
    transition: "opacity 300ms ease-in",
  },
};

function LandingCalculator() {
  const [currentStage, setCurrentStage] = React.useState(1);
  const [isCheckedDisclaimer, setIsCheckedDisclaimer] = React.useState(false);
  const [openCalculator, setOpenCalculator] = React.useState(false);
  return (
    <div className="w-full flex h-full">
      <div className="flex flex-col gap-6">
        <div
          className={`h-full flex bg-orangeIndiaForegroundColor justify-center items-center gap-14 py-5 px-10 cursor-pointer transition-all mr-6
            `}
          onClick={() => {
            setCurrentStage(1);
            setIsCheckedDisclaimer(false);
            setOpenCalculator(false);
          }}
        >
          <img src={calculatorIcon} alt="India's Logo" className="h-24 w-24" />
          <h3 className="text-orangeIndiaPrimaryColor text-xl font-bold max-w-[300px]">
            Option Calculator For Fixation on Promotion in 7th CPC
          </h3>
        </div>

        {/* <div
          className={`flex bg-blueIndiaForegroundColor  justify-center items-center gap-14 py-5 px-10 cursor-pointer transition-all  ${
            currentStage !== 2 ? "mr-4" : null
          }`}
          onClick={() => setCurrentStage(2)}
        >
          <img src={indiaSignOne} alt="India's Logo" className="h-24 w-24" />
          <h3 className="text-statebluecolor text-xl font-bold max-w-[300px]">
            Interactive Tools and Calculators
          </h3>
        </div> */}

        {/*<div*/}
        {/*  className={`flex bg-greenIndiaForegroundColor justify-center items-center gap-14 py-5 px-10 cursor-pointer transition-all  ${currentStage !== 2 ? "mr-4" : null*/}
        {/*    }`}*/}
        {/*  onClick={() => {*/}
        {/*    setCurrentStage(2);*/}
        {/*    setIsCheckedDisclaimer(false);*/}
        {/*    setOpenCalculator(false);*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <img src={indiaCountryMap} alt="India's Logo" className="h-24 w-24" />*/}
        {/*  <h3 className="text-greenIndiaPrimaryColor text-lg font-bold max-w-[300px]">*/}
        {/*    Switchover Pay Calculator*/}
        {/*  </h3>*/}
        {/*</div>*/}
      </div>

      {/* Content Section */}
      <div className=" w-3/4 ">
        <TransitionGroup component={null}>
          <CSSTransition key={currentStage} timeout={300}>
            {(state) => (
              <div
                style={{
                  ...transitionStyles[state],
                  // position: "absolute",
                  // width: "100%",
                  // height: "100%",
                  // top: 0,
                  // left: 0,
                }}
                className={`p-10 ${currentStage === 1
                  ? "bg-orangeIndiaForegroundColor"
                  : currentStage === 2
                    ? "bg-greenIndiaForegroundColor"
                    : null
                  }`}
              >
                {currentStage === 1 && (
                  <CalculatorCard
                    className={"bg-darkOrange"}
                    title="CALCULATOR DEVELOPED BY PCDA(O) FOR PAY FIXATION ON
                        PROMOTION IN 7TH CPC"
                    info_one=" In order to facilitate the Army Officers to ascertain their pay on
            promotion under different options i.e. (i) from date of promotion
            and, (ii) from date of their next increment in lower rank, and to
            enable them to exercise suitable option, a Pay Calculator has been
            developed by this Office. This Pay Calculator is available below on
            experimental basis. The Officer concerned may fill in the relevent
            data to decide the most beneficial option for submitting separately
            to PCDA(O) in the prescribed fromat within the stipulated time
            limit. The option once exercised is final."
                    info_two=" Comments and suggestions to improve the above Pay Calculator further
            with regard to its user friendliness and accuracy may be sent at
            email id generalquery-pcdaopune [at] nic [dot] in. The final version
            of Pay Calculator will be made available thereafter."
                    isCheckedDisclaimer={isCheckedDisclaimer}
                    setIsCheckedDisclaimer={setIsCheckedDisclaimer}
                    openCalculator={openCalculator}
                    setOpenCalculator={setOpenCalculator}
                  >
                    Form Components
                  </CalculatorCard>
                )}

                {/*{currentStage === 2 && (*/}
                {/*  <CalculatorCard*/}
                {/*    title_bg_color="darkGreenTitle"*/}
                {/*    title="Pay Rules/Regulations, 2017 for Army, MNS Officers & equivalents:- Opportunity for revision of Option to come over to revised Pay Structure."*/}
                {/*    info_one="Personnel of Army/MNS Officers who were promoted/financially upgraded between 01.01.2016 and the date of Notification of Pay Rules by this Ministry i.e. 03.05.2017 and who have been requesting for re-exercising of option to switch over to the 7th CPC structure shall be permitted to re-exercise their option in terms of Rules 5 & 6 thereof. The revised option shall be exercised within a period of one hundred and eighty days i.e. 19/11/2023 from the date of issue of this letter. The option exercised in terms of these orders shall be final and shall not be liable to any further change under any circumstances. All other terms and conditions laid down in the Said Rules 5 & 6 of Pay Rules/Regulations 2017 shall continue to be applicable."*/}
                {/*    info_two="Comments and suggestions to improve the above Pay Calculator further with regard to its user friendliness and accuracy may be sent at email id generalquery-pcdaopune [at] nic [dot] in . The final version of Pay Calculator will be made available thereafter."*/}
                {/*    isCheckedDisclaimer={isCheckedDisclaimer}*/}
                {/*    setIsCheckedDisclaimer={setIsCheckedDisclaimer}*/}
                {/*    openCalculator={openCalculator}*/}
                {/*    setOpenCalculator={setOpenCalculator}*/}
                {/*  >*/}
                {/*    Form Components*/}
                {/*  </CalculatorCard>*/}
                {/*)}*/}

              </div>
            )}
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
}

export default LandingCalculator;

{
  /* <TransitionGroup>
          
          {currentStage === 1 && (
            <CSSTransition key={1} timeout={300}>
              {(state) => (
                <div
                  className="bg-orangeIndiaForegroundColor px-10 py-20"
                  style={transitionStyles[state] || {}}
                >
                  <div className="flex gap-16">
                    <div className=" flex flex-col space-y-3 text-orangeIndiaPrimaryColor">
                      <h3 className="text-3xl font-bold">
                        Interactive Financial Tools
                      </h3>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Augue ut ornare
                        volutpat tincidunt magnis elit purus sed. Sit imperdiet
                        eros a nibh aenean dignissim. Tellus amet ipsum mauris
                        id tellus posuere posuere. Sit tristique euismod cursus
                        aliquet integer quis sit feugiat proin. Egestas elit
                        volutpat nulla aliquam molestie. Duis et lorem
                        condimentum eu dolor in. Aliquam et pulvinar vitae
                        tristique arcu neque hendrerit. Dolor diam fringilla ac
                        molestie nec. Consectetur feugiat semper leo dignissim
                        aenean ut amet. Viverra purus volutpat risus netus morbi
                        facilisis.
                      </p>
                    </div>
                    <div className="w-full">
                      <img
                        src={indiaSignLogo}
                        alt="India's Sign Logo"
                        className="h-[290px]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CSSTransition>
          )}

        
          {currentStage === 2 && (
            <CSSTransition key={2} timeout={300}>
              {(state) => (
                <div
                  className="bg-blueIndiaForegroundColor px-10 py-20"
                  style={transitionStyles[state] || {}}
                >
                  <div className="flex gap-16">
                    <div className=" flex flex-col space-y-3 text-statebluecolor">
                      <h3 className="text-3xl font-bold">
                        Interactive Tools and calculators
                      </h3>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Augue ut ornare
                        volutpat tincidunt magnis elit purus sed. Sit imperdiet
                        eros a nibh aenean dignissim. Tellus amet ipsum mauris
                        id tellus posuere posuere. Sit tristique euismod cursus
                        aliquet integer quis sit feugiat proin. Egestas elit
                        volutpat nulla aliquam molestie. Duis et lorem
                        condimentum eu dolor in. Aliquam et pulvinar vitae
                        tristique arcu neque hendrerit. Dolor diam fringilla ac
                        molestie nec. Consectetur feugiat semper leo dignissim
                        aenean ut amet. Viverra purus volutpat risus netus morbi
                        facilisis.
                      </p>
                    </div>
                    <div className="w-full">
                      <img
                        src={indiaSignOne}
                        alt="India's Sign Logo"
                        className="h-[290px]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CSSTransition>
          )}

          
          {currentStage === 3 && (
            <CSSTransition key={3} timeout={300}>
              {(state) => (
                <div
                  className="bg-greenIndiaForegroundColor px-10 py-20"
                  style={transitionStyles[state] || {}}
                >
                  <div className="flex gap-16">
                    <div className=" flex flex-col space-y-3 text-greenIndiaPrimaryColor">
                      <h3 className="text-3xl font-bold">
                        Interactive Tools and calculators
                      </h3>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Augue ut ornare
                        volutpat tincidunt magnis elit purus sed. Sit imperdiet
                        eros a nibh aenean dignissim. Tellus amet ipsum mauris
                        id tellus posuere posuere. Sit tristique euismod cursus
                        aliquet integer quis sit feugiat proin. Egestas elit
                        volutpat nulla aliquam molestie. Duis et lorem
                        condimentum eu dolor in. Aliquam et pulvinar vitae
                        tristique arcu neque hendrerit. Dolor diam fringilla ac
                        molestie nec. Consectetur feugiat semper leo dignissim
                        aenean ut amet. Viverra purus volutpat risus netus morbi
                        facilisis.
                      </p>
                    </div>
                    <div className="w-full">
                      <img
                        src={indiaCountryMap}
                        alt="India's Sign Logo"
                        className="h-[290px]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CSSTransition>
          )}
        </TransitionGroup> */
}
