import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { deleteblog, singleblog, updateblog } from "../../redux/blogpost/blogpost.action";
import "./singlePost.css";
import { useState } from "react";

export default function SinglePost() {
  const params=useParams();
  //console.log(params.id);
  const {token}=useSelector(store=>store.auth)
  const dispatch=useDispatch()
const {data,message}=useSelector(store=>store.blog)
const navigate=useNavigate()
const [title,setTitle]=useState("")
const [desc,setDesc]=useState("")
const [updateMode,setUpdateMode]=useState(false)
// console.log("hii",data)

  useEffect(()=>{
dispatch(singleblog(params.id))

  },[params.id])

  
  // console.log("http://localhost:8080/images/"+(data.photo)+(".jpeg"));

 const handleDelete=()=>{
console.log(data._id,"del")
dispatch(deleteblog(data._id))
 }
  
const handleUpdate=()=>{

  setTitle(data.title)
  setDesc(data.desc)
  setUpdateMode(true)
}

const postUpdate=()=>{
  const id=data._id
  console.log({id,title,desc})
  dispatch(updateblog({id,title,desc}))
   window.location.reload();
}

 if(message==="post has been deleted"){
  //navigate()
  navigate("/")
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {data.photo && (
 <img
 className="singlePostImg"
 src={"http://localhost:8080/images/"+(data.photo)+(".jpeg")}
 alt=""
/>
        )}
       {updateMode?<input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} autoFocus className='singlePostTitleInput'/>:(

<h1 className="singlePostTitle">
          {data.title}
          {token && jwt_decode(token).username==data?.username ? (
            <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit" onClick={handleUpdate}></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
          </div>
          ):""}
        </h1>


)}
        
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              {/* <Link className="link" to="/posts?username=Safak"> */}
                {data.username}
              {/* </Link> */}
            </b>
          </span>
          <span>{new Date(data.createdAt).toDateString()}</span>
        </div>
        {updateMode?<textarea value={desc} onChange={(e)=>setDesc(e.target.value)} className="singlePostDescInput" />:(
          <p className="singlePostDesc">
         {data.desc}
        </p>
        )}
        {
          updateMode?  <button className="singlePostupdate" onClick={postUpdate}>Update</button>:""
        }
      
      </div>
    </div>
  );
}