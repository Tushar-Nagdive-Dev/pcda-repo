import React from 'react'
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

import 'react-medium-image-zoom/dist/styles.css'

function ZoomPicCard({ imgs, title }) {
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
    <img
     src={imgs}
     alt={`${title}'s picture`}
     className="max-w-[1440px] w-full min-w-[250px] h-[85%] object-cover"
    />
   </DialogContent>
  </Dialog>
 )
}

export default ZoomPicCard
