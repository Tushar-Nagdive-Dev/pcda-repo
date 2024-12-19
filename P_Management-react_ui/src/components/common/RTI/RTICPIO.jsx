import React from 'react'

function Rticpio({ transitionStyles, state, currentStage }) {
 return (
  <div
   style={{
    ...transitionStyles[state],
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
   }}
   className={`p-10 ${
    currentStage === 1
     ? 'bg-selectedSecondary rounded-lg'
     : 'bg-selectedSecondary rounded-r-lg rounded-b-lg'
   }`}
  >
   <div className="h-full flex flex-col items-center justify-center gap-2 text-titleColor">
    <h3 className="text-4xl font-semibold text-titleColor mb-8 text-center">
     Particulars Of Central Public Information Officer (CPIO)
    </h3>
    <p className="font-semibold text-4xl">Shri Chandra Prakash, IDAS,</p>
    <p className="text-3xl">Addl.CDA</p>
    <p className="text-3xl">Office of the PCDA (O)</p>
    <p className="text-3xl">Golibar Maidan, Pune 411 001</p>
    <p className="text-3xl">Telephone No. – 020 – 26401102</p>
    <p className="text-3xl">Fax No. – 020 – 26453446</p>
    <p className="my-4 text-3xl">आरटीआई अधिनियम 2005 की धारा 4 (1) (बी) (वी)</p>
   </div>
  </div>
 )
}

export default Rticpio
