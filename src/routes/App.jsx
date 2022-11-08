import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminProductos } from '../components/pages/Admin/AdminProductos';
import { Ventas } from '../components/pages/Admin/Ventas';

// Components - Pages
import { Login } from '../components/pages/Auth/Login';
import { Register } from '../components/pages/Auth/Register';
import { Productos } from '../components/pages/Productos';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Register />} />
          <Route path='user/productos' element={<Productos />} />
          <Route path='admin/productos' element={<AdminProductos />} />
          <Route path='admin/ventas' element={<Ventas />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
