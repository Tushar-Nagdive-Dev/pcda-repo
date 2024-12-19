import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import pcdaoTeam from '@/assets/images/pcdao_team.jpg'
import organizationChart from '@/assets/images/OrganisationChart.png'
import pcdaoStaffSpeech from '@/assets/images/speech.png'
import pcdaoStaff from '@/assets/images/pcdao_staff_2.jpg'
import pcdaoOffice from '@/assets/images/office_building/DSC_5900_2.jpg'
import pcdaoStoneImage from "@/assets/images/office_building/Foundation Stone of PCDAO Building.JPG";
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

const transitionStyles = {
 entering: { opacity: 0.5 },
 entered: {
  opacity: 1,
  transition: 'opacity 300ms ease-in',
 },
 exiting: { opacity: 0 },
 exited: {
  opacity: 1,
  transition: 'opacity 300ms ease-in',
 },
}

const aboutusData = [
 {
  id: 'ab1',
  title: 'About PCDA (O)',
  image: pcdaoTeam,
  description:
   'PCDA(O) a distinguished organization within Defence Accounts Department (DAD), with a rich legacy as one of the oldest departments within the Government of India. At the helm of this esteemed department is the Controller General of Defence Accounts (CGDA). PCDA(O) is responsible for audit & payment of Pay and Allowance & all personal claims including Travelling allowance & LTC of all army officers. PCDA(O) acts as financial advisor to headquarters of all commands & their lower formations in all matters of Pay & Allowances. This office also audits DGN(Draft Gazette Notifications) pertaining to army officers. With our unwavering commitment to excellence and accountability, we ensure the precision in managing the financial affairs of the army officers. \n\n Quality Policy- Office of the PCDA (O) is committed to render efficient, correct and prompt accounting, payment and financial services leading to customer satisfaction.',
 },
 {
  id: 'ab2',
  title: 'Message From PCDA (O)',
  image: pcdaoStaffSpeech,
  description: `It was with a great sense of honour & privilege that I took over the charge of PCDA(O) in the month of July 2022. There has been some delay in posting my first message here to you all. The Office of PCDA(O) is responsible for the correct and timely disbursement of Pay & Allowances of all Army Officers serving throughout the length and breadth of our immense country. I wanted to understand a little of the vast scope of its functioning and the problems facing it before posting my first message here.
I have completed over five months in this Office. I now have first hand experience of its day-to-day functioning. In order to get a better idea of its working and various issues I have also paid visits to different Army stations like Mhow, Chandimandir, Meerut, Ambala and ARTRAC, Shimla and interacted with Officers posted there. I have realized that the majority of problems in the correct and timely disbursement of Pay & Allowances arise from the misinterpretation of rules both by my Office as also by the Officers submitting the claims.
I have also attended a few retirement seminars held at Army HQrs, New Delhi to better understand the issues faced by retiring Officers. One of the main problems is that of huge recoveries from retirement benefits due to the delayed issue of Part II Orders and delayed Review of the IRLAs. This process has to be streamlined at both ends.
In these five (05) months it has been my humble endeavour to take certain steps to improve the functioning of this Office and reduce the number of grievances. The following are some of the
initiatives taken at our end :

a. Stepping up of Pay has been carried out for 3,520 cases of Army Officers in the month of April 2022 on our own.
b. A list of 2,449 cases pertaining to 5th and 6th CPC Anomaly has been prepared and we are ready to re-fix as per Court Judgement and the same will be adjusted as and when Order for implementation is received.
c. Leave statement is being made available in December 2022 Statement of Account.
d. DSOP Fund Statement will be made available to all Officers including Officers on Deputation in the month of April 2023.
e. SPARSH Centre opened at 0/0 PCDA(O) Pune to facilitate pensioners to submit their Life Certificate. Huge response received with approx 150 pensioners visiting this Office everyday throughout November 2022.
I have had the privilege of having a very long tenure of over 10 years as IFA with the Army. During my field visits as IFA I came to fully appreciate the fact that our brave Officers often serve our country in the most difficult of terrains and conditions involving great risk to themselves and great hardship for their families. Hence, it will always be my earnest endeavour to ensure that their Pay & Allowances are disbursed correctly and timely with minimum inconvenience to them. In an Office like this it can never be possible that there will be no pending grievances but I can assure you that no effort will be spared either by me or my team to ensure that these grievances are dispensed with, expeditiously and positively and they remain at the minimum level.
I also sincerely hope to receive your co-operation and support in achieving this objective.
Wishing everyone a very Happy New Year 2023.
!! Jai Hind !!
Jajn
(SANJAY KUMAR SINGH) Pr. Controller`,
 },
 {
  id: 'ab3',
  title: 'History of PCDA (O)',
  image: pcdaoStoneImage,
  description:
   "The PCDA(O) , a office located in pune, is an institution which provides all the finance related work especially oriented to army and defence officers. It originated in 1939 due to the need to manage pay and allowances for army personnel during World War II. At start it was set up for the \"Office of the Field Controller of Military Accounts\" on November 1, 1940. After that it grew and as reinforcements were sent overseas, a new office was sought, eventually located in the \"Shri Shahu Palace\" in Pune. Furthermore, their work expands into wings each handling specific branches like Infantry, Ordinance, Medical, etc. In 1942, a separate office was established for British Service Officers' accounts, and the office later became the Controller of Defence Accounts, streamlining operations. In 1957, a new building was approved, and the office moved to its permanent location in 1958 and handled all the work of pay, allowances, and financial accounts of Indian Army officers from there.",
 },
 {
  id: 'ab4',
  title: 'Organization Chart',
  image: organizationChart,
  description: '',
 },
]

function AboutUsSection() {
 const [currentStage, setCurrentStage] = React.useState(0)
 return (
  <div className="w-full h-full max-h-[850px] flex my-12 px-custom">
   <div className="max-w-[450px] full_hd_screen:max-w-[550px]  h-[750px] full_hd_screen:h-[850px] w-full flex flex-col justify-between full_hd_screen:space-y-5">
    {aboutusData.map((item, index) => (
     <React.Fragment key={item.id}>
      <div
       className={`flex  text-titleColor  items-center 
                                     px-6 full_hd_screen:px-8 py-16 full_hd_screen:py-20 cursor-pointer transition-all  ${
                                      currentStage !== index
                                       ? 'mr-4 bg-mainsecondarysecond rounded-lg'
                                       : 'bg-selectedSecondary rounded-l-lg'
                                     }`}
       onClick={() => setCurrentStage(index)}
      >
       <h3
        className={`${
         currentStage !== index ? `text-titleColor` : `text-statebluecolor`
        } text-3xl font-bold `}
       >
        {item.title}
       </h3>
      </div>
     </React.Fragment>
    ))}
   </div>
   {/* Content Wing */}
   <div className="relative  w-5/6 full_hd_screen:w-full max-h-[850px]">
    <TransitionGroup component={'div'}>
     <CSSTransition key={currentStage} timeout={300}>
      {(state) => (
       <>
        {aboutusData.map((item, index) => (
         <React.Fragment key={item.id}>
          {currentStage === index && (
           <React.Fragment>
            {currentStage === 3 ? (
             <div
              style={{
               ...transitionStyles[state],
               height: '100%',
               width: '100%',
               position: 'absolute',
               top: 0,
               left: 0,
              }}
              className={`p-10 flex items-center ${
               currentStage !== index
                ? 'bg-selectedSecondary rounded-lg'
                : 'bg-selectedSecondary rounded-t-lg rounded-r-lg'
              }`}
             >
              <Dialog>
               <>
                <div className="relative">
                 <img
                  src={item.image}
                  alt={item.title}
                  className={` h-full w-full object-cover rounded-lg`}
                 />
                 <DialogTrigger>
                  <button className="absolute bottom-10 left-1/2 -translate-x-1/2 px-4 py-2 bg-statebluecolor rounded-md text-white">
                   Preview
                  </button>
                 </DialogTrigger>
                </div>
               </>
               <DialogContent className="max-w-[1440px] h-fit p-0">
                <div className="w-auto max-h-[850px] flex items-center justify-center">
                 <img
                  src={item.image}
                  alt={item.title}
                  className={` h-full w-full ${
                   currentStage === 3 ? 'object-cover' : 'object-cover'
                  } rounded-lg`}
                 />
                </div>
               </DialogContent>
              </Dialog>
             </div>
            ) : (
             <div
              style={{
               ...transitionStyles[state],
               height: '100%',
               width: '100%',
               position: 'absolute',
               top: 0,
               left: 0,
              }}
              className={`p-10 ${
               currentStage === index
                ? index !== 1
                  ? 'bg-selectedSecondary rounded-r-lg rounded-b-lg'
                  : 'bg-selectedSecondary rounded-lg'
                : 'bg-mainsecondarysecond rounded-lg'
              }`}
             >
              <div className="h-full flex gap-16">
               <div className="w-full flex flex-col space-y-6 text-ternaryGrey font-medium ">
                <div className="w-full">
                 <img
                  src={item.image}
                  alt={item.title}
                  className={`h-[400px] w-full ${
                   currentStage === 3
                    ? 'object-fill'
                    : currentStage === 2
                    ? ' object-fill'
                    : 'object-cover'
                  } rounded-lg`}
                 />
                </div>
                <p className="text-justify text-xl overflow-y-auto whitespace-pre-line leading-relaxed">
                 {item.description}
                </p>
               </div>
              </div>
             </div>
            )}
           </React.Fragment>
          )}
         </React.Fragment>
        ))}
       </>
      )}
     </CSSTransition>
    </TransitionGroup>
   </div>
  </div>
 )
}

export default AboutUsSection
