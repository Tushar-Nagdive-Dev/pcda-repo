import React from 'react'
import LeftBorderWithTitle from '../../LeftBorderWithTitle'
import { Quote } from 'lucide-react'
import quoteIcon from '@/assets/icons/quotes.svg'
import appreciationsLetter from '@/assets/images/apperications_letter.svg'
import { useNavigate } from 'react-router-dom'

function LandingAppreciations() {
 const navigate = useNavigate()
 return (
  <div className="w-full flex flex-col space-y-12 bg-mainsecondarysecond px-custom py-24">
   <div className="w-full h-full flex justify-between">
    <div className="w-1/2 h-full flex flex-col justify-between space-y-12">
     <div className="flex flex-col space-y-12 mb-12">
      <LeftBorderWithTitle
       textSize="text-base"
       title="Appreciations"
       className="text-newprimaryColor text-3xl font-bold w-fit"
      />
      <p className="text-titleColor text-justify text-2xl">
       Appreciation Letters are welcomed as it helps in boosting the morals and
       confidence of the Officers &amp; Staff posted at PCDA(O).
      </p>
      <button
       type="button"
       className="flex items-center justify-center py-3 px-6 bg-statebluecolor text-white font-bold w-fit rounded-full"
       onClick={() => navigate('/appreciations')}
      >
       See All
      </button>
     </div>

     <div className="flex space-x-6 my-auto">
      <img src={quoteIcon} className="h-full" />
      <div className="flex flex-col space-y-3">
       <p className="text-[90px] text-mainprimarycolor font-bold leading-tight">
        2000+
       </p>
       <p className="text-mainprimarycolor font-bold">Appreciations</p>
      </div>
     </div>
    </div>

    <div className="w-1/2 h-full flex flex-row-reverse">
     <img
      src={appreciationsLetter}
      alt="Appreciations letter"
      className="w-auto h-auto max-h-full max-w-[550px] object-contain"
     />
    </div>
   </div>
  </div>
 )
}

export default LandingAppreciations
