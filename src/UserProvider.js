import React, {useEffect, useState } from 'react';
import UserContext from "./UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import ApiHelper from './ApiHelper'
import { decode } from "jsonwebtoken";


const UserProvider = ({children}) => {

    //used  in Routes: {setToken, storedUser,setStoredUser}
    //used in Navbar {storedUser}
    // const [currentUser,setCurrentUser] = useLocalStorage('user',null);

    //storedUser is in Context
  const [storedUser, setStoredUser ]= useState(null) //changing storedUser to keep in here as state
    //token is stored in Local Storage
  const [token, setToken] =useLocalStorage('_token',""); //token has email, password, goals [], user_id, (goals') start_days[]
// //pass setToken to login and signUp
  const [goalId, setGoalId] = useLocalStorage('_goalId',"");
  const [startDay, setStartDay] = useLocalStorage('_startDay',"");
  

  useEffect(()=>{

    getUser(token);

    async function getUser(token){
      console.log("GET USER TOKEN", token)
      try {
        let decodedToken = decode(token)
        
        if(decodedToken){
          console.log("TOKEN DECODED!", decodedToken)
          let {id, goals,start_days} = decodedToken;
          let currentUser = await ApiHelper.getUser(id);
          if(goals[0]){
            setGoalId(goals[0]);
            setStartDay(start_days[0])
          }
          setStoredUser({...currentUser[0]}); //set storedUser to uesrInfo 
          console.log("should be the new stored user", {...currentUser[0]})
        }
      } catch (err) {
          console.error("error",err)
        setStoredUser(null);
      }
    }
  },[token,setStoredUser]);


    return (
        <UserContext.Provider value ={{setToken, storedUser,setStoredUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;