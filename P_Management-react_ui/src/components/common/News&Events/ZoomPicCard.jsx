import React, { useEffect, useState } from 'react'
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from '@/components/ui/dialog'
import Zoom from 'react-medium-image-zoom'
import './ZoomPicCard.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

import 'react-medium-image-zoom/dist/styles.css'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'

function ZoomPicCard({ imgs, title, allImages, currentIndex }) {
 const [currentImgIndex, setCurrentImgIndex] = useState(currentIndex)
 const [isOpen, setIsOpen] = useState(false) // Track dialog open/close state

 useEffect(() => {
  setCurrentImgIndex(currentIndex)
 }, [isOpen])
 // Navigate to the next image
 const handleNext = () => {
  setCurrentImgIndex((prev) => (prev + 1) % allImages.length)
 }

 // Navigate to the previous image
 const handlePrevious = () => {
  setCurrentImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
 }

 return (
  <Dialog>
   <DialogTrigger>
    <img
     src={imgs}
     alt={`${title}'s picture`}
     className="w-full min-w-72 h-80 min-h-56 max-h-96 rounded-xl object-cover"
    />
   </DialogTrigger>
   <DialogContent className="bg-transparent p-0 m-0 min-w-[1440px] h-[90%] text-red-500 ">
    <div className="relative max-w-[90vw] max-h-[90vh] bg-white rounded-lg overflow-hidden">
     <LazyLoadImage
      src={allImages[currentImgIndex]}
      effect="blur"
      className="max-w-[1440px] w-full min-w-[250px] h-[85%] object-cover"
     />
     {/* <img
     src={imgs}
     alt={`${title}'s picture`}
     className="max-w-[1440px] w-full min-w-[250px] h-[85%] object-cover"
    /> */}
     {/* Left Arrow */}
     <button
      onClick={handlePrevious}
      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 focus:outline-none"
     >
      <ArrowLeft size={24} />
     </button>

     {/* Right Arrow */}
     <button
      onClick={handleNext}
      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 focus:outline-none"
     >
      <ArrowRight size={24} />
     </button>
    </div>
   </DialogContent>
  </Dialog>
 )
}

export default ZoomPicCard
