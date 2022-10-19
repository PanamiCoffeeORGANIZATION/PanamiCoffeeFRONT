import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components - Pages
import { Login } from '../components/pages/Login';
import { Productos } from '../components/pages/Productos';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='productos' element={<Productos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
