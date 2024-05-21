import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import UserDashboard from './components/UserDashboard'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import EditVideo from './components/EditVideo'
import DeleteVideo from './components/DeleteVideo'
import AddVideo from './components/AddVideo'
import Home from './components/Home'

const App = () => {
  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/userdashboard' element={<UserDashboard />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/admindashboard' element={<AdminDashboard />} />
        <Route path='/addvideo' element={<AddVideo />} />
        <Route path='/editvideo/:id' element={<EditVideo />} />
        <Route path='/deletevideo/:id' element={<DeleteVideo />} />
      </Routes>
    </>
  )
}

export default App