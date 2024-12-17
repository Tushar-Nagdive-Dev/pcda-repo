import React from 'react'

function UserDashboardDownload() {
 return (
  <div className="w-full flex gap-2 my-4 bg-adminBreadCrumbsBg">
   <div className="w-full border border-paragraphcolor rounded-xl p-5 flex flex-col justify-center items-center space-y-4">
    <h3 className="text-2xl text-adminTextColor font-raleway font-bold">
     Form-16 Download{' '}
    </h3>
    <button className="text-lg bg-green-500 py-2 px-4 text-white font-raleway">
     Download
    </button>
   </div>
   <div className="w-full border border-paragraphcolor rounded-xl p-5 flex flex-col justify-center items-center space-y-4">
    <h3 className="text-2xl text-adminTextColor font-raleway font-bold">
     DSOP Fund Statement Download
    </h3>
    <button className="text-lg bg-green-500 py-2 px-4 text-white font-raleway">
     Download
    </button>
   </div>
  </div>
 )
}

export default UserDashboardDownload
