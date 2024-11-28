import React from "react";
import pcdaoLogo from "../../../assets/logo/pcdao_logo.png";
import contactIcon from "../../../assets/icons/Union.png";
import { Globe, Printer } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import VisitorNoMessage from "./VisitorNoMessage";
import LastSectionFooter from "./LastSectionFooter";

const menuListOne = [
  { id: "privacy", name: "Privacy Policy", link: "#" },
  { id: "disclaimer", name: "Disclaimer", link: "#" },
  { id: "help", name: "Help", link: "#" },
  { id: "terms", name: "Terms & Conditions", link: "#" },
  { id: "accessibility", name: "Accessibility Statement", link: "#" },
  { id: "copyright", name: "Copyright Policy", link: "#" },
  { id: "contact", name: "Contact Us", link: "#" },
];

const menuListTwo = [
  { id: "rti", name: "RTI", link: "#" },
  { id: "organization-chart", name: "Organization Chart", link: "#" },
  { id: "downloads", name: "Downloads", link: "#" },
  { id: "feedback", name: "Feedback", link: "#" },
  { id: "profile", name: "Profile", link: "#" },
  { id: "new-schemes", name: "New Schemes", link: "#" },
];

function Footer() {
  return (
    <>
      <footer>
        <div className="h-full bg-mainprimarysecondcolor text-white px-custom py-8">
          <div className="flex flex-row space-x-8">
            <div className="flex flex-1 flex-col space-y-4 min-w-[350px]">
              <img
                src={pcdaoLogo}
                alt="PCDAO\'s logo"
                height={60}
                className="w-44 h-auto"
              />
              <p className="w-full flex flex-wrap">
                Lorem ipsum dolor sit amet consectetur. Urna placerat leo nam
                ullamcorper elit sapien quam. Consectetur lectus non senectus
                dui malesuada. Read More
              </p>

              <div>
                <div className="w-fit h-full bg-statebluecolor px-5 relative  rounded-2xl">
                  <img
                    src={contactIcon}
                    className="w-[55px] h-[58px] max-w-[55px] absolute top-0 -left-2"
                  />
                  <div className="w-full h-full flex flex-col">
                    <p className="p-0 m-0 leading-0">Helpline</p>
                    <p className="font-bold leading-0 p-0 m-0">
                      (020) 2640-1100
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col space-y-2 min-w-[500px]">
              <h2 className="text-xl font-bold">
                Office of the Principal Controller
              </h2>
              <h2 className="text-xl font-bold">
                of Defence Accounts (Officers)
              </h2>
              <p className="w-full my-3">Golibar Maidan, Pune - 411 001.</p>

              <div className="w-full h-full flex flex-col gap-3">
                <div className="flex h-fit flex-row gap-3 items-center">
                  <div className="w-9 h-9 rounded-full bg-statebluecolor flex justify-center items-center">
                    <Printer size={24} color="#ffffff" />
                  </div>
                  <p className="p-0 m-0"> Fax: (020) 2645-3446</p>
                </div>
                <div className="flex h-fit flex-row gap-3 items-center">
                  <div className="w-9 h-9 rounded-full bg-statebluecolor flex justify-center items-center">
                    <Globe size={24} color="#ffffff" />
                  </div>
                  <p className="p-0 m-0">
                    {" "}
                    Website: https://pcdaopune[dot]gov[dot]in
                  </p>
                </div>
              </div>
            </div>
            <div className="flex shrink flex-col space-y-2 text-wrap">
              <div className="h-full flex flex-row gap-20">
                <ul className="flex flex-col space-y-3 list-disc">
                  {menuListOne.map((item) => (
                    <Link
                      key={item.id}
                      to={item.link}
                      className="text-footermenulistcolor no-underline"
                    >
                      <li>{item.name}</li>
                    </Link>
                  ))}
                </ul>
                <ul className="flex flex-col space-y-3 list-disc">
                  {menuListTwo.map((item) => (
                    <Link
                      key={item.id}
                      to={item.link}
                      className="text-footermenulistcolor no-underline"
                    >
                      <li>{item.name}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <VisitorNoMessage />
        </div>
        <LastSectionFooter />
      </footer>
    </>
  );
}

export default Footer;
