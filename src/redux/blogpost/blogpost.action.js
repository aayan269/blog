import axios from "axios"
import { GETDATA, POSTDATA, SIDEDATA, SINGLEDELETE, SINGLEGET } from "./blogpost.types"


export const getblogs=(search)=>async(dispatch)=>{
    //console.log("calling")
    try{
        let response=await axios.get('http://localhost:8080/post'+search)
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

        let response=await axios.post('http://localhost:8080/post',creds,{
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

        let response=await axios.delete(`http://localhost:8080/post/${id}`,{
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

        let response=await axios.put(`http://localhost:8080/post/${data.id}`,{title:data.title,desc:data.desc},{
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
        let response=await axios.get('http://localhost:8080/post')
        console.log(response.data)
        dispatch({type:SIDEDATA,payload:response.data})
    }
    catch(e){
console.log(e.message)
    }
}




export const singleblog=(id)=>async(dispatch)=>{

    try{
        let response=await axios.get(`http://localhost:8080/post/${id}`)
        console.log("action",response.data)
        dispatch({type:SINGLEGET,payload:response.data})

    }
    catch(e){
        console.log(e.message);
    }
    
}