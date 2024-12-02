import React, { createContext, useState } from "react";

export const UserRoleContext = createContext({
  role: "",
  user: "",
  setUser: () => {},
  setRole: () => {},
});

function UserRoleContextProvider({ children }) {
  /* for checking login components */
   const [user, setUser] = useState(null);
   const [role, setRole] = useState(null);
  /**** */

  /* This are dummy data. Call dispatch this data from backend. */
    // const [user, setUser] = useState({
    //   username: "we",
    //   id: "2as",
    // });
    // const [role, setRole] = useState("admin");

  return (
    <UserRoleContext.Provider value={{ user, role, setUser, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export default UserRoleContextProvider;
