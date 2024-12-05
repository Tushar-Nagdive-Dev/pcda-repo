import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import pcdaoLogo from '../../../assets/logo/pcdao_hd.png'
import defenceLogo from '../../../assets/logo/defence_account_logo.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CaretDown, MagnifyingGlass, SignIn } from '@phosphor-icons/react'
import headerClass from './Header.module.css'
import '@/App.css'

const navbarMenuList = [
 {
  id: 'm1',
  title: 'Home',
  link: '/',
  isSubmenu: false,
 },
 {
  id: 'm2',
  title: 'About Us',
  link: '/about-us',
  isSubmenu: true,
 },
 {
  id: 'm3',
  title: 'Wings',
  link: '#',
  isSubmenu: true,
  submenu: [
   {
    id: 'sm1',
    title: 'Ledger Wing',
    link: '/wings/ledger',
   },
   {
    id: 'sm2',
    title: 'Transportation Wing',
    link: '/wings/transportation',
   },
   {
    id: 'sm3',
    title: 'Central Wing',
    link: '/wings/central',
   },
  ],
 },
 {
  id: 'm4',
  title: 'RTI',
  link: '/rti',
  isSubmenu: false,
 },
 {
  id: 'm5',
  title: 'News & Events',
  link: '/news-and-events',
  isSubmenu: false,
 },
 {
  id: 'm6',
  title: 'Download',
  link: '/download',
  isSubmenu: false,
 },
 {
  id: 'm7',
  title: 'FAQ',
  link: '/faq',
  isSubmenu: false,
 },
 {
  id: 'm8',
  title: 'Contact Us',
  link: '/contact-us',
  isSubmenu: false,
 },
]

function MainHeader() {
 const navigate = useNavigate()
 const location = useLocation()

 console.log(location.pathname + ' ' + '/wings/transportation')

 return (
  <nav
   className="px-custom"
   style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', width: '100%' }}
  >
   <div
    className="max-w-[1920px]  flex items-center justify-between gap-6"
    style={{ width: '100%' }}
   >
    <div className="w-full flex flex-row items-center justify-between gap-8">
     <img
      alt="PCDA(O)'s logo"
      src={pcdaoLogo}
      height="70"
      className="inline-block lg:w-36 xl:w-52 hd_screen:w-60 full_hd_screen:w-80"
     />{' '}
     <div className="flex gap-5 items-center">
      <div className="flex items-center h-full">
       {/*<TransitionGroup component={null}>*/}
       {/* {navbarMenuList.map((item) => (*/}
       {/*  <CSSTransition*/}
       {/*   key={item.id}*/}
       {/*   timeout={300}*/}
       {/*   classNames="navLink"*/}
       {/*   unmountOnExit*/}
       {/*  >*/}
       {/*   <NavLink*/}
       {/*    to={item.link}*/}
       {/*    className={({ isActive }) =>*/}
       {/*     `nav-link ${isActive ? '!bg-newprimaryColor  !text-white' : ''}`*/}
       {/*    }*/}
       {/*    end={item.title === 'Home'}*/}
       {/*   >*/}
       {/*    {item.title}*/}
       {/*   </NavLink>*/}
       {/*  </CSSTransition>*/}
       {/* ))}*/}
       {/*</TransitionGroup>*/}
       <TransitionGroup component={null}>
        {navbarMenuList.map((item) => {
         if (item.isSubmenu && item.submenu) {
          // Render dropdown for submenu items
          const isActiveSubmenu = item.submenu.some(
           (subItem) => location.pathname === subItem.link,
          )
          return (
           <CSSTransition
            key={item.id}
            timeout={300}
            classNames="nav-dropdown"
            unmountOnExit
           >
            <DropdownMenu>
             <DropdownMenuTrigger className={`nav-link flex gap-1 items-center ${
              isActiveSubmenu ? '!bg-newprimaryColor !text-white' : ''
             }`}>
              {item.title} <CaretDown size={20} className={`${isActiveSubmenu ? 'text-white' : ''}`} />
             </DropdownMenuTrigger>
             <DropdownMenuContent>
              {item.submenu.map((subItem) => (
               <DropdownMenuItem
                key={subItem.id}
                asChild // Use NavLink inside DropdownMenuItem
               >
                <NavLink
                 to={subItem.link}
                 className={({ isActive }) =>
                  `dropdown-link ${
                   location.pathname === subItem.link ? '!bg-newprimaryColor !text-white' : ''
                  }`
                 }
                >
                 {subItem.title}
                </NavLink>
               </DropdownMenuItem>
              ))}
             </DropdownMenuContent>
            </DropdownMenu>
           </CSSTransition>
          )
         } else {
          // Render standard nav items
          return (
           <CSSTransition
            key={item.id}
            timeout={300}
            classNames="navLink"
            unmountOnExit
           >
            <NavLink
             to={item.link}
             className={({ isActive }) =>
              `nav-link ${isActive ? '!bg-newprimaryColor  !text-white' : ''}`
             }
             end={item.title === 'Home'}
            >
             {item.title}
            </NavLink>
           </CSSTransition>
          )
         }
        })}
       </TransitionGroup>
      </div>
     </div>
     {/* logout button */}
     <div className="flex gap-8 h-fit items-center">
      <button
       onClick={() => navigate('/login')}
       className="flex gap-2 md:px-4 xl:text-sm hd_screen:text-base xl:px-6 py-3 bg-loginButtonPrimary hover:bg-loginButtonHover text-white rounded-3xl h-fit"
      >
       {' '}
       Login <SignIn size={22} color="#ffffff" />
      </button>
      <img
       alt="PCDA(O)'s logo"
       src={defenceLogo}
       height="70"
       className=" h-20 lg:h-24"
      />{' '}
     </div>

    </div>
   </div>
  </nav>
 )
}

export default MainHeader
