import { useState } from "react";

// Iconos
import { BsFillBagPlusFill, BsImages } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { RiPencilFill, RiDeleteBin4Fill } from "react-icons/ri";
import { HiIdentification } from "react-icons/hi";
// Componentes
import { NavbarLayoutAdmin } from "../layouts/NavbarLayoutAdmin";

// Helpers
import { arr } from "../../helpers/data";


export const AdminProductos = () => {

    const [data, setData] = useState(arr);
    const [dataModal, setDataModal] = useState([])

    // Inputs para edición
    const [inpNombre, setInpNombre] = useState("");
    const [inpDescripcion, setInpDescripcion] = useState("");
    const [inpStock, setInpStock] = useState("");
    const [inpImg, setInpImg] = useState("");
    const [inpCategoria, setInpCategoria] = useState("");

    const handleDescription = ({ id, descripcion, img }) => {
        // 0 -> id
        // 1 -> descripcion
        // 2 -> img
        setDataModal([id, descripcion, img])
    }

    const llenarCamposEdicion = ( item ) => {
        setDataModal([item.id])
        setInpNombre( item.nombre );
        setInpCategoria( item.categoria );
        setInpImg( item.img );
        setInpStock( item.stock );
        setInpDescripcion( item.descripcion );
    }

    const handleNombre = e => setInpNombre( e.target.value );
    const handleCategoria = e => setInpCategoria( e.target.value );
    const handleImg = e => setInpImg( e.target.value );
    const handleDescripcion = e => setInpDescripcion( e.target.value );
    const handleStock = e => setInpStock( e.target.value );
    

    return (
        <>
            <NavbarLayoutAdmin />
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
                                            <tr key={item.id}>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.nombre}</td>
                                                <td>{item.categoria}</td>
                                                <td>
                                                    <label htmlFor="imgFile">
                                                        <button
                                                            className="btn btn-purple"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#img-modal"
                                                            onClick={() => handleDescription(item)}
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
                                                        onClick={() => handleDescription(item)}
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
                                                        onClick={() => llenarCamposEdicion(item)}
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
            <div className="modal" tabIndex="-1" id="desc-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                            <h5 className="modal-title">Descripción <br /><HiIdentification /> {dataModal[0]}</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>{dataModal[1]}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" tabIndex="-1" id="img-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                            <h5 className="modal-title">Imagen <br /><HiIdentification /> {dataModal[0]}</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img className="img-fluid rounded" src={dataModal[2]} alt="img" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Edición */}
            <div className="modal" tabIndex="-1" id="edit-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                            <h5 className="modal-title">Edición <br /><HiIdentification /> {dataModal[0]}</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-1 row">      
                                    <div className="col-6">
                                        <label htmlFor="nombre">Nombre</label>
                                        <input onChange={handleNombre} value={inpNombre} type="text" className="form-control" id="nombre" />    
                                    </div> 
                                    <div className="col-3">
                                        <label htmlFor="categoria">Categoria</label>
                                        <input onChange={handleCategoria} value={inpCategoria} type="text" className="form-control" id="categoria" />  
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="stock">Stock</label>
                                        <input onChange={handleStock} value={inpStock} type="text" className="form-control" id="stock" />    
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="descripcion">Descripción</label>
                                    <textarea onChange={handleDescripcion} value={inpDescripcion} type="text" className="form-control" id="descripcion"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="img">Selecciona una imagen</label>
                                    <input onChange={handleImg} type="file" className="form-control" id="img" />
                                </div>

                                <button type="submit" className="btn btn-primary">Editar</button>
                            </form>
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
