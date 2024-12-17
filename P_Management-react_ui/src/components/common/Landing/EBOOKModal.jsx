import React, { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
 'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
 import.meta.url
).toString()

function EBOOKModal({ pdf, children }) {
 const [numPages, setNumPages] = useState()
 const [containerWidth, setContainerWidth] = useState(null)
 const pdfContainerRef = useRef(null)

 useEffect(() => {
  if (pdfContainerRef.current) {
   setContainerWidth(pdfContainerRef.current.offsetWidth)
  }
 }, [pdfContainerRef])

 function onDocumentLoadSuccess({ numPages }) {
  setNumPages(numPages)
 }

 return (
  <Dialog>
   <DialogTrigger className="m-0 p-0 ">{children}</DialogTrigger>
   <DialogContent className="p-0 bg-transparent !max-w-2xl">
    <div
     ref={pdfContainerRef}
     className="pdf-preview-container overflow-y-auto"
     style={{ maxHeight: '85vh', padding: '10px' }}
    >
     <Document
      file={pdf} // Path to your PDF file
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
  </Dialog>
 )
}

export default EBOOKModal
