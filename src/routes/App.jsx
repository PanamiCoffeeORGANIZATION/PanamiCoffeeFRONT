import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminProductos } from '../components/pages/Admin/AdminProductos';
import { Ventas } from '../components/pages/Admin/Ventas';
import { useEffect, useState } from 'react'

// Components - Pages
import { Login } from '../components/pages/Auth/Login';
import { Register } from '../components/pages/Auth/Register';
import { Productos } from '../components/pages/User/Productos';
import UserContext from '../context/UserContext'
import { getOneUser } from '../api/user';


function App() {

  const [user, setUser] = useState()


  return (
    <>
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Register />} />
          <Route path='user/productos' element={<Productos />} />
          <Route path='admin/productos' element={<AdminProductos />} />
          <Route path='admin/ventas' element={<Ventas />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    </>
  )
}

export default App
