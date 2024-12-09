import React, {useMemo, useState} from 'react'
import {CSSTransition, TransitionGroup} from "react-transition-group";

import TitleWithInfo from '../components/common/Downloads/TitleWithInfo'
import TitleWithLinkCard from '../components/common/TitleWithLinkCard'
import {Separator} from '@/components/ui/separator'
import {Button} from "@/components/ui/button";
import {Input} from '../components/ui/input.jsx'
import LinkWithTitleCard from '../components/common/LinkWithTitleCard'

import {
    checklistsDownloadLinkLists,
    circularsDownloadLinkLists,
    downloadlists,
    LedgerChecklistsDownloadLinkLists,
    ledgerDownloadLinkLists,
    LedgerWingContactDetails,
    transportationContactDetails,
} from '../components/common/Downloads/downloadLinkDummyData'

import ContactDetailsCard from '../components/common/ContactDetailsCard'
import Breadcrumbs from '../components/common/Breadcrumbs'
import {MagnifyingGlass} from '@phosphor-icons/react'

/* Search Bar Functionality and their helper function */
const debounce = (func, delay) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(...args)
        }, delay)
    }
}

/* Menu Tabs lists */
const navbarMenuList = [{
    id: "m1", title: "Ledger Wing",
}, {
    id: "m2", title: "Transportation Wing",
}, {
    id: "m3", title: "Central Wing",
},];

function Downloads() {
    // Search Bar handler
    const [searchTerm, setSearchTerm] = useState('')
    const [currentTab, setCurrentTab] = useState('Ledger Wing');
    const [debouncedSearch, setDebouncedSearch] = useState('')

    // Debounced input handler
    const handleSearch = debounce((value) => {
        setDebouncedSearch(value)
    }, 300)

    // Memoized filtered list
    const filteredLists = useMemo(() => {
        return downloadlists.filter((item) => item.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
    }, [debouncedSearch])

    return (<div className="space-y-10 pb-20">
        <Breadcrumbs title="Downloads"/>
        <div className="px-custom py-14 w-full h-full space-y-10">
            {/* Button */}
            <div className="w-full flex">
                <div className="flex items-center h-full w-full">
                    <TransitionGroup component={null}>
                        {navbarMenuList.map((item) => (<CSSTransition
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
                        </CSSTransition>))}
                    </TransitionGroup>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-10">
                {/* Ledger Wing */}
                {currentTab === 'Ledger Wing' && (
                    <div className="flex flex-col space-y-10">
                        <TitleWithInfo
                            title="Ledger Wing"
                            subtitle="Ledger wing section maintains the IRLAs of all the Officers for prompt and correct authorization of the Pay and Allowances."
                        />
                        <div className="grid grid-cols-3 gap-6 h-full">
                            <TitleWithLinkCard title="Govt. Orders / MoD Order">
                                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                                    {ledgerDownloadLinkLists.map((item) => (
                                        <LinkWithTitleCard key={item.id} title={item.name} link={item.link}/>))}
                                </ul>
                            </TitleWithLinkCard>
                            <TitleWithLinkCard title="Checklist">
                                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                                    {LedgerChecklistsDownloadLinkLists.map((item) => (
                                        <LinkWithTitleCard key={item.id} title={item.name} link={item.link}/>))}
                                </ul>
                            </TitleWithLinkCard>
                            <TitleWithLinkCard title="Contact Details">
                                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                                    {LedgerWingContactDetails.map((item) => (<ContactDetailsCard
                                        key={item.id}
                                        person_name={item.person_name}
                                        contact_number={item.number}
                                        role={item.rank}
                                    />))}
                                </ul>
                                <ul className="list-disc list-inside">
                                    <li className="text-orangeIndiaPrimaryColor font-bold">
                                        Note: To Contact SAO/AO of the concerned Section,kindly visit RTI
                                        page.
                                    </li>
                                </ul>
                            </TitleWithLinkCard>
                        </div>

                        <Separator className="my-4 h-1"/>
                    </div>
                )}

                {/* Transportation Wing */}
                {currentTab === 'Transportation Wing' && (
                    <div className="flex flex-col space-y-10">
                        <TitleWithInfo
                            title="Transportation Wing"
                            subtitle="Transportation Wing deals with Audit and Payment of Personal Claims for Temporary Duty, Leave Travel Concession, Permanent Posting, Courses, etc."
                        />
                        <div className="grid grid-cols-3 gap-6 h-full">
                            <TitleWithLinkCard title="Govt. Orders/MoD Order">
                                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                                    {circularsDownloadLinkLists.map((item) => (
                                        <LinkWithTitleCard key={item.id} title={item.name} link={item.link}/>))}
                                </ul>
                            </TitleWithLinkCard>
                            <TitleWithLinkCard title="Checklist">
                                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                                    {checklistsDownloadLinkLists.map((item) => (
                                        <LinkWithTitleCard key={item.id} title={item.name} link={item.link}/>))}
                                </ul>
                            </TitleWithLinkCard>
                            <TitleWithLinkCard title="Contact Details">
                                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                                    {transportationContactDetails.map((item) => (<ContactDetailsCard
                                        key={item.id}
                                        person_name={item.person_name}
                                        contact_number={item.number}
                                        role={item.rank}
                                    />))}
                                </ul>
                                <ul className="list-disc list-inside">
                                    <li className="text-orangeIndiaPrimaryColor font-bold">
                                        Note: To Contact SAO/AO of the concerned Section,kindly visit RTI
                                        page.
                                    </li>
                                </ul>
                            </TitleWithLinkCard>
                        </div>

                        <Separator className="my-4 h-1"/>
                    </div>
                )}

                {/* Central Wing */}
                {currentTab === 'Central Wing' && (
                    <div className="flex flex-col space-y-10">
                        <TitleWithInfo title="Central Wing" subtitle=""/>
                        <div className="grid grid-cols-3 gap-6 h-full">
                            <TitleWithLinkCard title="Govt. Orders/MoD Order">
                                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                                    {circularsDownloadLinkLists.map((item) => (
                                        <LinkWithTitleCard key={item.id} title={item.name} link={item.link}/>))}
                                </ul>
                            </TitleWithLinkCard>
                            <TitleWithLinkCard title="Checklist">
                                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                                    {checklistsDownloadLinkLists.map((item) => (
                                        <LinkWithTitleCard key={item.id} title={item.name} link={item.link}/>))}
                                </ul>
                            </TitleWithLinkCard>
                            <TitleWithLinkCard title="Contact Details">
                                <ul className="list-disc space-y-2 list-inside overflow-y-auto">
                                    {transportationContactDetails.map((item) => (<ContactDetailsCard
                                        key={item.id}
                                        person_name={item.person_name}
                                        contact_number={item.number}
                                        role={item.rank}
                                    />))}
                                </ul>
                                <ul className="list-disc list-inside">
                                    <li className="text-orangeIndiaPrimaryColor font-bold">
                                        Note: To Contact SAO/AO of the concerned Section,kindly visit RTI
                                        page.
                                    </li>
                                </ul>
                            </TitleWithLinkCard>
                        </div>

                        <Separator className="my-4 h-1"/>
                    </div>
                )}

                {/* Downloads */}
                <div className="flex flex-row-reverse w-full">
                    <div className="w-fit flex gap-2">
                        <Input
                            type="text"
                            placeholder="Search"
                            onChange={(e) => handleSearch(e.target.value)}
                            className="rounded-2xl h-full border-none bg-adminBreadCrumbsBg w-[350px] max-w-[450px]"
                        />
                        {/* <button className="rounded-full text-white bg-mainprimarycolor p-3">
        <MagnifyingGlass size={20} />
       </button> */}
                    </div>
                </div>
                <div className="w-full grid grid-cols-1 gap-6 h-full">
                    <TitleWithLinkCard title="Downloads">
                        <ul className="grid grid-cols-2 gap-3 list-disc list-inside overflow-y-auto">
                            {filteredLists.map((item) => (
                                <LinkWithTitleCard key={item.id} title={item.title} link={item.link}/>))}
                        </ul>
                    </TitleWithLinkCard>
                </div>
            </div>
        </div>
    </div>)
}

export default Downloads
