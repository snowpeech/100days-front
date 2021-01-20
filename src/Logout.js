import React, { useEffect,useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "./UserContext";

const Logout=()=>{
    const {setStoredUser, setToken} =useContext(UserContext)

    useEffect(()=>{
        setStoredUser(null);
        setToken("");
    },[setStoredUser,setToken])

//removes user from token. setLogout
return(<>Logging user out...
<Redirect to="/"/>
</>)
}

export default Logout;