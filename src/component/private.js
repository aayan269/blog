import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export default function Private({children}) {
    const {isAuth}=useSelector(store=>store.auth)

    if(!isAuth){
        return <Navigate to='/login'  />
    }

  return children;
}
