import React from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import TitleWithInfo from "../components/common/Downloads/TitleWithInfo";
import TitleWithLinkCard from "../components/common/TitleWithLinkCard";
import { Separator } from "@/components/ui/separator";
import LinkWithTitleCard from "../components/common/LinkWithTitleCard";
import { recordSectionLinkLists, recordSectionContactDetails, PROSectionLinkLists, PROSectionContactDetails, RetiredOfficerSectionLinkLists, RetiredOfficerContactDetails } from "../components/common/Section/sectionData";
import ContactDetailsCard from "../components/common/ContactDetailsCard";

function Sections() {
  return (
    <div>
      <Breadcrumbs title="Sections" />
      <div className="px-custom py-14 w-full h-full">
        <div className="flex flex-col space-y-10">
          {/* Record Section */}
          <TitleWithInfo
            title="Record Section"
            subtitle="Record Section deals with receipt of dak/sorting, distribution to concerned sections and dispatch of all dak through the post. Record Section deals with receipt of dak/sorting, distribution to concerned sections and dispatch of all dak through the post. Record Section deals with receipt of dak/sorting, distribution to concerned sections and dispatch of all dak through the post. Record Section deals with receipt of dak/sorting, distribution to concerned sections and dispatch of all dak through the post."
          />
          <div className="grid grid-cols-3 gap-6 h-full">
            <div className="col-span-2">
              <TitleWithLinkCard title="Important Points">
                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                  {recordSectionLinkLists.map((item) => (
                    <LinkWithTitleCard
                      key={item.id}
                      title={item.name}
                      link={item.link}
                    />
                  ))}
                </ul>
              </TitleWithLinkCard>
            </div>
            <TitleWithLinkCard title="Contact Details">
              <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                {recordSectionContactDetails.map((item) => (
                    <ContactDetailsCard
                      key={item.id}
                      person_name={item.person_name}
                      contact_number={item.number}
                      role={item.rank}
                    />
                  ))}
              </ul>
              <ul className="list-disc list-inside">
                <li className="text-orangeIndiaPrimaryColor font-bold mt-6">
                  Note: To Contact SAO/AO of the concerned Section,kindly visit
                  RTI page.
                </li>
              </ul>
            </TitleWithLinkCard>
          </div>

          <Separator className="my-4 h-1" />

          {/* PRO Section */}
          <TitleWithInfo
            title="PRO Section"
            subtitle="PRO section is a help desk for receiving the Army Officers and settling their queries, directing the officers to the concerned AOs/AAOs of the section where the queries can not be settled at the desk."
          />
          <div className="grid grid-cols-3 gap-6 h-full">
            <div className="col-span-2">
              <TitleWithLinkCard title="Important Points">
                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                  {PROSectionLinkLists.map((item) => (
                    <LinkWithTitleCard
                      key={item.id}
                      title={item.name}
                      link={item.link}
                    />
                  ))}
                </ul>
              </TitleWithLinkCard>
            </div>
            <TitleWithLinkCard title="Contact Details">
              <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                {PROSectionContactDetails.map((item) => (
                    <ContactDetailsCard
                      key={item.id}
                      person_name={item.person_name}
                      contact_number={item.number}
                      role={item.rank}
                    />
                  ))}
              </ul>
              <ul className="list-disc list-inside">
                <li className="text-orangeIndiaPrimaryColor font-bold mt-6">
                  Note: To Contact SAO/AO of the concerned Section,kindly visit
                  RTI page.
                </li>
              </ul>
            </TitleWithLinkCard>
          </div>

          <Separator className="my-4 h-1" />

          {/* Retired Officer Section */}
          <TitleWithInfo
            title="Retired Officer Section"
            subtitle="Post Superannuation Cell (PSC) deals with queries correspondence of officers after finalisation of account."
          />
          <div className="grid grid-cols-3 gap-6 h-full">
            <div className="col-span-2">
              <TitleWithLinkCard title="Important Points">
                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                  {RetiredOfficerSectionLinkLists.map((item) => (
                    <LinkWithTitleCard
                      key={item.id}
                      title={item.name}
                      link={item.link}
                    />
                  ))}
                </ul>
              </TitleWithLinkCard>
            </div>
            <TitleWithLinkCard title="Contact Details">
              <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                {RetiredOfficerContactDetails.map((item) => (
                    <ContactDetailsCard
                      key={item.id}
                      person_name={item.person_name}
                      contact_number={item.number}
                      role={item.rank}
                    />
                  ))}
              </ul>
              <ul className="list-disc list-inside">
                <li className="text-orangeIndiaPrimaryColor font-bold mt-6">
                  Note: To Contact SAO/AO of the concerned Section,kindly visit
                  RTI page.
                </li>
              </ul>
            </TitleWithLinkCard>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default Sections;
