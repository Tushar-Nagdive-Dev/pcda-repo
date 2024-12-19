import React from 'react'
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from '@/components/ui/table'
import { RTIRecordsData } from './RTIRecordsData'

function RTIRecords({ currentStage, transitionStyles, state }) {
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
      <TableHead className="w-[100px] font-bold text-lg border-r border-r-adminTextColor">
       Sr.No.
      </TableHead>
      <TableHead className="w-[250px] font-bold text-lg border-r border-r-adminTextColor">
       Description of Records
      </TableHead>
      <TableHead className="font-bold text-lg ">Periods of retention</TableHead>
     </TableRow>
    </TableHeader>
    <TableBody>
     {RTIRecordsData.map((row, index) => (
      <React.Fragment key={row.srNo}>
       <TableRow>
        <TableCell
         className={`border-r border-adminTextColor text-lg font-medium ${
          row.subsection ? 'align-text-top' : ''
         }`}
         rowSpan={row.subsection ? row.subsection.length + 1 : 1}
        >
         {row.srNo}
        </TableCell>
        <TableCell
         className="text-lg border-r border-adminTextColor whitespace-pre-line"
         colSpan={row.subsection ? 2 : 1} // Span two columns if subsection exists
        >
         {row.description_of_records || row.title || "-"}
        </TableCell>
        {row.periods_of_retention && (
         <TableCell className="text-lg border-r border-adminTextColor whitespace-pre-line">
          <p className="text-lg">{row.periods_of_retention}</p>
         </TableCell>
        )}
       </TableRow>
       {row.subsection &&
        row.subsection.map((sub, subIdx) => (
         <TableRow key={`${index}-${subIdx}`}>
          <TableCell className="text-lg border-r border-adminTextColor">
           {sub.description_of_records}
          </TableCell>
          <TableCell>
           <p className="text-lg">{sub.periods_of_retention}</p>
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

export default RTIRecords
