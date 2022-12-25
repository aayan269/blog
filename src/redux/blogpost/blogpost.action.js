import axios from "axios"
import { GETDATA, POSTDATA, SIDEDATA, SINGLEDELETE, SINGLEGET } from "./blogpost.types"


export const getblogs=(search)=>async(dispatch)=>{
    //console.log("calling")
    try{
        let response=await axios.get('https://blogbackend-yfc2.onrender.com/post'+search)
        console.log(response.data)
        dispatch({type:GETDATA,payload:response.data})
    }
    catch(e){
console.log(e.message)
    }
}

export const postblog=(creds)=>async(dispatch)=>{
    let token=localStorage.getItem("token")
  try{

        let response=await axios.post('https://blogbackend-yfc2.onrender.com/post',creds,{
            headers:{
                "authorization":token
            }
        })

        console.log(response.data.message)
        dispatch({type:POSTDATA,payload:response.data})
    }catch(e){

    }
    
}

export const deleteblog=(id)=>async(dispatch)=>{
    let token=localStorage.getItem("token")
    try{

        let response=await axios.delete(`https://blogbackend-yfc2.onrender.com/post/${id}`,{
            headers:{
                "authorization":token
            }
        })

        console.log(response)
        dispatch({type:SINGLEDELETE,payload:response.data})
      
    }catch(e){

    }
}

export const updateblog=(data)=>async(dispatch)=>{
    let token=localStorage.getItem("token")
    try{

        let response=await axios.put(`https://blogbackend-yfc2.onrender.com/${data.id}`,{title:data.title,desc:data.desc},{
            headers:{
                "authorization":token
            }
        })

        console.log(response)
       
      
    }catch(e){

    }
}

export const category=()=>async(dispatch)=>{
    //console.log("calling")
    try{
        let response=await axios.get('https://blogbackend-yfc2.onrender.com/post')
        console.log(response.data)
        dispatch({type:SIDEDATA,payload:response.data})
    }
    catch(e){
console.log(e.message)
    }
}




export const singleblog=(id)=>async(dispatch)=>{

    try{
        let response=await axios.get(`https://blogbackend-yfc2.onrender.com/post/${id}`)
        console.log("action",response.data)
        dispatch({type:SINGLEGET,payload:response.data})

    }
    catch(e){
        console.log(e.message);
    }
    
}