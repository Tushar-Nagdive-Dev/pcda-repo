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
   <h3 className="text-3xl font-semibold text-titleColor mb-7">
    Particulars of Appellate Authority
   </h3>
   <div className="flex flex-col gap-2 text-titleColor text-xl">
    <p className="font-semibold text-2xl">Shri S. K. Singh, IDAS</p>
    <p>Pr.CDA</p>
    <p>Office of the Pr.CDA (O)</p>
    <p>Golibar Maidan, Pune 411 001</p>
    <p>Telephone No. – 020 - 26401101</p>
    <p>Fax No. – 020 – 26453446</p>
    <p className="my-4">Section 4 (I) b (vi) of the RTI Act, 2005</p>
   </div>
  </div>
 )
}

export default RtiAppellateAuthority