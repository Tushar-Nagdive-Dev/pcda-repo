import React, {useState} from 'react';
import TwoFaLayoutBackground from "../../../components/users/Authentication/TwoFALayoutBackground.jsx";
import TwoFATermsAndConditions from "../../../components/users/Authentication/TwoFATermsAndConditions.jsx";
import UserMobileOtpRegistration from "../../../components/users/Authentication/UserMobileOTPRegistration.jsx";
import UserMobileRegistration from "../../../components/users/Authentication/UserMobileRegistration.jsx";


function UserTwoFA() {
    const [isOpen, setIsOpen] = useState(true); // Dialog starts open
    const [isCheckedConditions, setCheckedConditions] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false); // Sheet starts open

    // Close the dialog when the button is clicked
    const handleClose = () => {
        setIsOpen(false);
        setIsSheetOpen(true);
    };
    return (
        <TwoFaLayoutBackground>
            <TwoFATermsAndConditions isOpen={isOpen} setIsOpen={setIsOpen} isCheckedConditions={isCheckedConditions}
                                   setCheckedConditions={setCheckedConditions}
                                   handleClose={handleClose}/>
            <UserMobileRegistration isSheetOpen={isSheetOpen} setIsSheetOpen={setIsSheetOpen}/>
        </TwoFaLayoutBackground>
    );
}

export default UserTwoFA;