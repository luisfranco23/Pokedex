import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate} from 'react-router-dom'
import Home from './Home/Home'

const ProtectedRoutes = () => {

    const nameUser = useSelector(state => state.nameUser)

    if(nameUser.trim() === ''){
        return <Home />
    } else {
        return <Navigate to='/pokedex' />
    }
}

export default ProtectedRoutes