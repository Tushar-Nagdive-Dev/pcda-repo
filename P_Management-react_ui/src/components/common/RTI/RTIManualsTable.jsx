import React from 'react'
import {
 Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { RTIManualsData } from './RTIManualsData.js'

function RtiManualsTable({ transitionStyles, state, currentStage}) {
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
   className={`overflow-y-auto h-full p-10 ${currentStage === 1 ? 'bg-selectedSecondary rounded-lg' : 'bg-selectedSecondary rounded-r-lg rounded-b-lg'}`}
  >
   <Table>
    <TableHeader>
     <TableRow>
      <TableHead className="w-[100px] font-bold text-xl">Sr.No.</TableHead>
      <TableHead className="font-bold text-xl">Name of compilation</TableHead>
      <TableHead className="w-[350px] font-bold text-xl">Category</TableHead>
     </TableRow>
    </TableHeader>
    <TableBody>
     {RTIManualsData.map((row, index) => (
      <React.Fragment key={row.sr_no}>
       <TableRow>
        <TableCell className={`font-medium text-xl`}>
         {row.sr_no}
        </TableCell>
        <TableCell className={`text-xl`}>{row.name_of_compilation}</TableCell>
        <TableCell className={`text-xl`}>{row.category}</TableCell>
       </TableRow>
      </React.Fragment>
     ))}
    </TableBody>
   </Table>
  </div>
 )
}

export default RtiManualsTable