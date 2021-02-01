import {useState,useEffect} from 'react'; 
/* local storage hook returning a value by key, and a way to change the value in local storage 
ex: const [token, setToken] =useLocalStorage('_token',"") */

const useLocalStorage =(key, defaultValue)=>{
    const initialValue = localStorage.getItem(key) || defaultValue;

    const [item, setItem]=useState(initialValue);

    useEffect(()=>{
            
        if(!item){
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key,item);
        }
    },[item, key])

    return [item, setItem];
}

export default useLocalStorage;