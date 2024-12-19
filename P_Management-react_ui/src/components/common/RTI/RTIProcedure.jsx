import React from 'react'
import {
 Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'

function RtiProcedure({ transitionStyles, state, currentStage }) {
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
   <div className="flex flex-col space-y-2 my-6">
    <h3 className="font-semibold text-2xl text-titleColor">
     HOW TO APPLY
    </h3>
    <p className="text-titleColor">A person can apply by making a request for information under RTI Act in writing or
     through electronic means in English or Hindi or in the official language of the area with the prescribed fee to the
     Central Public Information Officer or the Assistant Public Information Officer, as the case may be.</p>
   </div>

   <div className="flex flex-col space-y-2 my-6">
    <h3 className="font-semibold text-2xl text-titleColor">
     WHAT IS THE TIME PERIOD
    </h3>
    <p className="text-titleColor">The Central Public Information Officer, on receipt of a request, shall as
     expeditiously as possible, shall within thirty days of the receipt of the request either provide the information or
     reject the request for any reasons specified in Section 8 and 9.</p>
   </div>

   <div className="flex flex-col space-y-2 my-6">
    <h3 className="font-semibold text-2xl text-titleColor">
     EXEMPTION FROM DISCLOSURE OF INFORMATION UNDER SECTION 8 AND 9
    </h3>
    <div className="flex flex-col space-y-4 text-titleColor">
     <p className="my-2">There shall be no obligation/binding to give any citizen –</p>
     <ol className="list-[upper-alpha] list-inside space-y-4">
      <li>Information, disclosure of which should affect the sovereignty and integrity of India, the security,
       strategic, scientific or economic interest of the state relation with foreign state or lead to incitement of an
       offence.
      </li>
      <li> Information which has been expressly forbidden to be published by any Court of Law or Tribunal or the
       disclosure of which may constitute Contempt of Court.
      </li>

      <li>
       Information, the disclosure of which causes breach of privilege of Parliament or the State Legislature.
      </li>

      <li>
       Information including commercial confidence, trade secrets or intellectual properly. The disclosure of which harm
       the competitive position of a third party, unless the Competent Authority is satisfied that Layer Public interest
       warrants the disclosure of such information.
      </li>

      <li>
       Information available to a person in his fiduciary relationship unless the Competent Authority is satisfied that
       the Layer Public interest warrants the disclosure of such information.
      </li>

      <li>
       Information received in confidence from foreign Govt.
      </li>

      <li>
       Information, the disclosure which would endanger the life of physical safely of any person or identity the source
       of information or assistance given in Confidence for law enforcement or security purpose.
      </li>

      <li>
       Information which would impede the process of investigation or apprehension and other officers.
      </li>

      <li>
       Cabinet papers including records of deliberation of the Council of Ministries, Secretaries and other officers.
      </li>

      <li>
       Information relates to personal information, the disclosure of which has no relationship to any public activity
       or interest, or which would cause unwarranted invasion of the privacy of he individual unless Central/State
       Information Officer or State Public Information officer or the appellate Authority is satisfied that larger
       public interest justifies the disclosure of such information.
      </li>
     </ol>

     <p> Accordingly to Section 9 Central/State Public Information officer may reject request for information where such
      request involves infringement of copy right subsisting in a person other than state.</p>
    </div>
   </div>

   <div className="flex flex-col space-y-2 my-8">
    <h3 className="font-semibold text-2xl text-titleColor">
     COST OF PROCESSING THE INFORMATION
    </h3>
    <div className="flex flex-col space-y-2 text-titleColor">
     <ul className="list-decimal list-inside space-y-4">
      <li>A request for obtaining information under sub-section (1) of Section 6 should be accompanied by an application
       fee of Rs. 10/- by way of cash against proper receipt or by Demand Draft or Bankers Cheque payable to the
       Accounts Officer of the Public Authority.
      </li>
      <li> For providing information the fee shall be charged by way of cash against proper receipt by Demand Draft or
       Bankers Cheque payable to the Accounts Officer of the Public Authority at the following rates:
       <ol className="ml-4 list-[upper-alpha] space-y-2 list-inside">
        <li>Rupees two for each page (in A4 or A3 size paper) created or copied.</li>
        <li>Actual charge or cost price of a copy in larger size paper</li>
        <li>Actual cost or price for samples or models</li>
        <li>For inspection of records, no fee for the first hour; and a fee of Rs. 5/- for each subsequent hour (Or
         fraction thereof)
        </li>
        <li>For information provided in diskette or floppy Rs. 50/- per diskette or floppy
        </li>
        <li>For information provided in printed form at the price fixed for such publication or Rs. 2/- per page of
         photocopy for extracts from publication.
        </li>
       </ol>
      </li>
     </ul>
     <p> The applicant who are denied information sought or he is not satisfied with the information can go for appeal
      to the Principal Controller of Defence Accounts of the Office of the PCDA (O), Golibar Maidan, Pune 411 001.</p>
    </div>
   </div>

   <div className="flex flex-col space-y-2 my-4">
    <h3 className="font-semibold text-2xl text-titleColor mb-4">
     Description of CDA (O) Account Number allotted to Army Officers
    </h3>
    <p className="text-titleColor text-lg">For Example: 2/72/208339 M</p>
    <Table  className=" border [&_tr]:!border [&_tr]:border-adminTextColor">
     <TableHeader>
      <TableRow>
       <TableHead className="w-[120px] font-bold"></TableHead>
       <TableHead className="font-bold"></TableHead>
      </TableRow>
     </TableHeader>
     <TableBody>
      <TableRow>
       <TableCell className={`font-medium text-lg border-r border-adminTextColor`}>
        2
       </TableCell>
       <TableCell className="text-lg">represents Ledger Wing Section</TableCell>
      </TableRow>

      <TableRow>
       <TableCell className={`font-medium text-lg  border-r border-adminTextColor`}>
        72
       </TableCell>
       <TableCell className={`text-lg`}>represents Task Number</TableCell>
      </TableRow>

      <TableRow>
       <TableCell className={`font-medium text-lg  border-r border-adminTextColor`}>
        208339
       </TableCell>
       <TableCell className={`text-lg`}>represents Pr.CDA (O) Account No. allotted to the Army Officer</TableCell>
      </TableRow>

      <TableRow>
       <TableCell className={`font-medium text-lg  border-r border-adminTextColor`}>
        M
       </TableCell>
       <TableCell className={`text-lg`}>check alpha accuracy of the numerical part</TableCell>
      </TableRow>

      <TableRow>
       <TableCell className={`font-medium text-lg  border-r border-adminTextColor`}>
        9
       </TableCell>
       <TableCell className={`text-lg`}>represents 'T' Wing Section</TableCell>
      </TableRow>

      <TableRow>
       <TableCell className={`font-medium text-lg  border-r border-adminTextColor`}>
        39
       </TableCell>
       <TableCell className={`text-lg`}>represents 'T' Section Task number</TableCell>
      </TableRow>
     </TableBody>
    </Table>
   </div>

  </div>
 )
}

export default RtiProcedure