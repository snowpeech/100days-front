import React,{useState} from 'react';
import {useHistory, userParams} from 'react-router-dom';
// import {useDispatch} from 'react-redux';
//import stuff from an actionCreator?


//import posttype from parameters?
const NewPostForm = ()=>{
    // const dispatch = userDispatch();
    const history = useHistory();
    const {postId} = userParams(); //may need to pull other things from Params, like posttype

    let INITIAL_STATE = {}//a bunch of text?
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange =(evt)=>{
        const {name,value} = evt.target;
        setFormData(formData => ({...formData, [name]:value}));
    }

    return (<div>
        <h1>help</h1>
    </div>)
}

export default NewPostForm;