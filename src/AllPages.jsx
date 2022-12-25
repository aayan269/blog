import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Private from './component/private';
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login';
import Register from './Pages/register/Register'
import Settings from './Pages/settings/Settings';
import Single from './Pages/single/Single';
import Write from './Pages/write/Write';
export default function AllPages() {
  
  return (
    <Routes>
<Route   path="/" element={<Home/>}  />
<Route   path="/posts" element={<Home/>}  />
<Route   path="/register" element={<Register/>}  />
<Route   path="/login" element={<Login/>}  />
<Route   path="/post/:id" element={<Single/>}  />
<Route   path="/write" element={<Private><Write/></Private>}  />
<Route   path="/settings" element={<Private><Settings/></Private>}  />
    </Routes>
  )
}
