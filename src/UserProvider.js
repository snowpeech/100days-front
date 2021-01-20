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
    const [storedUser, setStoredUser ]= useState(null) //changing storedUser to keep in here as state. not using local storage
    //token is stored in Local Storage
  const [token, setToken] =useLocalStorage('_token',""); //token has email, password, goal_id, user_id
// //pass setToken to login and signUp

  useEffect(()=>{
      console.log("USER PROVIDER USEEFFECT RUN token", token)
    // check if username stored in token is valid
    async function getUser(){
      try {
        // let { id } = decode(token); //token has email, password, goal_id, id (user's id)
        let decodedToken = decode(token)
        console.log(decodedToken,"DECODED TOKEN")
        let {id, goals} = decodedToken;
        console.log("ID AND GOALS?", id, goals)
        let currentUser = await ApiHelper.getUser(id);
        // setStoredUser(currentUser);
        // console.log("APP.js storedUser",storedUser)
        // setStoredUser(JSON.stringify(currentUser));
        console.log("before",currentUser[0])
        setStoredUser({...currentUser[0],goals});
        console.log("after",storedUser)
        // console.log("currentUser! in App", storedUser);
      } catch (err) {
          console.error("error",err)
        setStoredUser(null);
      }
    }
    getUser();
    
  },[token,setStoredUser]);


    return (
        <UserContext.Provider value ={{setToken, storedUser,setStoredUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;