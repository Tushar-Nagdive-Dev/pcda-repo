import React from 'react'
import welcomeAdminScreen from '../../../assets/images/welcome_screen.jpg'
import solider from '../../../assets/images/dummy_pic.png'
import AdminDashboardCountCard from './AdminDashboardCountCard'

function AdminDashboardCardSection() {
 return (
  <div className="max-h-[350px] grid auto-rows-min gap-4 md:grid-cols-4 grid-rows-2">
   <div className="h-full w-full relative col-span-2 row-span-2">
    {/* Solider Profile Card  */}
    <div className="flex h-full flex-col ">
     <div className="h-1/2 rounded-t-md">
      <img
       src={welcomeAdminScreen}
       alt="Welcome"
       className="w-full h-full object-cover rounded-t-md"
      />
      <p className="text-white text-xl font-semibold absolute top-10 left-10 font-raleway">
       Welcome Back!
      </p>
     </div>

     <div className="h-full w-full bg-adminCard rounded-b-md">
      <div className="h-full flex justify-between px-10 py-5">
       <div className="w-full flex flex-col justify-between gap-3">
        <img
         src={solider}
         alt="Person's Picture"
         className="rounded-full h-14 w-14 border-4 border-white"
        />
        <div className={'flex justify-between items-center'}>

         <div className="w-fit flex flex-col gap-2">
          <h5 className="text-lg text-titleColor font-bold font-raleway">
           J N Tulekar
          </h5>
          <p className="text-statebluecolor text-sm font-raleway">
           Admin
          </p>
         </div>
         <button type={'button'} className="w-fit h-fit px-3 py-1 font-raleway bg-statebluecolor rounded-sm text-white text-xl">
          View Profile
         </button>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>

   {/* Request Send  */
   }
   <AdminDashboardCountCard title="DO-II Orders" number={10} />

   {/* In-Progress Send  */
   }
   <AdminDashboardCountCard title="TA/DA Orders" number={2} />

   {/* Resolved  */
   }
   <AdminDashboardCountCard title="Grievance" number={6} />

   {/* Rejected  */
   }
   <AdminDashboardCountCard title="DSOP" number={1} />
  </div>
 )

}

export default AdminDashboardCardSection
