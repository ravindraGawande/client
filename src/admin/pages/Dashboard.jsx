import React, { useEffect, useState } from 'react'
import useDymanicForm from '../../hooks/useDymanicForm'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomer, clientHistoryFilter, getAllCustomers, getHistory, placOrder } from '../../redux/action/adminActions'
import { toast } from 'react-toastify'
import { filterHistory, invalidate, logout, } from '../../redux/slice/adminSlice'


const Dashboard = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [selectedUser, setSelectedUser] = useState()
    const { loading, error, customerAdded, customers, orderPlaced, history } = useSelector(state => state.admin)
    const handleSubmit = () => {
        dispatch(addCustomer(STATE))
    }
    const CONFIG = [
        { fieldName: "fname", type: "text" },
        { fieldName: "address", type: "text" },
        { fieldName: "mobile", type: "text" },
        {
            fieldName: "Add New Customer",
            type: "submit",
            onClick: handleSubmit
        },
    ]
    const [UI, STATE, PRE] = useDymanicForm(CONFIG)
    const handleOrder = () => {
        dispatch(placOrder({ ...ORDER_STATE, userId: selectedUser.id }))
    }
    const [ORDER_UI, ORDER_STATE, ORDER_PRE] = useDymanicForm([
        { fieldName: "jars", type: "number" },
        { fieldName: "date", type: "date" },
        // { fieldName: "price", type: "25" },
        {
            fieldName: "Add New Order",
            type: "submit",
            onClick: handleOrder
        },
    ])

    useEffect(() => {
        if (customerAdded) {
            console.log("customer added ")
            dispatch(invalidate())
            dispatch(getAllCustomers())
        }
    }, [customerAdded])
    useEffect(() => {
        dispatch(getAllCustomers())
    }, [])
    useEffect(() => {
        if (orderPlaced) {
            toast.success("order placed success")
            dispatch(invalidate())
        }
    }, [orderPlaced])




    const MONTHS = ["january", "february", "march", "April", "may", "jun", "july", "Agust", "septebar", "february", "Octoer", "Navber", "Decmber",]

    if (loading) return <span className="loading loading-spinner loading-md"></span>

    return <>
        <div className='mt-10 text-end'>
            <button onClick={e => dispatch(logout())} className="btn btn-error">Logout</button>
        </div>
        <div className='text-end my-10'>
            <button className="btn btn-primary" onClick={() => window.my_modal_3.showModal()}>Add Customer</button>
        </div>
        <div>
            <div className="overflow-x-auto">
                <table className="table border-2">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>address</th>
                            <th>mobile</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers && customers.map((item, i) => <tr>
                            <td>{i + 1}</td>
                            <td>{item.fname}</td>
                            <td>{item.address}</td>
                            <td>{item.mobile}</td>
                            <td>
                                <button onClick={() => { setSelectedUser(item), window.order.showModal() }} className="btn btn-primary mx-2">+ Order</button>
                                <button onClick={() => { dispatch(getHistory(item.id)), setSelectedUser(item), setShow(true) }} className="btn  mx-2">History</button>
                                <button className="btn btn-outline btn-error">Delete</button>
                            </td>
                        </tr>)}
                    </tbody>


                </table>
            </div>
        </div>

        <dialog id="my_modal_3" className="modal ">
            <form method="dialog" className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <h3 className="font-bold text-lg">Add New Customer</h3>
                <div>
                    {UI}
                </div>
            </form>
        </dialog>

        <dialog id="order" className="modal">
            <form method="dialog" className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <h3 className="font-bold text-lg">Add New Order</h3>
                {ORDER_UI}
            </form>
        </dialog>

        {/* history modal */}
        <dialog id="orderHistor" className={`modal ${show && "modal-open"} `}>
            <form method="dialog" className="modal-box">
                <button onClick={e => setShow(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <h3 className="font-bold text-lg">History</h3>
                <select onChange={e => dispatch(clientHistoryFilter({
                    id: selectedUser.id,
                    month: e.target.value
                }))} className="select select-bordered rounded w-full my-4 ">
                    <option disabled selected>Choose Month</option>
                    {
                        MONTHS && MONTHS.map((item, i) => <option value={i}>{item}</option>)
                    }
                </select>

                {/* {ORDER_UI} */}
                <div className='my-4 font-bold flex mx-4 gap-4'>
                    <span>Bill</span>
                    <span>
                        {history && history.reduce((sum, item) => sum + +item.jars, 0) * 25}
                    </span>
                </div>

                {history && history.length === 0 && <h1 className='my-5'>No order found</h1>}
                {
                    history && history.map(item => <div className='border-2 border-gray-300 p-4 my-4 bg-yellow-200 '>
                        <h1>Jars:  {item.jars}</h1>
                        <h1>Date:  {item.date}</h1>
                        {/* <div>price:  {item.price}</div> */}

                    </div>)
                }

            </form>
        </dialog>
    </>
}

export default Dashboard
