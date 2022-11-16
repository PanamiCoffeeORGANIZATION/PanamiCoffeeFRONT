import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminProductos } from '../components/pages/Admin/AdminProductos';
import { Ventas } from '../components/pages/Admin/Ventas';
import { useEffect, useState } from 'react'
import UserContext from '../context/UserContext';

// Components - Pages
import { Login } from '../components/pages/Auth/Login';
import { Register } from '../components/pages/Auth/Register';
import { Productos } from '../components/pages/User/Productos';
import { NoneValidation } from '../components/pages/components/Errors/NoneValidation';
import { Error404 } from '../components/pages/components/Errors/404';
import { validateToken } from '../helpers/validateToken';
import { FullScreenPlaceholder } from '../components/layouts/Placeholders/FullScreenPlaceholder';
import { Home } from '../components/pages/Home';


function App() {

  const [isLogged, setIsLogged] = useState({ auth: false, role: "" });
  const [loading, setLoading] = useState(true);

  const validate = async () => {

    if (localStorage.getItem("token")) {
      const { ok, token, user } = await validateToken(localStorage.getItem("token"));
      ok ? setIsLogged({ auth: true, role: user.role })
        : setIsLogged({ auth: false, role: "" })

    }
    else {
      setIsLogged({ auth: false, role: "" })
    }

    setLoading(false);
  }

  useEffect(() => {
    validate();
  }, [])

  return (

    loading ?
      <FullScreenPlaceholder />
      :
      <UserContext.Provider value={{ isLogged, setIsLogged }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            {
              !isLogged.auth ?
                <>
                  <Route path='login' element={<Login />} />
                  <Route path='signup' element={<Register />} />
                  <Route path='user/productos' element={<Productos />} />
                  <Route path='/*' element={<Error404 />} />
                </>
                :
                <>
                  {/* USER ROUTES */}
                  <Route path='user/productos' element={<Productos />} />
                  {/* ADMIN ROUTES */}
                  <Route path='admin/productos' element={isLogged.role === "ADMIN_ROLE" ? <AdminProductos /> : <Error404 />} />
                  <Route path='admin/ventas' element={isLogged.role === "ADMIN_ROLE" ? <Ventas /> : <Error404 />} />

                  {/* Errors */}
                  <Route path='error/nonevalidation' element={<NoneValidation />} />
                </>
            }

          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
  )
}

export default App;