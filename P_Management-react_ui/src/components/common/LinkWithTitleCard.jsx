import { DownloadSimple, Eye } from '@phosphor-icons/react'
import React, { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import {
 Dialog,
 DialogTrigger,
 DialogContent,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
 'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
 import.meta.url
).toString()

function LinkWithTitleCard({ title, link, view_link }) {
 const [numPages, setNumPages] = useState()
 const [containerWidth, setContainerWidth] = useState(null)
 const pdfContainerRef = useRef(null)
 console.log("Download link title -", title)

 useEffect(() => {
  if (pdfContainerRef.current) {
   setContainerWidth(pdfContainerRef.current.offsetWidth)
  }
 }, [pdfContainerRef])

 function onDocumentLoadSuccess({ numPages }) {
  setNumPages(numPages)
 }

 return (
  <>
   <Dialog>
    <div className="flex justify-between p-3 bg-white text-paragraphcolor">
     <DialogTrigger>
      <p className="text-secondaryGrey underline underline-offset-2">
       <li className="relative px-4 text-left">{title}</li>
      </p>
     </DialogTrigger>
     <DialogContent className="p-0 bg-transparent !max-w-2xl">
      <div
       ref={pdfContainerRef}
       className="pdf-preview-container overflow-y-auto"
       style={{ maxHeight: '85vh', padding: '10px' }}
      >
       <Document
        file={link} // Path to your PDF file
        onLoadSuccess={onDocumentLoadSuccess}
       >
        {/* Render all pages */}
        {Array.from(new Array(numPages || 0), (el, index) => (
         <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          className="pdf-page mb-4"
         />
        ))}
       </Document>
      </div>
     </DialogContent>
     <div className="flex gap-2 items-center">
      {/*<a href={view_link} target="_blank" rel="noopener noreferrer">*/}
      {/*  <Eye size={24} color="#0D6EFD" className="cursor-pointer" />*/}
      {/*</a>*/}
      <a href={link} download={link}>
       <DownloadSimple size={24} color="#0D6EFD" className="cursor-pointer" />
      </a>
     </div>
    </div>
   </Dialog>
  </>
 )
}

export default LinkWithTitleCard
