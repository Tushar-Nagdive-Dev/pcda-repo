import React from 'react'
import {
 Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { RTIIDASData } from './RTIIDASData.js'

function RTIIDASTable({ transitionStyles, state, currentStage }) {
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
   className={`h-full p-10 ${currentStage === 1 ? 'bg-selectedSecondary rounded-lg' : 'bg-selectedSecondary rounded-r-lg rounded-b-lg'}`}
  >
   <h3 className="text-3xl font-semibold text-adminTextColor mb-10 text-center">रक्षा लेखा प्रधान नियंत्रक(अफसर) कार्यालय के स्कन्ध अधिकारी एवं उनके फोन नंबर</h3>
   <Table className="border [&_tr]:!border [&_tr]:border-adminTextColor">
    <TableHeader>
     <TableRow>
      <TableHead className="w-[100px] font-bold text-xl border-r border-adminTextColor">Sr.No.</TableHead>
      <TableHead className="font-bold text-xl border-r border-adminTextColor">Name of the Officer</TableHead>
      <TableHead className="w-[350px] font-bold text-xl border-r border-adminTextColor">Phone Number</TableHead>
     </TableRow>
    </TableHeader>
    <TableBody>
     {RTIIDASData.map((row, index) => (
      <React.Fragment key={row.sr_no}>
       <TableRow>
        <TableCell className={`font-medium text-xl border-r border-adminTextColor`}>
         {row.sr_no}
        </TableCell>
        <TableCell className={`text-xl border-r border-adminTextColor`}>{row.name_of_officer}</TableCell>
        <TableCell className={`text-xl`}>{row.phone_number}</TableCell>
       </TableRow>
      </React.Fragment>
     ))}
    </TableBody>
   </Table>
  </div>
 )
}

export default RTIIDASTable