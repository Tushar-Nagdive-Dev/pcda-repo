import React from "react";
import { Link, NavLink } from "react-router-dom";

function ButtonSideBar({ url, title, children, defaultPage }) {
  return (
    <>
      {url !== "#" ? (
        <NavLink
          to={url}
          className={({
            isActive,
          }) => `flex flex-row items-center px-4 py-3 font-raleway transition-all no-underline text-lg gap-2 ${
            isActive
              ? "bg-gradient-to-r from-gradientbtnsecondcolor to-gradientbtnfirstcolor text-white"
              : null
          }  group-data-[state=open]/collapsible:bg-gradient-to-r group-data-[state=open]/collapsible:from-gradientbtnsecondcolor group-data-[state=open]/collapsible:to-gradientbtnfirstcolor group-data-[state=open]/collapsible:text-white 
              hover:text-statebluecolor text-titleColor hover:font-bold`}
          end={title === defaultPage}
        >
          {children}
        </NavLink>
      ) : (
        <div
          // to={link}
          className={`flex flex-row items-center px-4 py-3 font-raleway transition-all no-underline text-lg gap-2  group-data-[state=open]/collapsible:bg-gradient-to-r group-data-[state=open]/collapsible:from-gradientbtnsecondcolor group-data-[state=open]/collapsible:to-gradientbtnfirstcolor group-data-[state=open]/collapsible:text-white 
                    hover:text-statebluecolor text-titleColor hover:font-bold`}
          // end={title === defaultPage}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default ButtonSideBar;
