import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import pcdaoLogo from "../../../assets/logo/pcdao_hd.png";
import defenceLogo from "../../../assets/logo/defence_account_logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { CaretDown, MagnifyingGlass, SignIn } from "@phosphor-icons/react";
import headerClass from "./Header.module.css";
import "@/App.css";

const navbarMenuList = [
  {
    id: "m1",
    title: "Home",
    link: "/",
    isSubmenu: false,
  },
  {
    id: "m2",
    title: "About Us",
    link: "/about-us",
    isSubmenu: true,
  },
  {
    id: "m3",
    title: "Sections",
    link: "/sections",
    isSubmenu: false,
  },
  {
    id: "m4",
    title: "News & Events",
    link: "/news-and-events",
    isSubmenu: false,
  },
  {
    id: "m5",
    title: "Download",
    link: "/download",
    isSubmenu: false,
  },
  {
    id: "m6",
    title: "RTI",
    link: "/rti",
    isSubmenu: false,
  },
  {
    id: "m7",
    title: "FAQ",
    link: "/faq",
    isSubmenu: false,
  },
  {
    id: "m8",
    title: "Contact Us",
    link: "/contact-us",
    isSubmenu: false,
  },
];

function MainHeader() {
  const navigate = useNavigate();
  return (
    <nav
      className="navbar navbar-expand-lg px-custom"
      style={{ paddingTop: "0.8rem", paddingBottom: "0.8rem", width: "100%" }}
    >
      <div
        className="flex items-center justify-between gap-6"
        style={{ width: "100%" }}
      >
        <div className="w-full flex flex-row items-center justify-between gap-8">
          <img
            alt="PCDA(O)'s logo"
            src={pcdaoLogo}
            height="70"
            className="inline-block w-56"
          />{" "}
          <div className="flex gap-5 items-center">
            <div className="flex items-center h-full">
              <TransitionGroup component={null}>
                {navbarMenuList.map((item) => (
                  <CSSTransition
                    key={item.id}
                    timeout={300}
                    classNames="navLink"
                    unmountOnExit
                  >
                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "!bg-primary  !text-white" : ""}`
                      }
                      end={item.title === "Home"}
                    >
                      {item.title}
                    </NavLink>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
          </div>
          {/* logout button */}
          <div className="flex gap-3 h-fit items-center">
            <div className="hover:bg-selectedSecondary transition-all rounded-full p-2 h-fit">
              <MagnifyingGlass
                size={28}
                className="rounded-full text-adminTextColor "
              />
            </div>
            <button
              onClick={() => navigate("/login")}
              className="flex gap-2 px-7 py-3 bg-loginButtonPrimary hover:bg-loginButtonHover text-white rounded-3xl h-fit"
            >
              {" "}
              Login <SignIn size={22} color="#ffffff" />
            </button>
          </div>
          <img
            alt="PCDA(O)'s logo"
            src={defenceLogo}
            height="70"
            className=" h-24"
          />{" "}
        </div>

        {/* <div style={{ display: "flex", gap: "1.2rem" }} className="h-14">
          <img
            alt="Azadi's Logo"
            src={azadiLogo}
            width="90"
            height="55"
            className="inline-block h-full"
          />{" "}
          <img
            alt="G20's logo"
            src={g20logo}
            width="90"
            height="55"
            className="inline-block h-full"
          />{" "}
          <img
            alt="Defence's logo"
            src={defenceLogo}
            width="75"
            height="55"
            className="inline-block h-full"
          />{" "}
        </div> */}
      </div>
    </nav>
  );
}

export default MainHeader;
