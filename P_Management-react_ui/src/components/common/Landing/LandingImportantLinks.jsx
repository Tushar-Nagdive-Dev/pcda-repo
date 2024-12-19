import React, { useRef } from 'react'
import LeftBorderWithTitle from '../../LeftBorderWithTitle'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import landingImportantLinkCSS from './LandingImportantLinks.module.css'

// import required modules
import { FreeMode, Navigation } from 'swiper/modules'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

import nationalPortalLogo from '@/assets/icons/india_national_portal.svg'
import nationalPortalInvertedLogo from '@/assets/icons/india_national_portal_inverted_color.svg'
import defenceLogo from '@/assets/icons/goverment_of_defence.svg'
import defenceInvertedLogo from '@/assets/icons/goverment_of_defence_invert_color.svg'
import cgdaLogo from '@/assets/icons/CGDA.svg'
import cgdaInvertedLogo from '@/assets/icons/CGDA_inverted.svg'
import pcdap from '@/assets/icons/pcdap.svg'
import pcdapInvertedLogo from '@/assets/icons/pcdap_inverted.svg'
import emro from '@/assets/icons/e-mro.svg'
import emroInvertedLogo from '@/assets/icons/e-MRO_inverted.svg'
import itr from '@/assets/icons/ITR.svg'
import itrInvertedLogo from '@/assets/icons/ITR_inverted.svg'
import sheBoxLogo from '@/assets/icons/she_box.png'
import LogoWithLinkCard from './ImportantLinks/LogoWithLinkCard'
import ebookLogo from '@/assets/icons/ebook.png'
import ebookPdf from '@/assets/docs/Handbook_Pay_and_Allowances_2023.pdf'
import { Link } from 'react-router-dom'
import EBOOKModal from './EBOOKModal'

const slides = [
 {
  id: 1,
  icon: defenceLogo,
  icon2: defenceInvertedLogo,
  link: 'https://mod.gov.in/',
  title: 'Ministry of Defence',
 },
 {
  id: 2,
  icon: cgdaLogo,
  icon2: cgdaInvertedLogo,
  link: 'https://cgda.nic.in/',
  title: 'CGDA',
 },
 {
  id: 3,
  icon: pcdap,
  icon2: pcdapInvertedLogo,
  link: 'https://cgda.nic.in/',
  title: 'pcda(p)',
 },
 {
  id: 4,
  icon: emro,
  icon2: emroInvertedLogo,
  link: 'https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?corpID=80633',
  title: 'E-MRO',
 },
 {
  id: 5,
  icon: itr,
  icon2: itrInvertedLogo,
  link: 'https://incometaxindia.gov.in/pages/default.aspx',
  title: 'ITR',
 },
 {
  id: 6,
  icon: sheBoxLogo,
  icon2: sheBoxLogo,
  link: 'https://shebox.wcd.gov.in/',
  title: 'SHE-BOX',
 },
 {
  id: 7,
  icon: pcdap,
  icon2: pcdapInvertedLogo,
  link: 'sparsh',
  title: 'Sparsh',
 },
 {
  id: 8,
  icon: ebookLogo,
  icon2: ebookLogo,
  link: ebookPdf,
  title: 'E-BOOK',
 },
]

function LandingImportantLinks() {
 const swiperRef = useRef(null)

 const handleNext = () => {
  if (swiperRef.current) {
   swiperRef.current.slideNext()
  }
 }

 const handlePrev = () => {
  if (swiperRef.current) {
   swiperRef.current.slidePrev()
  }
 }
 return (
  <div className="w-full px-custom pt-24 pb-28  bg-adminCard mt-16">
   <div className="w-full flex flex-col space-y-6">
    <LeftBorderWithTitle
     textSize="text-base"
     title="Principal Controller of Defence Accounts (Officers)"
     className="text-newprimaryColor font-semibold text-lg"
    />
    <h4 className={`text-3xl text-mainprimarycolor font-bold`}>
     Important Links
    </h4>
    <div className="grid grid-cols-3 hd_screen:grid-cols-4 gap-6 h-[600px] max-h-[650px]">
     {slides.map((slide) => (
      <React.Fragment>
       {slide.title === 'E-BOOK' ? (
        <EBOOKModal pdf={slide.link}>
         <LogoWithLinkCard
          icon={slide.icon}
          icon2={slide.icon2}
          link={slide.link}
          title={slide.title}
         />
        </EBOOKModal>
       ) : (
        <Link
         key={slide.id}
         to={slide.link}
         target="_blank"
         rel="noopener noreferrer"
         className='h-full'
        >
         <LogoWithLinkCard
          icon={slide.icon}
          icon2={slide.icon2}
          link={slide.link}
          title={slide.title}
         />
        </Link>
       )}
      </React.Fragment>
     ))}
    </div>
   </div>
  </div>
 )
}

export default LandingImportantLinks
