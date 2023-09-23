import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Protected = ({ compo }) => {

    const { auth } = useSelector(state => state.admin)
    return auth ? compo : <div className='mt-10'>
        <h1 className=' font-bold'>Unauthorized Access</h1>
        <Link to="/" className=' btn btn-primary'>Login</Link>
    </div>
}

export default Protected