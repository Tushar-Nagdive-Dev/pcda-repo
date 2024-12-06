import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Button } from "@/components/ui/button";

const navbarMenuList = [
  {
    id: "1",
    title: "Ledger Wing",
  },
  {
    id: "2",
    title: "Transportation Wing",
  },
  {
    id: "3",
    title: "Central Wing",
  },
];

function FAQMenuSection({ currentTab, setCurrentTab }) {
  return (
    <div className="w-full flex">
      <div className="flex items-center h-full w-full">
        <TransitionGroup component={null}>
          {navbarMenuList.map((item) => (
            <CSSTransition
              key={item.id}
              timeout={300}
              classNames="navLink"
              unmountOnExit
            >
              <Button
                variant={currentTab === item.title ? "default" : "hover"}
                size="lg"
                onClick={() => setCurrentTab(item.title)}
                className="w-full h-16 text-lg"
              >
                {item.title}
              </Button>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
}

export default FAQMenuSection;
