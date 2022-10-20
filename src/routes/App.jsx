import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminProductos } from '../components/pages/AdminProductos';

// Components - Pages
import { Login } from '../components/pages/Login';
import { Productos } from '../components/pages/Productos';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='user/productos' element={<Productos />} />
          <Route path='admin/productos' element={<AdminProductos />} />
          {/* Cristian cambie el componente de abajo */}
          <Route path='admin/ventas' element={<AdminProductos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
