import React, { useEffect } from 'react'
import useDymanicForm from '../../hooks/useDymanicForm'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/action/adminActions'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const dispatch = useDispatch()
    const { auth } = useSelector(state => state.admin)

    const navigate = useNavigate()

    const handleSubmit = () => {
        dispatch(login(state))
    }

    const config = [
        { fieldName: "email", type: "email" },
        { fieldName: "password", type: "password" },
        { fieldName: "Login", type: "submit", onClick: handleSubmit },
    ]

    const [ui, state, pre] = useDymanicForm(config)

    useEffect(() => {
        if (auth) {
            toast.success("Login  successfully")
            navigate("/admin/dash")
        }
    }, [auth])


    return <div className='w-1/2 mx-auto mt-10 border-2 border-gray-200 p-4'>

        {ui}
    </div>
}

export default Login