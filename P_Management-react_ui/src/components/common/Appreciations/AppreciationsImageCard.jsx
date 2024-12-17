// import React from 'react'
// import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
// import { LazyLoadImage } from 'react-lazy-load-image-component'
// import 'react-lazy-load-image-component/src/effects/blur.css';

// function AppreciationsImageCard({ imgs, id }) {
//  return (
//   <Dialog>
//    <DialogTrigger>
//     <div className="h-full group/sectioncard relative cursor-pointer border border-paragraphcolor rounded-sm">
//      {/* Display the first image */}
//      {/* <img
//       src={imgs}
//       alt={id}
//       className="w-full h-full min-w-72 min-h-56  rounded-xl object-cover"
//      /> */}
//      <LazyLoadImage
//       alt={id}
//       src={imgs} // use normal <img> attributes as props
//       effect="blur"
//       className="w-full h-full min-w-72 min-h-56  rounded-xl object-cover"
//      />
//     </div>
//    </DialogTrigger>
//    <DialogContent className="w-full h-fit p-0">
//     <div className="w-auto max-h-[850px] flex items-center justify-center">
//      <LazyLoadImage
//       alt={id}
//       src={imgs} // use normal <img> attributes as props
//       effect="blur"
//       className={`h-full w-full object-cover rounded-lg`}
//      />
//     </div>
//    </DialogContent>
//   </Dialog>
//  )
// }

// export default AppreciationsImageCard

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'

function AppreciationsImageCard({ imgs, id, allImages, currentIndex }) {
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
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
   {/* Trigger */}
   <DialogTrigger asChild>
    <div
     className="h-full group/sectioncard relative cursor-pointer border border-paragraphcolor rounded-sm"
     onClick={() => setIsOpen(true)}
    >
     <LazyLoadImage
      alt={id}
      src={imgs}
      effect="blur"
      className="w-full h-full min-w-72 min-h-56 rounded-xl object-cover"
     />
    </div>
   </DialogTrigger>

   {/* Dialog Content */}
   <DialogContent
    className="w-full h-fit p-0"
   >
    <div className="relative max-w-[90vw] max-h-[90vh] bg-white rounded-lg overflow-hidden">
     {/* Display the current image */}
     <LazyLoadImage
      alt={allImages[currentImgIndex].id}
      src={allImages[currentImgIndex].image}
      effect="blur"
      className="h-full w-full object-cover"
     />

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

export default AppreciationsImageCard
