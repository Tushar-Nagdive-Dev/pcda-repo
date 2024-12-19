import React, { useContext } from 'react'
import pcdaoBuildingClipped from '@/assets/images/About_us_section.png'
import LeftBorderWithTitle from '../../LeftBorderWithTitle'
import { AccessibilityContext } from '../../../context/AccessibilityContext'

function LandingAboutUs() {
 const accessibilityCtx = useContext(AccessibilityContext)
 return (
  <div className="w-full flex flex-col space-y-6 py-24">
   <LeftBorderWithTitle
    textSize="text-base"
    title="Principal Controller of Defence Accounts (Officers)"
    className="text-newprimaryColor font-semibold text-lg"
   />
   <h4 className={`text-3xl text-mainprimarycolor font-bold`}>About Us</h4>
   <div className="w-full flex gap-10">
    <div className="w-[75%] relative">
     <img
      src={pcdaoBuildingClipped}
      alt="PCDAO's Building"
      className="w-full"
     />
    </div>
    <div className="w-full h-full text-ternaryGrey my-auto space-y-4">
     <p
      className={`w-full m-0 p-0 text-2xl text-justify`}
     >
      PCDA(O) a distinguished organization within Defence Accounts Department (DAD), with a rich legacy as one of the oldest departments within the Government of India. At the helm of this esteemed department is the Controller General of Defence Accounts (CGDA). PCDA(O) is responsible for audit & payment of Pay and Allowance & all personal claims including Travelling allowance & LTC of all army officers. PCDA(O) acts as financial advisor to headquarters of all commands & their lower formations in all matters of Pay & Allowances. This office also audits DGN(Draft Gazette Notifications) pertaining to army officers. With our unwavering commitment to excellence and accountability, we ensure the precision in managing the financial affairs of the army officers.
      {/* Welcome to the PCDA (O), a distinguished organization within Defence
      Accounts Department (DAD), with a legacy as one of the oldest departments
      within Government of India. At the helm of this esteemed department is the
      Controller General of Defence Accounts (CGDA). We take pride in our
      pivotal role in providing indispensable facilitation of pay and allowances
      to the Army Officers, conducting meticulous accounting and performing
      comprehensive internal audits. Our focus lies in managing the expenditures
      and receipts of the Defence Officers. With our unwavering commitment ot
      excellence and accountability, we ensure the utmost precision in managing
      the financial affiars of these cirtical institutions, contributing to the
      nation’s defence and security. */}
     </p>
     {/* <p
      className={`w-full m-0 py-3 text-lg text-justify ${accessibilityCtx.getFontSizeClass(
       'text-base'
      )}`}
     >
      Office of the PCDA (O), Pune takes great pride in providing service to
      services. Our key service features are as follows:
      <ul className="list-disc space-y-2 list-inside my-2">
       <li>
        Audit, Accounting & disbursement of Pay & Allowances of the Officers of
        the Indian Army.
       </li>
       <li>
        Audit & adjustment of the Travel related & other claims of the Officers.
       </li>
       <li>Timely processing of Terminal/Retiring benefits of the Officers.</li>
       <li>Updation/Maintenance of Pay Records</li>
      </ul>
     </p> */}
    </div>
   </div>
  </div>
 )
}

export default LandingAboutUs
