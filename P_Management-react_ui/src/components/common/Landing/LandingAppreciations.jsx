import React from "react";
import LeftBorderWithTitle from "../../LeftBorderWithTitle";
import { Quote } from "lucide-react";
import quoteIcon from "@/assets/icons/quotes.svg"
import appreciationsLetter from "@/assets/images/apperications_letter.svg"

function LandingAppreciations() {
  return (
    <div className="w-full flex flex-col space-y-6 bg-mainsecondarysecond px-custom py-36">
      <LeftBorderWithTitle
        textSize="text-base"
        title="Honored"
        className="text-mainprimarycolor"
      />
      <div className="w-full h-full flex justify-between ">
        <div className="w-1/2 h-full flex flex-col justify-between">
          <div className="flex flex-col gap-6 mb-12">
            <h4 className="text-3xl text-mainprimarycolor font-bold mb-9">
              Appreciations
            </h4>

            <p className="text-titleColor text-justify">
              Donec dictum tristique porta. Etiam convallis lorem lobortis nulla
              molestie, nec tincidunt ex ullamcorper. Quisque ultrices lobortis
              elit sed euismod. Duis in ultrices dolor, ac rhoncus odio.
              Suspendisse tempor sollicitudin dui sed lacinia. Nulla quis enim
              posuere, congue libero quis, commodo purus. Cras iaculis massa ut
              elit tempor malesuada. Pellentesque dictum elit quis diam
              tristique, sed tincidunt velit ullamcorper. Suspendisse potenti.
              Nam varius varius erat. Aliquam pulvinar elit ut orci egestas
              tincidunt. Morbi ornare orci ante, mollis posuere lacus accumsan
              sit amet. Cras ut dignissim ipsum.
            </p>
            <button
              type="button"
              className="flex items-center justify-center py-3 px-6 bg-statebluecolor text-white font-bold w-fit rounded-full"
            >
              See All
            </button>
          </div>

          <div className="flex space-x-6">
            <img src={quoteIcon} className="h-full" />
            <div className="flex flex-col space-y-3">
              <p className="text-[100px] text-mainprimarycolor font-bold leading-tight">
                2000+
              </p>
              <p className="text-mainprimarycolor font-bold">Appreciations</p>
            </div>
          </div>
        </div>

        <div className="w-1/2 h-full flex flex-row-reverse">
        <img src={appreciationsLetter} alt="Appreciations letter" className="w-auto h-auto max-h-full object-contain"/>
        </div>
      </div>
    </div>
  );
}

export default LandingAppreciations;
