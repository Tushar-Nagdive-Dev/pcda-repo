import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactUsInlineTitleAndContent from "./ContactUsInlineTitleAndContent";
import ContactUsTitleAndContent from "./ContactUsTitleAndContent";

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
      <div className="w-1/2 h-full flex flex-col space-y-5">
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
      <div className="relative w-full">
        <TransitionGroup component={null}>
          <CSSTransition key={currentStage} timeout={300}>
            {(state) => (
              <>
                {/* Office of The Principal Controller of Defence Accounts (Officers)*/}
                {currentStage === 0 && (
                  <div
                    style={{
                      ...transitionStyles[state],
                    }}
                    className={`h-full p-10 ${
                      currentStage !== 0
                        ? "bg-selectedSecondary rounded-lg"
                        : "bg-selectedSecondary rounded-r-lg rounded-b-lg"
                    }`}
                  >
                    <div className="flex flex-col space-y-6">
                      <div className="flex flex-col gap-2">
                        <p className="text-mainprimarycolor font-bold text-xl">
                          Office Of The Principal Controller Of Defence Accounts
                          (Officers)
                        </p>
                        <p className="text-mainprimarycolor text-lg">
                          Golibar Maidan, Pune - 411 001
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <ContactUsInlineTitleAndContent
                          title="Fax"
                          info="(020) 2645-3446"
                        />
                        <ContactUsInlineTitleAndContent
                          title="Website"
                          info="https://pcdaopune.gov.in"
                        />
                      </div>

                      <p className="text-mainprimarycolor font-bold text-lg">
                        PCDA(O) Exchange
                      </p>

                      <div className="flex flex-col gap-2">
                        <ContactUsInlineTitleAndContent
                          title="Pro Civil"
                          info="(020) 2640-1100"
                        />
                        <ContactUsInlineTitleAndContent
                          title="Army"
                          info="https://pcdaopune.gov.in"
                        />
                      </div>

                      <p className="text-mainprimarycolor font-bold text-lg">
                        Timings
                      </p>

                      <div className="flex flex-col gap-2">
                        <ContactUsInlineTitleAndContent
                          bigtitle="Timings"
                          title="PRO Timing"
                          info="Monday To Friday (08:30hr to 16:00Hr)"
                        />
                        <ContactUsInlineTitleAndContent
                          title="Office Timing"
                          info="(09:30hr to 18:00Hr)"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Details of Chief Vigilance Officer (CVO) in DAD*/}
                {currentStage === 1 && (
                  <div
                    style={{
                      ...transitionStyles[state],
                    }}
                    className={`h-full p-10 ${
                      currentStage === 1
                        ? "bg-selectedSecondary rounded-lg"
                        : "bg-selectedSecondary rounded-r-lg rounded-b-lg"
                    }`}
                  >
                    <div className="flex flex-col space-y-4">
                      <ContactUsTitleAndContent
                        title="Shri. Rajesh Chandra"
                        info="IDAS, Jt.CGDA & CVO"
                      />

                      <ContactUsTitleAndContent
                        title="Address"
                        info="Office Of The CGDA, Ulan Batar Road, Palam, Delhi Cantt-110010"
                      />

                      <ContactUsTitleAndContent
                        title="Telephone"
                        info="011-20893013"
                      />

                      <ContactUsTitleAndContent
                        title="Email"
                        info="chandra44e.dad@gov.in"
                      />
                    </div>
                  </div>
                )}

                {/* Details of Vigilance Officer (VO) in PCDA(O)*/}
                {currentStage === 2 && (
                  <div
                    style={{
                      ...transitionStyles[state],
                    }}
                    className={`h-full p-10 ${
                      currentStage === 1
                        ? "bg-selectedSecondary rounded-lg"
                        : "bg-selectedSecondary rounded-r-lg rounded-b-lg"
                    }`}
                  >
                    <div className="flex flex-col space-y-4">
                      <ContactUsTitleAndContent
                        title="Shri. Prakash Chandra"
                        info="IDAS, Addl. CDA & VO"
                      />

                      <ContactUsTitleAndContent
                        title="Address"
                        info="Office Of The PCDA(O), Golibar Maidan, Pune-411011"
                      />

                      <ContactUsTitleAndContent
                        title="Telephone"
                        info="020-26401102"
                      />

                      <ContactUsTitleAndContent
                        title="Email"
                        info="chandraprakash.dad@hub.nic.in"
                      />
                    </div>
                  </div>
                )}

                {/* Details of Aramy Pay And Allowances Contact Centre (APACC)*/}
                {currentStage === 3 && (
                  <div
                    style={{
                      ...transitionStyles[state],
                    }}
                    className={`h-full p-10 ${
                      currentStage === 1
                        ? "bg-selectedSecondary rounded-lg"
                        : "bg-selectedSecondary rounded-r-lg rounded-b-lg"
                    }`}
                  >
                    <div className="flex flex-col space-y-6">
                      <div className="flex flex-col gap-2">
                        <p className="text-mainprimarycolor font-bold text-xl">
                          Army Pay And Allowances Contact Centre (APACC)
                        </p>
                        <p className="text-mainprimarycolor text-lg">
                          At PCDA(O), Pune - 411 001.
                        </p>
                      </div>
                      <ContactUsTitleAndContent
                        title="Lt. Col. Himani"
                        info="Office-In-Charge"
                      />

                      <ContactUsTitleAndContent
                        title="Email"
                        info="ramkc.56566@gov.in"
                      />

                      <div className="w-full grid grid-cols-2">
                        <div className="flex flex-col space-y-2">
                          <p className="text-mainprimarycolor font-bold text-xl">
                            For Serving Officers
                          </p>
                          <ContactUsInlineTitleAndContent
                            title="ASCON"
                            info="7275 & 7975"
                          />
                          <ContactUsInlineTitleAndContent
                            title="Civ Landline"
                            info="(020) 2645-0691"
                          />
                        </div>

                        <div className="flex flex-col space-y-2">
                          <p className="text-mainprimarycolor font-bold text-xl">
                            For Retired Officers
                          </p>
                          <ContactUsInlineTitleAndContent
                            title="Mobile No."
                            info="9309781033"
                          />
                          <ContactUsInlineTitleAndContent
                            title="Civ Landline"
                            info="(020) 2997-0971"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-4">
                        <p className="text-mainprimarycolor font-bold text-xl">
                          Timings
                        </p>
                        <ContactUsTitleAndContent
                          title="Monday to Friday"
                          info="(09:00hr to 13:30Hr) & (14:30Hr to 17:30hr)"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
}

export default ContactUsSection;
