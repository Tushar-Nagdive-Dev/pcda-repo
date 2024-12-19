import React from 'react'
import Breadcrumbs from '../components/common/Breadcrumbs'
import TitleWithInfo from '../components/common/Downloads/TitleWithInfo.jsx'
import LeftBorderWithTitle from '../components/LeftBorderWithTitle.jsx'
import RtiDetails from '../components/common/RTI/RtiDetails.jsx'

function RTI() {
 return (
  <div className="space-y-10 pb-20">
   <Breadcrumbs title="RTI" />
   <div className="px-custom py-8 w-full h-full space-y-12">
    <LeftBorderWithTitle title="The Right To Information Act, 2005" textSize="text-3xl" className="font-bold" />
    {/* <h3 id="rti-title" className="text-3xl font-bold text-mainprimarycolor">The Right To Information Act, 2005</h3> */}
    <div className="my-12 flex flex-col">
     <RtiDetails />
    </div>
   </div>
  </div>
 )
}

export default RTI