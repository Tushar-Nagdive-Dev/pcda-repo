import React from "react";
import Header from "../components/common/Header/Header";
import { Outlet, useLocation, useOutlet } from "react-router-dom";
import Footer from "../components/common/Footer/Footer";
import { CSSTransition, SwitchTransition } from "react-transition-group";

function RootLayout() {
  const location = useLocation();
  const currentOutlet = useOutlet();

  // Animation classes for transitions
  const nodeRef = React.useRef(null);

  return (
    <>
      <Header />
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={300}
          classNames="page"
          unmountOnExit
        >
          <div ref={nodeRef} className="page">
            {currentOutlet}
          </div>
        </CSSTransition>
      </SwitchTransition>
      <Footer />
    </>
  );
}

export default RootLayout;
