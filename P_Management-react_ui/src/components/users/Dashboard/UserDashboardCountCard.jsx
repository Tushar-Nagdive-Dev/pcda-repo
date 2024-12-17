import React from 'react'
import UserDashboardNumberCard from './UserDashboardNumberCard'
import welcomescreen from '../../../assets/images/welcome_screen.jpg'

function UserDashboardCountCard({ title, number }) {
 return (
  <UserDashboardNumberCard>
   <div className="flex h-full flex-col ">
    <div className="h-1/2 rounded-t-md relative">
     <img
      src={welcomescreen}
      alt="Welcome"
      className="w-full max-h-[130px] object-cover rounded-t-md"
     />
     <p className="text-white text-xl font-semibold absolute top-6 left-8 font-raleway"></p>
     <div className="absolute bottom-2 right-3">
      <div className="flex flex-col text-right space-y-2">
       <div className="w-full flex gap-3 "></div>
      </div>
     </div>
    </div>

    <div className="relative h-full w-full bg-adminCard rounded-b-md">
     <div className=" h-full flex justify-between px-6 py-5">
      <div className=" w-full flex flex-col justify-between gap-3">
       <div className={'flex justify-between items-center mt-8'}>
        <div className="w-fit flex flex-col gap-1">
         <p className="text-adminTextColor text-xl  font-raleway font-bold">
          {title}
         </p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
   {/* <h4 className="text-adminTextColor font-bold text-[60px] font-raleway">
     {number}/10
    </h4> */}
  </UserDashboardNumberCard>
  //   <UserDashboardNumberCard>
  //    <div className="h-full flex flex-col justify-center rounded-sm bg-adminCard p-6 cursor-pointer">
  //     <h4 className="text-adminTextColor font-bold text-[60px] font-raleway">
  //      {number}/10
  //     </h4>
  //     <p className="text-adminTextColor text-xl font-raleway font-medium">
  //      {title}
  //     </p>
  //    </div>
  //   </UserDashboardNumberCard>
 )
}

export default UserDashboardCountCard
