import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { category, getblogs } from '../../redux/blogpost/blogpost.action'
import Posts from '../posts/posts'
import Sidebar from '../sidebar/sidebar'
import "./Home.css"
export default function Home() {
const dispatch=useDispatch()
const {wholedata}=useSelector(store=>store.blog)
const {search}=useLocation()

useEffect(()=>{
  dispatch(category())
},[])
//console.log("params",Location)
  useEffect(()=>{
    dispatch(getblogs(search))

    //console.log("hello",wholedata)
  },[search])
  return (
    <>
    <div className="Home">
        <Posts posts={wholedata}/>
        <Sidebar/>
    </div>
    
    </>
  )
}
