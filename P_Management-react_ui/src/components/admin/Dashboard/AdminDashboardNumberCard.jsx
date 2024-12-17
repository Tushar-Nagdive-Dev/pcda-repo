import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CheckCircle, HourglassHigh, Stack } from '@phosphor-icons/react'

function AdminDashboardNumberCard({ children }) {
 return (
  <Dialog>
   {/* Trigger */}
   <DialogTrigger asChild>{children}</DialogTrigger>
   <DialogContent className="w-fit h-fit p-4 bg-adminCard rounded-xl flex gap-2">
    <div className="min-w-36 border rounded-lg bg-white flex flex-col justify-center items-center p-4 text-red-500">
     <h4 className="font-bold text-[60px] font-raleway">6</h4>
     <div className="flex gap-2 items-center text-red-500">
      <HourglassHigh size={28} />
      <p className="font-raleway font-bold">Pending</p>
     </div>
    </div>
    <div className="min-w-36border rounded-lg bg-white flex flex-col justify-center items-center p-4 text-green-600">
     <h4 className="font-bold text-[60px] font-raleway">4</h4>
     <div className="flex gap-2 items-center text-green-600">
      <CheckCircle size={28} />
      <p className="font-raleway font-bold">Disposed</p>
     </div>
    </div>
    <div className="min-w-36 border rounded-lg bg-white flex flex-col justify-center items-center p-4 text-adminTextColor">
     <h4 className="font-bold text-[60px] font-raleway">10</h4>
     <div className="flex gap-2 ">
      <Stack size={28} />
      <p className="font-raleway font-bold">Total</p>
     </div>
    </div>
   </DialogContent>
  </Dialog>
 )
}

export default AdminDashboardNumberCard
