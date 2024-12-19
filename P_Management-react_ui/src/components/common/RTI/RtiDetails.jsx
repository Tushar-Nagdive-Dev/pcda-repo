import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import RtiSectionTable from './RTISectionTable.jsx'
import Rticpio from './RTICPIO.jsx'
import RtiAppellateAuthority from './RTIAppellateAuthority.jsx'
import RTIIDASTable from './RTIIDASTable.jsx'
import RTIManualsTable from './RTIManualsTable.jsx'
import RtiWingsOfficerTable from './RTIWingsOfficerTable.jsx'
import RtiProcedure from './RTIProcedure.jsx'
import RTIRecords from './RTIRecords.jsx'
import RTISAOTable from './RTISAOTable.jsx'

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

const rtiTabLists = [
 {
  id: 'rti1',
  title: 'Sections',
 },
 {
  id: 'rti2',
  title: 'Records',
 },
 {
  id: 'rti3',
  title: 'CPIO',
 },
 {
  id: 'rti4',
  title: 'Appellate Authority',
 },
 {
  id: 'rti5',
  title: 'Manuals',
 },
 {
  id: 'rti6',
  title: 'Procedure',
 },
 //  {
 //   id: 'rti7',
 //   title: 'Citizens Charter',
 //  },
 {
  id: 'rti8',
  title: 'IDAS',
 },
 {
  id: 'rti9',
  title: 'Wing Officers',
 },
 {
  id: 'rti10',
  title: 'SAO',
 },
 //  {
 //   id: 'rti11',
 //   title: 'AAO',
 //  },
]

function RtiDetails() {
 const [currentStage, setCurrentStage] = React.useState(0)

 const scrollToSection = () => {
  const element = document.getElementById('rti-title')
  if (element) {
   element.scrollIntoView({ behavior: 'smooth' })
  }
 }
 return (
  <div className="flex">
   <div className="w-2/5 h-full flex flex-col space-y-5">
    {rtiTabLists.map((item, index) => (
     <React.Fragment key={item.id}>
      <div
       className={`flex  text-titleColor  items-center gap-14 py-10 px-10 cursor-pointer transition-all  ${
        currentStage !== index
         ? 'mr-4 bg-mainsecondarysecond rounded-lg'
         : 'bg-selectedSecondary rounded-l-lg'
       }`}
       onClick={() => {
        setCurrentStage(index)
        scrollToSection()
       }}
      >
       <h3
        className={`${
         currentStage !== index ? `text-titleColor` : `text-statebluecolor`
        } text-2xl font-bold max-w-[300px]`}
       >
        {item.title}
       </h3>
      </div>
     </React.Fragment>
    ))}
   </div>
   {/* Card Wing */}
   <div className="relative w-full">
    <TransitionGroup component={null}>
     <CSSTransition key={currentStage} timeout={300}>
      {(state) => (
       <>
        {currentStage === 0 && (
         <RtiSectionTable
          currentStage={currentStage}
          state={state}
          transitionStyles={transitionStyles}
         />
        )}

        {currentStage === 1 && (
         <RTIRecords
          currentStage={currentStage}
          state={state}
          transitionStyles={transitionStyles}
         />
        )}

        {currentStage === 2 && (
         <Rticpio
          currentStage={currentStage}
          state={state}
          transitionStyles={transitionStyles}
         />
        )}

        {currentStage === 3 && (
         <RtiAppellateAuthority
          currentStage={currentStage}
          state={state}
          transitionStyles={transitionStyles}
         />
        )}

        {currentStage === 4 && (
         <RTIManualsTable
          currentStage={currentStage}
          state={state}
          transitionStyles={transitionStyles}
         />
        )}

        {currentStage === 5 && (
         <RtiProcedure
          currentStage={currentStage}
          state={state}
          transitionStyles={transitionStyles}
         />
        )}

        {/* {currentStage === 6 && (
         <div
          style={{
           ...transitionStyles[state],
          }}
          className={`h-full overflow-y-auto p-10 ${
           currentStage === 1
            ? 'bg-selectedSecondary rounded-lg'
            : 'bg-selectedSecondary rounded-r-lg rounded-b-lg'
          }`}
         ></div>
        )} */}

        {currentStage === 6 && (
         <RTIIDASTable
          currentStage={currentStage}
          state={state}
          transitionStyles={transitionStyles}
         />
        )}

        {currentStage === 7 && (
         <RtiWingsOfficerTable
          currentStage={currentStage}
          state={state}
          transitionStyles={transitionStyles}
         />
        )}

        {currentStage === 8 && (
         <RTISAOTable
          currentStage={currentStage}
          state={state}
          transitionStyles={transitionStyles}
         />
        )}

        {currentStage === 9 && (
         <div
          style={{
           ...transitionStyles[state],
          }}
          className={`h-full overflow-y-auto p-10 ${
           currentStage === 1
            ? 'bg-selectedSecondary rounded-lg'
            : 'bg-selectedSecondary rounded-r-lg rounded-b-lg'
          }`}
         ></div>
        )}
       </>
      )}
     </CSSTransition>
    </TransitionGroup>
   </div>
  </div>
 )
}

export default RtiDetails
