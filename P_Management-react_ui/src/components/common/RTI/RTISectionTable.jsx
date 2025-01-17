import React from 'react'
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from '@/components/ui/table'
import { RTISectionData } from './RTISectionData.js'

function RtiSectionTable({ currentStage, transitionStyles, state }) {
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
   className={`h-full overflow-y-auto p-10 ${
    currentStage === 1
     ? 'bg-selectedSecondary rounded-lg'
     : 'bg-selectedSecondary rounded-r-lg rounded-b-lg'
   }`}
  >
   <Table className=" border [&_tr]:!border [&_tr]:border-adminTextColor">
    <TableHeader>
     <TableRow>
      <TableHead className="w-[100px] font-bold text-lg border-r border-r-adminTextColor">Sr.No.</TableHead>
      <TableHead className="w-[250px] font-bold text-lg border-r border-r-adminTextColor">Wing</TableHead>
      <TableHead className="font-bold text-lg ">Work Dealt With</TableHead>
     </TableRow>
    </TableHeader>
    <TableBody>
     {RTISectionData.map((row, index) => (
      <React.Fragment key={row.srNo}>
       <TableRow>
        <TableCell
         className={`border-r border-adminTextColor text-lg font-medium ${
          row.subsections ? 'align-text-top' : ''
         }`}
         rowSpan={row.subsections ? row.subsections.length + 1 : 1}
        >
         {row.srNo}
        </TableCell>
        <TableCell className="text-lg border-r  border-adminTextColor">
         {row.wing}
         {row.subsections ? null : ''}
        </TableCell>
        <TableCell className="text-lg border-r border-adminTextColor">
         {!row.subsections ? (
          <ul className="list-decimal list-outside space-y-2 px-4">
           {row.workDealtWith.map((item, idx) => (
            <li key={idx} className="text-lg">
             {item}
            </li>
           ))}
          </ul>
         ) : null}
        </TableCell>
       </TableRow>
       {row.subsections &&
        row.subsections.map((sub, subIdx) => (
         <TableRow key={`${index}-${subIdx}`}>
          <TableCell className="text-lg border-r border-adminTextColor">
           {sub.name}
          </TableCell>
          <TableCell>
           <ul className="list-decimal list-outside space-y-2 px-4">
            {/*{row.workDealtWith ? (<li key={row.srNo}>{row.workDealtWith[0]}</li>) : null}*/}
            {sub.workDealtWith.map((task, taskIdx) => (
             <li key={taskIdx} className="text-lg">
              {task}
             </li>
            ))}
           </ul>
          </TableCell>
         </TableRow>
        ))}
      </React.Fragment>
     ))}
    </TableBody>
   </Table>
  </div>
 )
}

export default RtiSectionTable
