import React from 'react'

function RtiAppellateAuthority({ transitionStyles, state, currentStage}) {
 return (
  <div
   style={{
    ...transitionStyles[state],
    width: '100%',
    height: '100%',
   }}
   className={`p-10 ${currentStage === 1 ? 'bg-selectedSecondary rounded-lg' : 'bg-selectedSecondary rounded-r-lg rounded-b-lg'}`}
  >
   <div className=" h-full items-center justify-center flex flex-col space-y-3 text-titleColor">
   <h3 className="text-4xl font-semibold text-titleColor mb-7">
    Particulars of Appellate Authority
   </h3>
    <p className="font-semibold text-4xl">Shri S. K. Singh, IDAS</p>
    <p className="text-3xl">Pr.CDA</p>
    <p className="text-3xl">Office of the Pr.CDA (O)</p>
    <p className="text-3xl">Golibar Maidan, Pune 411 001</p>
    <p className="text-3xl">Telephone No. – 020 - 26401101</p>
    <p className="text-3xl">Fax No. – 020 – 26453446</p>
    <p className="my-4 text-3xl">Section 4 (I) b (vi) of the RTI Act, 2005</p>
   </div>
  </div>
 )
}

export default RtiAppellateAuthority