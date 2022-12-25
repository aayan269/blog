import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import "./sidebar.css"
export default function Sidebar() {
  const {category}=useSelector(store=>store.blog)
 let data=[]
{category.map((el)=>(
  data.push(el.category)
))}

function removeDuplicates(arr) {
  var unique = [];
  arr.forEach(element => {
      if (!unique.includes(element)) {
          unique.push(element);
      }
  });
  return unique;
}
let newData=removeDuplicates(data)
//console.log(newData,"sidedata")
  return (
   <div className='sidebar'>
<div className='sidebarItem'>
    <span className='sidebarTitle'>ABOUT ME</span>
    <img className='sidebarImg'  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"      />
    <p>Lorem10jhvhjgbdjhasdkjsdhsjhdsjkcn</p>
</div>
<div className='sidebarItem'>
<span className='sidebarTitle'>CATEGORIES</span>
<ul className='sidebarList'>
  {newData?.map((el)=>(
    <Link to={`/?cat=${el}`}>
<li className='sidebarListItem'>{el}</li></Link>
  ))}
   
   
</ul>
</div>
<div className='sidebarItem'>
<span className='sidebarTitle'>FOLLOW US</span>
<div className='sidebarSocial'>
  <i className='sidebarIcon fab fa-facebook-square' ></i>
  <i className='sidebarIcon fab fa-twitter-square' ></i>
  <i className='sidebarIcon fab fa-pinterest-square' ></i>
  <i className='sidebarIcon fab fa-instagram-square' ></i>
</div>
</div>
   </div>
  )
}
