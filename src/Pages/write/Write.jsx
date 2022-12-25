import { useState } from "react";
import "./write.css";
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { postblog } from "../../redux/blogpost/blogpost.action";
import axios from "axios";
export default function Write() {
  const [creds,setCreds]=useState({})
  const [file,setFile]=useState(null)
  const dispatch=useDispatch()
  const {message,postdata}=useSelector(store=>store.blog)
  const navigate=useNavigate()
const handleChange=(e)=>{
const {name,value}=e.target;
setCreds({...creds,[name]:value})
}

const handleSubmit=async(e)=>{
e.preventDefault()
console.log(creds)
 if(file){
 console.log(URL.createObjectURL(file),"src")
  const data= new FormData()
  const filename=Date.now()+creds.title;
  data.append("name",filename)
  data.append("file",file)
  creds.photo=filename;
  try{
   let response= await axios.post("http://localhost:8080/api/upload",data)
   console.log(response.data,"for image")

  }
  catch{

  }
 }
dispatch(postblog(creds))

}


if(message==="blog ceated"){
  //navigate()
  console.log(postdata,"for routing");
  navigate(`/post/${postdata._id}`)
  }
  return (
    <div className="write">
      {file && 
      <img
      className="writeImg"
      src={URL.createObjectURL(file)}
      alt=""
    />
      
      }
      {/* <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      /> */} 
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput"  type="file" onChange={e=>setFile(e.target.files[0])}  style={{ display: "none" }} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            name="title"
            onChange={handleChange}
            autoFocus={true}
          />
          <input
            className="writeInput"
            placeholder="Category"
            type="text"
            name="category"
            onChange={handleChange}
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            name="desc"
           onChange={handleChange}
            autoFocus={true}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}