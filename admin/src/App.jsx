import './App.css'
import Login from "./pages/Login"
import Signup from "./pages/SignUp"
import Admin from "./pages/Admin"
import { Routes, Route, Navigate } from "react-router-dom"



function App() {




  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to='/login' replace />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </>
  )
}

export default App
