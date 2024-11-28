import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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

const contactusData = [
  {
    id: "cu1",
    title: "Office Of The Principal Controller of Defence Accounts (Officers)",
    contact_details: {
      office: {
        office_name:
          "Office of the Principal Controller of Defence Accounts (Officers)",
        office_address: "Golibar Maidan, Pune - 411 001.",
        fax: "(020) 2645-3446",
        website: "https://pcdaopune.gov.in",
      },
      timings: {
        pro_timing: {
          date: "Monday To Friday",
          timing: "08:30hr to 16:00Hr",
        },
        office_timing: {
          date: "Monday To Friday",
          timing: "09:30hr to 18:00Hr",
        },
      },
      contact_no: {
        name: "PCDAO(O) Exchange",
        pro_civil: "(020) 2640-1100",
        Army: "6512 / 6528 / 7756 / 7761 / 7762 / 7763",
      },
    },
  },
  {
    id: "cu2",
    title: "Details of Chief Vigilance Oficer (CVO) in DAD",
    contact_details: {
      person_name: "Shri. Rajesh Chandra",
      designation: "IDAS, JT CGDA & CVO",
      address: "Office Of The CGDA, Ulan Batar Road, Palam, Delhi Cantt-110010",
      telephone: "011-20893013",
      email: "chandra44e.dad@gov.in",
    },
  },
  {
    id: "cu3",
    title: "Details of Vigilance Officer (VO) in PCDA(O)",
    contact_details: {
      person_name: "Shri. Prakash Chandra",
      designation: "IDAS, Addl. CDA & VO",
      address: "Office Of The PCDA(O), Golibar Maidan, Pune-411011",
      telephone: "020-26401102",
      email: "chandraprakash.dad@hub.nic.in",
    },
  },
  {
    id: "cu4",
    title: "Army Pay And Allowances Contact Centre (APACC)",
    contact_details: {
      office: {
        office_name: "Army Pay And Allowances Contact Centre (APACC)",
        office_address: "At PCDA(O), Pune - 411 001",
      },
      person_name: "Lt. Col. Himani",
      designation: "Office-In-Charge",
      email: "ramkc.56566@gov.in",
      timings: {
          date: "Monday To Friday",
          timing: "(09:00hr to 13:30Hr) & (14:30Hr to 17:30hr)",
      },
      contact_no: {
        name: "For Serving Officers",
        ascon: "7275 & 7975",
        civ_landline: "(020) 2645-0691",
      },
    },
  },
];

function ContactUsSection() {
  const [currentStage, setCurrentStage] = React.useState(0);
  return (
    <div className="w-full h-full  flex px-custom my-12">
      <div className="w-2/6 h-full flex flex-col space-y-5">
        {contactusData.map((item, index) => (
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
                } text-2xl font-bold `}
              >
                {item.title}
              </h3>
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* Content Section */}
      <div className="relative w-auto">
        <TransitionGroup component={null}>
          <CSSTransition key={currentStage} timeout={300}>
            {(state) => (
              <>
                {/* {contactusData.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {currentStage === index && (
                      <div
                        style={{
                          ...transitionStyles[state],
                        }}
                        className={`p-10 ${
                          currentStage === index
                            ? index === 1
                              ? "bg-selectedSecondary rounded-lg"
                              : "bg-selectedSecondary rounded-r-lg rounded-b-lg"
                            : "bg-mainsecondarysecond rounded-lg"
                        }`}
                      >
                        <div className="flex gap-16">
                          <div className="w-full flex flex-col space-y-8 text-ternaryGrey font-medium">
                            <div className="w-full">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-[480px] w-full bg-cover rounded-lg"
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
                ))} */}
              </>
            )}
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
}

export default ContactUsSection;
