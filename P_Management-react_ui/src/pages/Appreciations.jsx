import React, { useEffect, useState } from 'react'
import LeftBorderWithTitle from '../components/LeftBorderWithTitle'
import Breadcrumbs from '../components/common/Breadcrumbs'
import AppreciationsImageCard from '../components/common/Appreciations/AppreciationsImageCard'
import { appreciationsData } from '../components/common/Appreciations/AppreciationsData'

const ITEMS_PER_LOAD = 8 // Number of images to load at a time

function Appreciations() {
 const [visibleItems, setVisibleItems] = useState(ITEMS_PER_LOAD)

 // Load more items when scrolling to the bottom
 const handleScroll = () => {
  if (
   window.innerHeight + document.documentElement.scrollTop >=
   document.documentElement.offsetHeight - 10
  ) {
   setVisibleItems((prev) =>
    Math.min(prev + ITEMS_PER_LOAD, appreciationsData.length)
   )
  }
 }

 useEffect(() => {
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
 }, [])

 return (
  <div className="space-y-10 pb-20">
   <Breadcrumbs title="Appreciations" />
   <div className="w-full flex flex-col space-y-6 px-custom">
    <LeftBorderWithTitle
     textSize="text-base"
     title="Honor"
     className="text-mainprimarycolor"
    />
    <h4 className="text-3xl text-mainprimarycolor font-bold">
     Appreciations Letter
    </h4>

    {/* Grid of gallery cards */}
    <div className="grid grid-cols-4 gap-6 relative">
     {appreciationsData.slice(0, visibleItems).map((item, index) => (
      <AppreciationsImageCard
       key={item.id}
       imgs={item.image}
       id={item.id}
       allImages={appreciationsData}
       currentIndex={index}
      />
     ))}
    </div>

    {/* Loader Indicator */}
    {visibleItems < appreciationsData.length && (
     <div className="flex justify-center pt-4">
      <span>Loading more...</span>
     </div>
    )}
   </div>
  </div>
 )
}

export default Appreciations
