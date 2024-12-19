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
import { saoCentralWing, saoEDPCentre, saoLedgerWing, saoTWing } from './RTISAOData.js'

function RTISAOTable({ currentStage, transitionStyles, state }) {
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
   <div className="flex flex-col items-center space-y-6">
    {/* SAO OF CENTRAL WING */}
    <div className="w-full flex flex-col space-y-2">
     <h3 className="text-center text-2xl text-adminTextColor my-4 font-bold">
      SAOs of Central Wing
     </h3>
     <Table className=" border [&_tr]:!border [&_tr]:border-adminTextColor">
      <TableHeader>
       <TableRow>
        <TableHead className="w-[100px] font-bold text-lg border-r border-r-adminTextColor">
         Sr.No.
        </TableHead>
        <TableHead className="w-[250px] font-bold text-lg border-r border-r-adminTextColor">
         Name
        </TableHead>
        <TableHead className="font-bold text-lg border-r border-r-adminTextColor">
         Designation
        </TableHead>
        <TableHead className="font-bold text-lg border-r border-r-adminTextColor">
         Section
        </TableHead>
        <TableHead className="font-bold text-lg ">Phone No.</TableHead>
       </TableRow>
      </TableHeader>
      <TableBody>
       {saoCentralWing.map((row, index) => (
        <React.Fragment key={index}>
         <TableRow>
          <TableCell
           className={`border-r border-adminTextColor text-lg font-medium`}
          >
           {index + 1}
          </TableCell>
          <TableCell className="text-lg border-r  border-adminTextColor">
           {row.name}
          </TableCell>
          <TableCell className="text-lg border-r border-adminTextColor">
           {row.designation}
          </TableCell>
          <TableCell className="text-lg border-r border-adminTextColor">
           {row.section}
          </TableCell>
          <TableCell className="text-lg border-r border-adminTextColor">
           {row.phone_number || '-'}
          </TableCell>
         </TableRow>
        </React.Fragment>
       ))}
      </TableBody>
     </Table>
    </div>

    {/* SAO OF Ledger WING */}
    <div className="w-full flex flex-col space-y-2">
     <h3 className="text-center text-2xl text-adminTextColor my-4 font-bold">
      SAOs of Ledger Wing
     </h3>
     <Table className=" border [&_tr]:!border [&_tr]:border-adminTextColor">
      <TableHeader>
       <TableRow>
        <TableHead className="w-[100px] font-bold text-lg border-r border-r-adminTextColor">
         Sr.No.
        </TableHead>
        <TableHead className="w-[250px] font-bold text-lg border-r border-r-adminTextColor">
         Name
        </TableHead>
        <TableHead className="font-bold text-lg border-r border-r-adminTextColor">
         Designation
        </TableHead>
        <TableHead className="font-bold text-lg border-r border-r-adminTextColor">
         Section
        </TableHead>
        <TableHead className="font-bold text-lg ">Phone No.</TableHead>
       </TableRow>
      </TableHeader>
      <TableBody>
       {saoLedgerWing.map((row, index) => (
        <React.Fragment key={index}>
         <TableRow>
          <TableCell
           className={`border-r border-adminTextColor text-lg font-medium`}
          >
           {index + 1}
          </TableCell>
          <TableCell className="text-lg border-r  border-adminTextColor">
           {row.name}
          </TableCell>
          <TableCell className="text-lg border-r border-adminTextColor">
           {row.designation}
          </TableCell>
          <TableCell className="text-lg border-r border-adminTextColor">
           {row.section}
          </TableCell>
          <TableCell className="text-lg border-r border-adminTextColor">
           {row.phone_number || '-'}
          </TableCell>
         </TableRow>
        </React.Fragment>
       ))}
      </TableBody>
     </Table>
    </div>

    {/* SAO OF Transportation WING */}
    <div className="w-full flex flex-col space-y-2">
     <h3 className="text-center text-2xl text-adminTextColor my-4 font-bold">
      SAOs of Transportation Wing
     </h3>
     <Table className=" border [&_tr]:!border [&_tr]:border-adminTextColor">
      <TableHeader>
       <TableRow>
        <TableHead className="w-[100px] font-bold text-lg border-r border-r-adminTextColor">
         Sr.No.
        </TableHead>
        <TableHead className="w-[250px] font-bold text-lg border-r border-r-adminTextColor">
         Name
        </TableHead>
        <TableHead className="font-bold text-lg border-r border-r-adminTextColor">
         Designation
        </TableHead>
        <TableHead className="font-bold text-lg border-r border-r-adminTextColor">
         Section
        </TableHead>
        <TableHead className="font-bold text-lg ">Phone No.</TableHead>
       </TableRow>
      </TableHeader>
      <TableBody>
       {saoTWing.map((row, index) => (
        <React.Fragment key={index}>
         <TableRow>
          <TableCell
           className={`border-r border-adminTextColor text-lg font-medium`}
          >
           {index + 1}
          </TableCell>
          <TableCell className="text-lg border-r  border-adminTextColor">
           {row.name}
          </TableCell>
          <TableCell className="text-lg border-r border-adminTextColor">
           {row.designation}
          </TableCell>
          <TableCell className="text-lg border-r border-adminTextColor">
           {row.section}
          </TableCell>
          <TableCell className="text-lg border-r border-adminTextColor">
           {row.phone_number || '-'}
          </TableCell>
         </TableRow>
        </React.Fragment>
       ))}
      </TableBody>
     </Table>
    </div>

    {/* SAO OF EDP Centre */}
    <div className="w-full flex flex-col space-y-2">
     <h3 className="text-center text-2xl text-adminTextColor my-4 font-bold">
      SAOs of EDP Centre
     </h3>
     <Table className=" border [&_tr]:!border [&_tr]:border-adminTextColor">
      <TableHeader>
       <TableRow>
        <TableHead className="w-[100px] font-bold text-lg border-r border-r-adminTextColor">
         Sr.No.
        </TableHead>
        <TableHead className="w-[250px] font-bold text-lg border-r border-r-adminTextColor">
         Name
        </TableHead>
        <TableHead className="font-bold text-lg border-r border-r-adminTextColor">
         Designation
        </TableHead>
        <TableHead className="font-bold text-lg border-r border-r-adminTextColor">
         Section
        </TableHead>
        <TableHead className="font-bold text-lg ">Phone No.</TableHead>
       </TableRow>
      </TableHeader>
      <TableBody>
       {saoEDPCentre.map((row, index) => (
        <React.Fragment key={index}>
         <TableRow>
          <TableCell
           className={`border-r border-adminTextColor text-lg font-medium`}
          >
           {index + 1}
          </TableCell>
          <TableCell className="text-lg border-r  border-adminTextColor">
           {row.name}
          </TableCell>
          <TableCell className="text-lg border-r border-adminTextColor">
           {row.designation}
          </TableCell>
          <TableCell className="text-lg border-r border-adminTextColor">
           {row.section}
          </TableCell>
          <TableCell className="text-lg border-r border-adminTextColor">
           {row.phone_number || '-'}
          </TableCell>
         </TableRow>
        </React.Fragment>
       ))}
      </TableBody>
     </Table>
    </div>
   </div>
  </div>
 )
}

export default RTISAOTable
