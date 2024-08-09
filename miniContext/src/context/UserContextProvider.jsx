import React from "react";
import UserContext from "./UserContext";


const UserContextProvider=({children})=>{
    const [user,setUser]=React.useState(null)
    return(
        // You wrap your components with a Provider that belongs to the context. This Provider will supply the data to any component that needs it.
        <UserContext.Provider  value={{user,setUser}}> 
        {/* in value we pass the object of user and setUser */}
        {children}
        {/* All components yo u provide here has the access to value */}
        </UserContext.Provider>
    )

}

export default UserContextProvider