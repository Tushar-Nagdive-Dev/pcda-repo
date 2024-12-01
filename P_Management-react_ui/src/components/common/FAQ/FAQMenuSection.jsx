import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Button } from "@/components/ui/button";

const navbarMenuList = [
  {
    id: "m1",
    title: "Ledger Wing",
  },
  {
    id: "m2",
    title: "Travelling Allowances",
  },
  {
    id: "m3",
    title: "Ration Money Allowance",
  },
  {
    id: "m4",
    title: "R&H Allowance",
  },
  {
    id: "m5",
    title: "Rent Section",
  },
  {
    id: "m6",
    title: "Selected Place of Residence (SPR)",
  },
  {
    id: "m7",
    title: "e-MRO",
  },
];

function FAQMenuSection({ currentTab, setCurrentTab }) {
  return (
    <div className="w-full flex">
      <div className="flex items-center h-full">
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
