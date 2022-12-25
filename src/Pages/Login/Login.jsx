import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./Login.css";
import { useEffect } from "react";
import { login } from "../../redux/auth/auth.action";

export default function Login() {
  const [creds,setCreds]=useState({})
  const dispatch=useDispatch()
  const {isAuth,token}=useSelector(store=>store.auth)
  const navigate=useNavigate()

const handleChange=(e)=>{
  const {name,value}=e.target;
  setCreds({...creds,[name]:value})
}
const handleSubmit=(e)=>{
e.preventDefault()
console.log(creds)
dispatch(login(creds))
}

useEffect(()=>{
 if(token){
  var decoded = jwt_decode(token);
  console.log(decoded)
  if(decoded.role=="users"){
    navigate("/")
  }
  else{
    navigate("/settings")
  }
 }
},[isAuth])
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input className="loginInput" name="email" onChange={handleChange} type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input className="loginInput" name="password" onChange={handleChange} type="password" placeholder="Enter your password..." />
        <button type="submit" className="loginButton">Login</button>
      </form>
      <Link to='/register'>New User? register here</Link>
        {/* <button className="loginRegisterButton">Register</button> */}
    </div>
  );
}