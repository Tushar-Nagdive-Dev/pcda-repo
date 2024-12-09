import React from 'react';

function UserPersonalInfo() {
    return (
        <div className="w-full flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
                <p className="font-raleway text-base">
                    User Name
                </p>
                <p className="font-raleway text-xl font-semibold bg-paragraphcolor/5 p-2">
                    Rajat Singh
                </p>
            </div>
            <div className="flex flex-col space-y-2">
                <p className="font-raleway text-base">
                    PCDA(O) AC. Number
                </p>
                <p className="font-raleway text-xl font-semibold bg-paragraphcolor/5 p-2">
                    96511941C
                </p>
            </div>
        </div>
    );
}

export default UserPersonalInfo;