import React from "react";
import { Link, NavLink } from "react-router-dom";

function ButtonSideBar({ link, title, icon, currentSection }) {
  const ButtonIcon = icon;
  return (
      <NavLink
        to={link}
        className={({ isActive }) =>
          `px-6 py-3 font-raleway transition-all no-underline flex items-center text-xl gap-2 ${
            isActive
              ? "bg-gradient-to-r from-gradientbtnsecondcolor to-gradientbtnfirstcolor text-white hover:!text-white hover:!font-normal"
              : ""
          }  hover:text-statebluecolor text-titleColor hover:font-bold`
        }
        end={title === currentSection}
      >
        <ButtonIcon size={25} />
        {title}
      </NavLink>
  );
}

export default ButtonSideBar;
