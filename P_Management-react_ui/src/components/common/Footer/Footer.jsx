import React from 'react'
import pcdaoLogo from '../../../assets/logo/pcdao_logo.png'
import contactIcon from '../../../assets/icons/Union.png'
import {Globe, Phone, Printer} from '@phosphor-icons/react'
import {Link} from 'react-router-dom'
import VisitorNoMessage from './VisitorNoMessage'
import LastSectionFooter from './LastSectionFooter'

const menuListOne = [{
    title: 'Pages',
    menu_list: [{id: 'about', name: 'About Us', link: 'about-us'}, {id: 'rti', name: 'RTI', link: 'rti'}, {
        id: 'news', name: 'News & Events', link: 'news-and-events'
    }, {id: 'download', name: 'Download', link: 'download'}, {id: 'faq', name: 'FAQ', link: 'faq'}, {
        id: 'contact_us', name: 'Contact Us', link: 'contact-us'
    },],
},]

const menuListTwo = [{
    title: 'Wings', menu_list: [{id: 'ledger', name: 'Ledger Wing', link: 'wings/ledger'}, {
        id: 'transportation', name: 'Transportation Wing', link: 'wings/transportation'
    }, {id: 'central', name: 'Central Wing', link: 'wings/central'},],
},
]

function Footer() {
    return (<>
        <footer>
            <div className="h-full bg-newprimaryColor text-white px-custom py-8">
                <div className="flex flex-row hd_screen:space-x-10 full_hd_screen:space-x-14">
                    <div className="flex flex-col space-y-4">

                        <div className="flex gap-2 items-center">
                            <img
                                src={pcdaoLogo}
                                alt="PCDAO\'s logo"
                                height={60}
                                className="w-72 h-fit"
                            />
                            <p className="w-full flex flex-wrap h-fit text-justify">
                                The PCDA (O) is an abbreviation for the Principal Controller of Defence Accounts
                                (Officers). It is a
                                organization under the Ministry of Defence, Government of India, responsible for
                                handling the pension and other
                                related matters of Defence Service Personnel.
                            </p>
                        </div>

                        <div className="flex flex-1 flex-col space-y-2 w-full">
                            <h2 className="text-xl font-semibold">
                                Office of the Principal Controller of Defence Accounts (Officers)
                            </h2>
                            <p className="w-full my-3">Golibar Maidan, Pune - 411 001.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="w-full h-full flex flex-col gap-3">
                                <p className="text-xl text-[#0099FF]">Fax & Website</p>
                                <div className="flex h-fit flex-row gap-3 items-center">
                                    <div className="w-9 h-9 rounded-full bg-white flex justify-center items-center">
                                        <Printer size={24} color="#fffff"/>
                                    </div>
                                    <p className="p-0 m-0"> Fax: (020) 2645-3446</p>
                                </div>
                                <div className="flex h-fit flex-row gap-3 items-center">
                                    <div className="w-9 h-9 rounded-full bg-white flex justify-center items-center">
                                        <Globe size={24} color="#fffff"/>
                                    </div>
                                    <p className="p-0 m-0">
                                        {' '}
                                        Website: https://pcdaopune[dot]gov[dot]in
                                    </p>
                                </div>
                            </div>

                            <div className="w-full h-full flex flex-col gap-3">
                                <p className="text-xl text-[#0099FF]">PCDA(O) Exchange</p>
                                <div className="flex h-fit flex-row gap-3 items-center">
                                    <div className="w-9 h-9 rounded-full bg-white flex justify-center items-center">
                                        <Phone size={24} color="#fffff"/>
                                    </div>
                                    <p className="p-0 m-0"> PRO CIVIL: (020) 2645-3446</p>
                                </div>
                                <div className="flex h-fit flex-row gap-3 items-center">
                                    <div className="w-9 h-9 rounded-full bg-white flex justify-center items-center">
                                        <Phone size={24} color="#fffff"/>
                                    </div>
                                    <p className="p-0 m-0">
                                        {' '}
                                        ARMY: (020) 2645-3446
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>


                    {/*<div className="flex flex-1 flex-col space-y-2 min-w-[500px]">*/}
                    {/*  <h2 className="text-xl font-bold">*/}
                    {/*    Office of the Principal Controller*/}
                    {/*  </h2>*/}
                    {/*  <h2 className="text-xl font-bold">*/}
                    {/*    of Defence Accounts (Officers)*/}
                    {/*  </h2>*/}
                    {/*  <p className="w-full my-3">Golibar Maidan, Pune - 411 001.</p>*/}

                    {/*  <div className="w-full h-full flex flex-col gap-3">*/}
                    {/*    <div className="flex h-fit flex-row gap-3 items-center">*/}
                    {/*      <div className="w-9 h-9 rounded-full bg-statebluecolor flex justify-center items-center">*/}
                    {/*        <Printer size={24} color="#ffffff" />*/}
                    {/*      </div>*/}
                    {/*      <p className="p-0 m-0"> Fax: (020) 2645-3446</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="flex h-fit flex-row gap-3 items-center">*/}
                    {/*      <div className="w-9 h-9 rounded-full bg-statebluecolor flex justify-center items-center">*/}
                    {/*        <Globe size={24} color="#ffffff" />*/}
                    {/*      </div>*/}
                    {/*      <p className="p-0 m-0">*/}
                    {/*        {" "}*/}
                    {/*        Website: https://pcdaopune[dot]gov[dot]in*/}
                    {/*      </p>*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                    <div
                        className="min-w-[350px] lg:min-w-[400px] full_hd_screen::min-w-[500px] flex flex-col items-end space-y-2 text-wrap">
                        <div className="h-full flex flex-row gap-20">
                            <ul className="flex flex-col space-y-3">
                                {menuListOne.map((item) => (<React.Fragment key={item.title}>
                                    <p className="text-[#0099FF]">{item.title}</p>
                                    {item.menu_list.map(subMenuItem => (<Link
                                        key={subMenuItem.id}
                                        to={subMenuItem.link}
                                        className="text-footermenulistcolor no-underline"
                                    >
                                        <li>{subMenuItem.name}</li>
                                    </Link>))}
                                </React.Fragment>))}
                            </ul>
                            <ul className="flex flex-col space-y-3">
                                {menuListTwo.map((item) => (<React.Fragment key={item.title}>
                                    <p className="text-[#0099FF]">{item.title}</p>
                                    {item.menu_list.map(subMenuItem => (<Link
                                        key={subMenuItem.id}
                                        to={subMenuItem.link}
                                        className="text-footermenulistcolor no-underline"
                                    >
                                        <li>{subMenuItem.name}</li>
                                    </Link>))}
                                </React.Fragment>))}
                            </ul>
                        </div>
                    </div>
                </div>

     <VisitorNoMessage />
    </div>
    <LastSectionFooter />
   </footer>
  </>
 )
}

export default Footer
