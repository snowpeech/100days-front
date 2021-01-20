import {useState,useEffect} from 'react'; 

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