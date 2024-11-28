import React from "react";
import TitleWithInfo from "../components/common/Downloads/TitleWithInfo";
import TitleWithLinkCard from "../components/common/TitleWithLinkCard";
import { Separator } from "@/components/ui/separator";
import LinkWithTitleCard from "../components/common/LinkWithTitleCard";
import {
  checklistsDownloadLinkLists,
  circularsDownloadLinkLists,
  downloadlists,
  LedgerChecklistsDownloadLinkLists,
  ledgerDownloadLinkLists,
  LedgerWingContactDetails,
  transportationContactDetails,
} from "../components/common/Downloads/downloadLinkDummyData";
import ContactDetailsCard from "../components/common/ContactDetailsCard";
import Breadcrumbs from "../components/common/Breadcrumbs";

function Downloads() {
  return (
    <div className="space-y-10 pb-20">
      <Breadcrumbs title="Downloads" />
      <div className="px-custom py-14 w-full h-full space-y-5">
        {/* <h3 className="text-xl text-center">Downloads</h3> */}
        <div className="flex flex-col gap-10">
          {/* Transportation Wing */}
          <div className="flex flex-col space-y-10">
            <TitleWithInfo
              title="Transportation Wing"
              subtitle="Transportation Wing deals with Audit and Payment of Personal Claims for Temporary Duty, Leave Travel Concession, Permanent Posting, Courses, etc."
            />
            <div className="grid grid-cols-3 gap-6 h-full">
              <TitleWithLinkCard title="Circulars">
                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                  {circularsDownloadLinkLists.map((item) => (
                    <LinkWithTitleCard
                      key={item.id}
                      title={item.name}
                      link={item.link}
                    />
                  ))}
                </ul>
              </TitleWithLinkCard>
              <TitleWithLinkCard title="Checklist">
                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                  {checklistsDownloadLinkLists.map((item) => (
                    <LinkWithTitleCard
                      key={item.id}
                      title={item.name}
                      link={item.link}
                    />
                  ))}
                </ul>
              </TitleWithLinkCard>
              <TitleWithLinkCard title="Contact Details">
                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                  {transportationContactDetails.map((item) => (
                    <ContactDetailsCard
                      key={item.id}
                      person_name={item.person_name}
                      contact_number={item.number}
                      role={item.rank}
                    />
                  ))}
                </ul>
                <ul className="list-disc list-inside">
                  <li className="text-orangeIndiaPrimaryColor font-bold">
                    Note: To Contact SAO/AO of the concerned Section,kindly
                    visit RTI page.
                  </li>
                </ul>
              </TitleWithLinkCard>
            </div>

            <Separator className="my-4 h-1" />
          </div>

          {/* Ledger Wing */}
          <div className="flex flex-col space-y-10">
            <TitleWithInfo
              title="Ledger Wing"
              subtitle="Ledger wing section maintains the IRLAs of all the Officers for prompt and correct authorization of the Pay and Allowances."
            />
            <div className="grid grid-cols-3 gap-6 h-full">
              <TitleWithLinkCard title="Circulars">
                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                  {ledgerDownloadLinkLists.map((item) => (
                    <LinkWithTitleCard
                      key={item.id}
                      title={item.name}
                      link={item.link}
                    />
                  ))}
                </ul>
              </TitleWithLinkCard>
              <TitleWithLinkCard title="Checklist">
                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                  {LedgerChecklistsDownloadLinkLists.map((item) => (
                    <LinkWithTitleCard
                      key={item.id}
                      title={item.name}
                      link={item.link}
                    />
                  ))}
                </ul>
              </TitleWithLinkCard>
              <TitleWithLinkCard title="Contact Details">
                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                  {LedgerWingContactDetails.map((item) => (
                    <ContactDetailsCard
                      key={item.id}
                      person_name={item.person_name}
                      contact_number={item.number}
                      role={item.rank}
                    />
                  ))}
                </ul>
                <ul className="list-disc list-inside">
                  <li className="text-orangeIndiaPrimaryColor font-bold">
                    Note: To Contact SAO/AO of the concerned Section,kindly
                    visit RTI page.
                  </li>
                </ul>
              </TitleWithLinkCard>
            </div>

            <Separator className="my-4 h-1" />
          </div>

          {/* Downloads */}
          <div className="w-full grid grid-cols-1 gap-6 h-full">
            <TitleWithLinkCard title="Downloads">
              <ul className="grid grid-cols-2 gap-3 list-disc list-inside overflow-y-auto">
                {downloadlists.map((item) => (
                  <LinkWithTitleCard
                    key={item.id}
                    title={item.title}
                    link={item.link}
                  />
                ))}
              </ul>
            </TitleWithLinkCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Downloads;
