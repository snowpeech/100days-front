import React, { useState} from 'react';

//can pass in validations or use Formik..

const useFields =(initialState)=>{
    const [formData, setFormData] = useState(initialState);

    const handleChange=(evt)=>{        
        const {name,value} = evt.target;
        setFormData(formData => ({...formData, [name]:value}));
    }

    const resetFormData = () =>{
        setFormData(initialState)
    }

    return [formData, handleChange, resetFormData];
}

export default useFields;