import React from 'react'
import {Link} from "react-router-dom"
import "./post.css"
export default function Post({post}) {
  //console.log("http://localhost:8080/images/"+(post.photo)+(".jpeg"));
  return (
    <div className='post'>
<img className='postImg' src= {("http://localhost:8080/images/"+(post.photo)+(".jpeg")) || ("http://localhost:8080/images/"+(post.photo)+(".png"))}        />
   <div className='postInfo'>
    <div className='postcats'>
        <span className='postcat'>{post.category}</span>
        {/* <span className='postcat'>LifeStyle</span> */}
    </div>
    <Link to={`/post/${post._id}`}>
    <span className='postTitle'>{post.title}</span>
    </Link>
    <hr/>
    <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>
   </div>
   <p className='postDesc'> {post.desc}</p>
    </div>
  )
}
