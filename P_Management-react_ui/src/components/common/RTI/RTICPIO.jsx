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
   className={`p-10 ${currentStage === 1 ? 'bg-selectedSecondary rounded-lg' : 'bg-selectedSecondary rounded-r-lg rounded-b-lg'}`}
  >
   <h3 className="text-3xl font-semibold text-titleColor mb-7">
    Particulars Of Central Public Information Officer (CPIO)
   </h3>
   <div className="flex flex-col gap-2 text-titleColor text-xl">
    <p className="font-semibold text-2xl">Shri Chandra Prakash, IDAS,</p>
    <p>Addl.CDA</p>
    <p>Office of the PCDA (O)</p>
    <p>Golibar Maidan, Pune 411 001</p>
    <p>Telephone No. – 020 – 26401102</p>
    <p>Fax No. – 020 – 26453446</p>
    <p className="my-4">आरटीआई अधिनियम 2005 की धारा 4 (1) (बी) (वी)</p>
   </div>
  </div>
 )
}

export default Rticpio