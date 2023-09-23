import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './admin/pages/Login'
import Dashboard from './admin/pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Protected from './admin/Protected'
const App = () => {



  return <>
    <BrowserRouter>
      <ToastContainer />
      {/* 
      <Routes>
        <Route path='/' element ={<> <Navbar /> <Outlet /> </>}>
         <Route index element={<Login />} />
          <Route path='admin/dash' element={<Dashboard />} />
        </Route>
      </Routes> 
    */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin/dash' element={<Protected compo={<Dashboard />} />} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App