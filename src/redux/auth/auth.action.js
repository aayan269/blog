import axios from 'axios'
import { DELETE, GET, LOGIN_SUCCESS, LOGOUT, SIGNUP_SUCCESS } from './auth.types'

export const Signup=(creds)=>async(dispatch)=>{

    try{
        let response=await axios.post('https://blogbackend-yfc2.onrender.com/users/signup',creds)
        console.log(response.data)
        dispatch({type:SIGNUP_SUCCESS,payload:response.data})
    }
    catch(e){
        console.log(e)
    }
}

export const login=(creds)=>async(dispatch)=>{
    try{
        let response=await axios.post('https://blogbackend-yfc2.onrender.com/users/login',creds)
        console.log(response.data)
        dispatch({type:LOGIN_SUCCESS,payload:response.data.token})
    }catch(e){
        console.log(e)
    }
}

export const updateUser=(data)=>async(dispatch)=>{
    let token=localStorage.getItem("token")
  
    const {id,...creds}=data
    console.log(id,"check",creds,token)
    try{

        let response=await axios.put(`https://blogbackend-yfc2.onrender.com/users/${id}`,{creds},{
            headers:{
                "authorization":token
            }
        })

        console.log(response)
       
      
    }catch(e){

    }
}




export const deleteUser=(id)=>async(dispatch)=>{
    let token=localStorage.getItem("token")
  
   
    try{

        let response=await axios.delete(`https://blogbackend-yfc2.onrender.com/users/${id}`,{
            headers:{
                "authorization":token
            }
        })

        console.log(response)
       dispatch({type:DELETE})
      
    }catch(e){

    }
}

export const getUsers=()=>async(dispatch)=>{
    let token=localStorage.getItem("token")

    try{
        let response=await axios.get(`https://blogbackend-yfc2.onrender.com/users/`,{
            headers:{
                "authorization":token
            }
        })

        console.log(response.data)
       dispatch({type:GET,payload:response.data})

    }
    catch(e){

    }
}


export const logout=()=>({type:LOGOUT})