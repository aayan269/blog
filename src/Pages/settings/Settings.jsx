import "./settings.css";
import Sidebar from "../sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { deleteUser, getUsers, updateUser } from "../../redux/auth/auth.action";
import {
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useEffect } from "react";
export default function Settings() {
const {token,data}=useSelector(store=>store.auth)
const {wholedata}=useSelector(store=>store.blog)
const [creds,setCreds]=useState({})
const [file,setFile]=useState(null)
const dispatch=useDispatch()
const navigate=useNavigate()






const handleChange=(e)=>{
const {name,value}=e.target;
setCreds({...creds,[name]:value})
}

if(token){
  var decoded = jwt_decode(token);
 creds.id=decoded.id
}
if(data){
  console.log(wholedata)
}
//console.log(decoded,"pra");

useEffect(()=>{
  dispatch(getUsers())
},[])



const handleSubmit=async(e)=>{
  e.preventDefault()
  console.log(creds)
   if(file){
   console.log(URL.createObjectURL(file),"src")
    const data= new FormData()
    const filename=Date.now()+file.name;
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
 
  dispatch(updateUser(creds))

  };

const handleDelete=()=>{
// console.log("object");
 dispatch(deleteUser(decoded.id))
}





  return (
    <>
    {decoded.role=="users"?
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={handleDelete}>Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
          {file && 
      <img src={URL.createObjectURL(file)} alt=""/>}
            {/* <img
              src={decoded.prfilePic}
              alt=""
            /> */}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={e=>setFile(e.target.files[0])} 
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder="Safak" name="username" onChange={handleChange} />
          <label>Email</label>
          <input type="email" placeholder="safak@gmail.com" name="email" onChange={handleChange} />
          {/* <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange={handleChange} /> */}
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>:
       <TableContainer >
       <Table variant='simple' mt={"150px"}>
         <TableCaption>Users List</TableCaption>
         <Thead>
           <Tr>
             <Th>username</Th>
             <Th>email</Th>
             <Th >ProfilePic</Th>
             <Th><Button>Delete</Button></Th>
           </Tr>
         </Thead>
         <Tbody>
           {
            data?.map((el)=>(
<Tr key={el._id}>
             <Td>{el.username}</Td>
             <Td>{el.email} </Td>
             <Td><img style={{width:"40px",height:"40px",borderRadius:"50%",objectFit:"cover"}} src={"http://localhost:8080/images/"+(el.profilePic)+(".jpeg")}  /></Td>
             <Td><Button><DeleteIcon/></Button></Td>
           </Tr>
            ))
           }
           

         </Tbody>
         
       </Table>
     </TableContainer>
        }
        </>
  );
}