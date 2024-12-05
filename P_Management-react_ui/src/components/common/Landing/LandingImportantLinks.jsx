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
import { Link } from 'react-router-dom'

const slides = [
 {
  id: 1,
  icon: nationalPortalLogo,
  icon2: nationalPortalInvertedLogo,
  link: 'https://www.india.gov.in/',
  title: 'India\'s National Portal',
 },
 {
  id: 2,
  icon: defenceLogo,
  icon2: defenceInvertedLogo,
  link: 'https://mod.gov.in/',
  title: 'Ministry of Defence',
 },
 {
  id: 3,
  icon: cgdaLogo,
  icon2: cgdaInvertedLogo,
  link: 'https://cgda.nic.in/',
  title: 'CGDA',
 },
 {
  id: 4,
  icon: pcdap,
  icon2: pcdapInvertedLogo,
  link: 'https://cgda.nic.in/',
  title: 'pcda(p)',
 },
 {
  id: 5,
  icon: emro,
  icon2: emroInvertedLogo,
  link: 'https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?corpID=80633',
  title: 'E-MRO',
 },
 {
  id: 6,
  icon: itr,
  icon2: itrInvertedLogo,
  link: 'https://incometaxindia.gov.in/pages/default.aspx',
  title: 'ITR',
 },
 {
  id: 7,
  icon: sheBoxLogo,
  icon2: sheBoxLogo,
  link: 'https://shebox.wcd.gov.in/',
  title: 'SHE-BOX',
 },
 {
  id: 8,
  icon: nationalPortalLogo,
  icon2: nationalPortalInvertedLogo,
  link: 'https://www.india.gov.in/',
  title: 'India\'s National Portal',
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
    {/*<div className={landingImportantLinkCSS["custom-swiper-container"]}>*/}
    {/*  <Swiper*/}
    {/*    slidesPerView={5}*/}
    {/*    spaceBetween={20}*/}
    {/*    navigation={true}*/}
    {/*    freeMode={true}*/}
    {/*    modules={[FreeMode, Navigation]}*/}
    {/*    loop={true}*/}
    {/*    autoplay={{ delay: 3000 }}*/}
    {/*    className={landingImportantLinkCSS["my-swiper"]}*/}
    {/*    onSwiper={(swiper) => (swiperRef.current = swiper)}*/}
    {/*  >*/}
    {/*    {slides.map((slide) => (*/}
    {/*      <SwiperSlide*/}
    {/*        key={slide.id}*/}
    {/*        className={landingImportantLinkCSS["my-slide"]}*/}
    {/*      >*/}
    {/*        <Link to={slide.link} target="_blank" rel="noopener noreferrer">*/}
    {/*          <LogoWithLinkCard*/}
    {/*            icon={slide.icon}*/}
    {/*            icon2={slide.icon2}*/}
    {/*            link={slide.link}*/}
    {/*            title={slide.title}*/}
    {/*          />*/}
    {/*        </Link>*/}
    {/*      </SwiperSlide>*/}
    {/*    ))}*/}
    {/*  </Swiper>*/}

    {/*  <button*/}
    {/*    className={landingImportantLinkCSS["custom-prev"]}*/}
    {/*    onClick={handlePrev}*/}
    {/*  >*/}
    {/*    <CaretLeft size={32} />*/}
    {/*  </button>*/}
    {/*  <button*/}
    {/*    className={landingImportantLinkCSS["custom-next"]}*/}
    {/*    onClick={handleNext}*/}
    {/*  >*/}
    {/*    <CaretRight size={32} />*/}
    {/*  </button>*/}
    {/*</div>*/}
    <div className="grid grid-cols-3 hd_screen:grid-cols-4 gap-6 h-[650px]">
     {slides.map((slide) => (
      <Link key={slide.id} to={slide.link} target="_blank" rel="noopener noreferrer">
       <LogoWithLinkCard
        icon={slide.icon}
        icon2={slide.icon2}
        link={slide.link}
        title={slide.title}
       />
      </Link>
     ))}
    </div>
   </div>
  </div>
 )

}

export default LandingImportantLinks
