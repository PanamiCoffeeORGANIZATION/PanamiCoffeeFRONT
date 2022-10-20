import { useState } from "react";

// Iconos
import { BsFillBagPlusFill, BsImages } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { RiPencilFill, RiDeleteBin4Fill } from "react-icons/ri";
// Componentes
import { NavbarLayout } from "../layouts/NavbarLayout"

// Helpers
import { arr } from "../../helpers/data";


export const AdminProductos = () => {

    const [data, setData] = useState(arr);

    return (
        <>
            <NavbarLayout />
            <div id="admin-productos" className="bg-dark" style={{ minHeight: "100vh", maxHeight: "auto" }}>
                <div className="container">
                    <div className="row">
                        <button style={{ width: "200px" }} className="btn btn-purple mt-5"><BsFillBagPlusFill style={{ marginTop: "-6px", marginRight: "7px" }} /> Agregar producto</button>
                    </div>
                    <div className="row">
                        <div className="col mt-5">
                            <table className="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Categoria</th>
                                        <th scope="col">Imagen</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map(item => (
                                            <tr>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.nombre}</td>
                                                <td>{item.categoria}</td>
                                                <td>
                                                    <label htmlFor="imgFile">
                                                        <button
                                                            className="btn btn-purple"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#img-modal"
                                                        >
                                                            <BsImages />
                                                        </button>
                                                        <input id="imgFile" type="file" style={{ display: "none" }} />
                                                    </label>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-secondary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#desc-modal"
                                                    >
                                                        <MdDescription />
                                                    </button>
                                                </td>
                                                <td>{item.stock}</td>
                                                <td>
                                                <button
                                                        className="btn btn-primary me-1"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-modal"
                                                    >
                                                        <RiPencilFill />
                                                    </button>
                                                    <button className="btn btn-danger ms-1">
                                                        <RiDeleteBin4Fill />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <div className="modal" tabindex="-1" id="desc-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Descripción</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" tabindex="-1" id="img-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Imagen</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" tabindex="-1" id="edit-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edición</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
