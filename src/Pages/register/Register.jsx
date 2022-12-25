import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Signup } from "../../redux/auth/auth.action"
import "./register.css"

export default function Register() {
  const [creds,setCreds]=useState({})
  const dispatch=useDispatch()
  const {message}=useSelector(store=>store.auth)
  const navigate=useNavigate()
  const [file,setFile]=useState(null)

const handleChange=(e)=>{
  const {name,value}=e.target;
  setCreds({...creds,[name]:value})
}
const handleSubmit=async(e)=>{
e.preventDefault()

if(file){
  console.log(URL.createObjectURL(file),"src")
   const data= new FormData()
   const filename=Date.now()+creds.username;
   data.append("name",filename)
   data.append("file",file)
   creds.profilePic=filename;
   try{
    let response= await axios.post("http://localhost:8080/api/upload",data)
    console.log(response.data,"for image")
 
   }
   catch{
 
   }
  }




console.log(creds)
dispatch(Signup(creds))
}

useEffect(()=>{
  if(message=="user created"){
    navigate("/login")
  }
},[message])

    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
      <label>Profile Picture</label>
          <div className="registerPP">
          {file && 
      <img src={URL.createObjectURL(file)} alt=""/>}
            {/* <img
              src={decoded.prfilePic}
              alt=""
            /> */}
            <label htmlFor="fileInput">
              <i className="registerPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="registerPPInput"
              onChange={e=>setFile(e.target.files[0])} 
            />
          </div>
        <label>Username</label>
        <input className="registerInput" name="username" onChange={handleChange} type="text" placeholder="Enter your username..." />
        <label>Email</label>
        <input className="registerInput" name="email" onChange={handleChange} type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input className="registerInput" name="password" onChange={handleChange} type="password" placeholder="Enter your password..." />
        <button type="submit" className="registerButton">Register</button>
      </form>
       
    </div>
    )
}