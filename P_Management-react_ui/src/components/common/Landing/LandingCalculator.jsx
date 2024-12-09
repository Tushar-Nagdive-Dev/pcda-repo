import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import calculatorIcon from "@/assets/icons/calculator.svg";
import CalculatorCard from "./Calculator/CalculatorCard";
import CalculatorForm from './Calculator/CalculatorForm.jsx'

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
          className={`h-full flex bg-orangeIndiaForegroundColor justify-center items-center gap-10 py-5 px-10 cursor-pointer transition-all mr-6
            `}
          onClick={() => {
            setCurrentStage(1);
            setIsCheckedDisclaimer(false);
            setOpenCalculator(false);
          }}
        >
          <img src={calculatorIcon} alt="India's Logo" className="h-28 w-28" />
          <h3 className="text-orangeIndiaPrimaryColor text-2xl font-bold max-w-[300px]">
           Effect of option on pay at the time of promotion
          </h3>
        </div>
      </div>

      {/* Content Wing */}
      <div className=" w-3/4 ">
        <TransitionGroup component={null}>
          <CSSTransition key={currentStage} timeout={300}>
            {(state) => (
              <div
                style={{
                  ...transitionStyles[state],
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
                    <CalculatorForm />
                  </CalculatorCard>
                )}
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
