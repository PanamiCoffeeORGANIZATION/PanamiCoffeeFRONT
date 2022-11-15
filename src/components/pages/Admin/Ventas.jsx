import { NavbarLayoutAdmin } from "../../layouts/NavbarLayoutAdmin"
import { MdDateRange, MdEmail } from 'react-icons/md'
import { ProductCard } from "./components/ProductCard"
import { useEffect, useState } from "react"
import { getAllPurchases } from "../../../api/user"
import './style.css'


export const Ventas = () => {

  const [purchases, setPurchases] = useState([]);

  const getPurchases = async () => {
    setPurchases( await getAllPurchases() );
  }

  useEffect( () => {
    getPurchases();
  }, [])

  return (
    <>
      <NavbarLayoutAdmin />
      <div id='admin-ventas' className="bg-dark scroll">
        <div className="container">
          <div className="row text-center text-white pt-5">
            <h4>Historial de ventas</h4>
          </div>
          <div className="row">
            <p>
              <button className="btn btn-outline-yellow me-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFiltro" aria-expanded="false" aria-controls="collapseFiltro">
                Filtrar información
              </button>
            </p>
            <div className="collapse" id="collapseFiltro">
              <div className="card card-body text-bg-dark">
                <div className="input-group mb-3">
                  <span className="input-group-text text-bg-secondary" id="basic-addon1"><MdDateRange /></span>
                  <input type="text" className="form-control bg-dark text-white" placeholder="año-mes-dia" aria-label="Fecha" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text text-bg-secondary" id="basic-addon1"><MdEmail /></span>
                  <input type="email" className="form-control bg-dark text-white" placeholder="Correo electrónico" aria-label="Correo" aria-describedby="basic-addon1" />
                </div>
                <button className="btn btn-yellow ms-auto" style={{width:"150px"}}>Buscar</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col mt-3">
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th scope="col">Correo</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Cantidad Prs.</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    purchases.map(venta => (
                      <tr key={venta.id}>
                        <th scope="row">{venta.email}</th>
                        <td>{venta.date}</td>
                        <td>{venta.time}</td>
                        <td>{venta.cant}</td>
                        <td>${Number(venta.total).toLocaleString('en-US')}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}