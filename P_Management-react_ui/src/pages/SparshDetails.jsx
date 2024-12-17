import React from 'react'
import Breadcrumbs from '../components/common/Breadcrumbs'

function SparshDetails() {
 return (
  <div className="space-y-10 pb-20">
   <Breadcrumbs title="Sparsh" />
   <div className="px-custom space-y-8 my-12">
    <p className="text-xl text-justify text-titleColor">
     <b>SPARSH</b> (System for Pension Administration Raksha) was launched on
     01/09/2021 and aims to automate the entire pension process, from creation
     to disbursement and revision. Developed by TCS, it offers web-based
     services for pensioners, including data verification, annual
     identification, grievance management, and nominee declarations.
    </p>
    <p className="text-xl text-justify text-titleColor">
     The SPARSH portal supports key functions like claim initiation,
     computation, sanction, disbursement, accounting, and budgeting. Additional
     services include grievance management, service requests, and MIS reports.
     Furthermore, roles in SPARSH are divided between initiators (responsible
     for uploading data) and verifiers (who approve actions). The PCDA (P)
     Prayagraj sanctions pensions after data verification and generates the
     Sparsh e-PPO. The system also allows data corrections after pension
     sanction.
    </p>
    <p className="text-xl text-justify text-titleColor">
     A Service Center Locator helps pensioners find nearby centers for
     assistance. Overall, SPARSH simplifies and streamlines pension
     administration for defense personnel.
    </p>
    <p className="text-xl text-justify text-titleColor">
     To find a SPARSH Service Center, visit the official website
     <a
      href={`https://sparsh.defencepension.gov.in`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-newprimaryColor underline underline-offset-1
     text-xl px-2"
     >
      SPARSH
     </a>
     and use the "Service Center Locator" feature. Enter your city, state, or
     pin code to find the nearest center. The locator provides a list with
     addresses, contact details, and operational hours
    </p>
   </div>
  </div>
 )
}

export default SparshDetails
