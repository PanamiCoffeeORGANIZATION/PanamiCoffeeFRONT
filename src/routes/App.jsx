import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminProductos } from '../components/pages/Admin/AdminProductos';
import { Ventas } from '../components/pages/Admin/Ventas';
import { useEffect, useState } from 'react'

// Components - Pages
import { Login } from '../components/pages/Auth/Login';
import { Register } from '../components/pages/Auth/Register';
import { Productos } from '../components/pages/User/Productos';
import { NoneValidation } from '../components/pages/components/Errors/NoneValidation';
import { validateToken } from '../helpers/validateToken';
import { Error404 } from '../components/pages/components/Errors/404';
import { ScreenBlue } from '../components/layouts/Placeholders/ScreenBlue';
import UserContext from '../context/UserContext';


function App() {

  // 0 -> cargando
  // 1 -> loggeado
  // 2 -> No loggeado
  const [loggedIn, setLoggedIn] = useState(0);
  const [hasRole, setHasRole] = useState("none");

  useEffect(() => {
    async function userLoading() {
      if (!localStorage.getItem("token")) {
        setLoggedIn(2);
        return;
      }
      else {
        const { ok, token, user } = await validateToken();
        if (ok) {
          setLoggedIn(1);
          setHasRole(user.role)
        }
      }
    }

    userLoading();

  }, [])


  return (
    <UserContext.Provider value={{isLogged: loggedIn,hasRole}}>

      {
        loggedIn === 1 ?
          <BrowserRouter>
            <Routes>
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Register />} />
              <Route path='user/productos' element={<Productos />} />

              {/* ADMIN ROUTES */}
              <Route path='admin/productos' element={hasRole === "ADMIN_ROLE" ? <AdminProductos /> : <Error404 />} />
              <Route path='admin/ventas' element={hasRole === "ADMIN_ROLE" ? <Ventas /> : <Error404 />} />

              {/* Errors */}
              <Route path='error/nonevalidation' element={<NoneValidation />} />
            </Routes>
          </BrowserRouter>
          : loggedIn === 0 ? <ScreenBlue />
            :
            <>
              <BrowserRouter>
                <Routes>
                  <Route path='login' element={<Login />} />
                  <Route path='signup' element={<Register />} />
                  <Route path='user/productos' element={<Productos />} />
                  <Route path='*' element={<Error404 />} />
                </Routes>
              </BrowserRouter>
            </>
      }
    </UserContext.Provider>

  )
}

export default App
