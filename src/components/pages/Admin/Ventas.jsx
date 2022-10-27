import { ventas } from "../../../helpers/ventas"
import { NavbarLayoutAdmin } from "../../layouts/NavbarLayoutAdmin"
import { RiShoppingBasketFill } from 'react-icons/ri'
import { MdDateRange, MdEmail } from 'react-icons/md'
import './style.css'
import { ProductCard } from "./components/ProductCard"
import { useState } from "react"


export const Ventas = () => {

  const [products, setProducts] = useState([])

  const handleProduct = (item) => {
    setProducts(item);
  }

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
              <button class="btn btn-outline-yellow me-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFiltro" aria-expanded="false" aria-controls="collapseFiltro">
                Filtrar información
              </button>
            </p>
            <div class="collapse" id="collapseFiltro">
              <div class="card card-body text-bg-dark">
                <div class="input-group mb-3">
                  <span class="input-group-text text-bg-secondary" id="basic-addon1"><MdDateRange /></span>
                  <input type="text" class="form-control bg-dark text-white" placeholder="año-mes-dia" aria-label="Fecha" aria-describedby="basic-addon1" />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text text-bg-secondary" id="basic-addon1"><MdEmail /></span>
                  <input type="email" class="form-control bg-dark text-white" placeholder="Correo electrónico" aria-label="Correo" aria-describedby="basic-addon1" />
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
                    <th scope="col">Fecha de compra</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Cantidad Prs.</th>
                    <th scope="col">Total</th>
                    <th scope="col">Historial productos</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    ventas.map(venta => (
                      <tr key={venta.id}>
                        <th scope="row">{venta.date}</th>
                        <td>{venta.email}</td>
                        <td>{venta.productsCant}</td>
                        <td>${Number(venta.total).toLocaleString('en-US')}</td>
                        <td><button
                          className="btn btn-purple"
                          data-bs-toggle="modal"
                          data-bs-target="#productsModal"
                          onClick={() => handleProduct(venta.products)}
                        ><RiShoppingBasketFill size={20} /></button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="productsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Productos Comprados</h1>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container">
                {
                  products.map(item => (
                    <ProductCard
                      key={item.id}
                      nombre={item.nombre}
                      precio={item.precio}
                      descripcion={item.descripcion}
                      img={item.img}
                      stock={item.stock}
                      categoria={item.categoria}
                    />
                  ))
                }
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}