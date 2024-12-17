import React, { useState } from 'react'
import TwoFaLayoutBackground from '../../../components/users/Authentication/TwoFALayoutBackground.jsx'
import TwoFATermsAndConditions from '../../../components/users/Authentication/TwoFATermsAndConditions.jsx'
import {
 Sheet,
 SheetContent,
 SheetHeader,
 SheetTitle,
 SheetFooter,
} from '@/components/ui/sheet'
import UserMobileOtpRegistration from '../../../components/users/Authentication/UserMobileOTPRegistration.jsx'
import UserMobileRegistration from '../../../components/users/Authentication/UserMobileRegistration.jsx'
import UserFirstTimeLogin from '../../../components/LoginForm/User/New/UserFirstTimeLogin.jsx'

function UserTwoFA() {
 const [isOpen, setIsOpen] = useState(true) // Dialog starts open
 const [isCheckedConditions, setCheckedConditions] = useState(false)
 const [isSheetOpen, setIsSheetOpen] = useState(false) // Sheet starts open

 // Close the dialog when the button is clicked
 const handleClose = () => {
  setIsOpen(false)
  setIsSheetOpen(true)
 }
 return (
  <TwoFaLayoutBackground>
   <TwoFATermsAndConditions
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    isCheckedConditions={isCheckedConditions}
    setCheckedConditions={setCheckedConditions}
    handleClose={handleClose}
   />
   <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} >
    <SheetContent
     onEscapeKeyDown={(e) => e.preventDefault()} // Prevent ESC key from closing the sheet
     onPointerDownOutside={(e) => e.preventDefault()} // Prevent overlay from closing the sheet
     isShowClose={false}
    >
     <UserFirstTimeLogin />
    </SheetContent>
   </Sheet>
   {/* <UserMobileRegistration
    isSheetOpen={isSheetOpen}
    setIsSheetOpen={setIsSheetOpen}
   /> */}
  </TwoFaLayoutBackground>
 )
}

export default UserTwoFA
