import {createContext, useState} from "react";

export const DemoUserFlowContext = createContext({
    isRegisteredUser: "",
    setIsRegisteredUser: () => {},
});

function DemoUserFlowPurposeContext({children}) {
    const [isRegisteredUser, setIsRegisteredUser] = useState(false);
    return (
        <DemoUserFlowContext.Provider value={{
            isRegisteredUser,
            setIsRegisteredUser
        }}>
            {children}
        </DemoUserFlowContext.Provider>
    )
}

export default DemoUserFlowPurposeContext