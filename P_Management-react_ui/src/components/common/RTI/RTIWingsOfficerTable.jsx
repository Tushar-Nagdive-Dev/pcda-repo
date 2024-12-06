import React from 'react'
import {
 Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { RTIWingsOfficerData } from './RTIWingsOfficerData.js'

function RtiWingsOfficerTable({ currentStage, transitionStyles, state }) {
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
   <Table >
    <TableHeader>
     <TableRow>
      <TableHead className="text-xl font-bold">Section</TableHead>
      <TableHead className="w-[350px] text-xl font-bold">Name of the officer</TableHead>
      <TableHead className="w-[120px] text-xl font-bold">Phone Number</TableHead>
     </TableRow>
    </TableHeader>
    <TableBody>
     {RTIWingsOfficerData.map((row, index) => (
      <React.Fragment key={row.id}>
       <TableRow>
        <TableCell className={`font-medium`}>
         <ul className="list-decimal list-inside text-justify">
          {row.section.map(item => (
           <li key={item} className="text-lg">{item}</li>
          ))}
         </ul>
        </TableCell>
        <TableCell className="text-lg">{row.name_of_officer}</TableCell>
        <TableCell className="text-lg">{row.phone_number}</TableCell>
       </TableRow>
      </React.Fragment>
     ))}
    </TableBody>
   </Table>
  </div>
 )
}

export default RtiWingsOfficerTable