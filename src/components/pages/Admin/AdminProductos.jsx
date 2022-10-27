import { useEffect, useState } from "react";

// Iconos
import { BsFillBagPlusFill, BsImages } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { RiPencilFill, RiDeleteBin4Fill } from "react-icons/ri";
import { HiIdentification } from "react-icons/hi";
// Componentes
import { NavbarLayoutAdmin } from "../../layouts/NavbarLayoutAdmin";

// Helpers
import { arr } from "../../../helpers/data";
import { Alert, Pagination } from "@mui/material";


export const AdminProductos = () => {

    const [data, setData] = useState(arr);
    const [dataModal, setDataModal] = useState([])
    const [reload, setReload] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [editAlert, setEditAlert] = useState(false);

    // Inputs para edición
    const [inpNombre, setInpNombre] = useState("");
    const [inpDescripcion, setInpDescripcion] = useState("");
    const [inpStock, setInpStock] = useState("");
    const [inpImg, setInpImg] = useState("");
    const [inpCategoria, setInpCategoria] = useState("");
    const [inpPrecio, setInpPrecio] = useState("")

    const handleDescription = ({ id, descripcion, img }) => {
        // 0 -> id
        // 1 -> descripcion
        // 2 -> img
        setDataModal([id, descripcion, img])
    }

    const llenarCamposEdicion = (item) => {
        setEditAlert( false );
        setDataModal([item.id])
        setInpNombre(item.nombre);
        setInpCategoria(item.categoria);
        setInpImg(item.img);
        setInpStock(item.stock);
        setInpPrecio(item.precio);
        setInpDescripcion(item.descripcion);
    }

    const openCreate = () => {
        setSuccessAlert(false);
        cleanInputs();
    }

    const cleanInputs = () => {
        setDataModal("");
        setInpNombre("");
        setInpCategoria("");
        setInpImg("");
        setInpStock("");
        setInpDescripcion("");
        setInpPrecio("");
    }

    const createProduct = e => {
        e.preventDefault();

        console.log("CREAR");

        const newProduct = {
            id: arr.length + 1,
            nombre: inpNombre,
            precio: inpPrecio,
            descripcion: inpDescripcion,
            img: "https://img.freepik.com/vector-premium/dibujos-animados-ilustracion-bolsa-compras-carrito-compras-diseno-estilo-lindo-camiseta-pegatina-elemento-logotipo_152558-9062.jpg",
            stock: inpStock,
            categoria: inpCategoria
        }
        arr.push(newProduct);
        setSuccessAlert(true);
        cleanInputs();
        setTimeout(() => { setSuccessAlert(false) }, 3000);
        setReload(!reload);
    }

    const editProduct = e => {
        e.preventDefault();

        const newProduct = {
            id: dataModal[0],
            nombre: inpNombre,
            precio: inpPrecio,
            descripcion: inpDescripcion,
            stock: inpStock,
            categoria: inpCategoria
        }

        arr.map((item, index) => {
            if (item.id === dataModal[0]) {
                newProduct.img = item.img,
                    arr[index] = newProduct;
                setReload(!reload);
            }
        });

        setEditAlert(true);
        setTimeout(() => { setEditAlert(false) }, 3000);
    }

    const handlePage = (e, newPage) => {
        console.log( newPage );
    }

    useEffect(() => {
        setData(arr);
    }, [reload])

    const handleNombre = e => setInpNombre(e.target.value);
    const handleCategoria = e => setInpCategoria(e.target.value);
    const handleImg = e => setInpImg(e.target.value);
    const handleDescripcion = e => setInpDescripcion(e.target.value);
    const handlePrecio = e => setInpPrecio(e.target.value);
    const handleStock = e => setInpStock(e.target.value);


    return (
        <>
            <NavbarLayoutAdmin />
            <div id="admin-productos" className="bg-dark scroll pb-5" style={{ height: "calc(100vh - 68px)", overflowY:"scroll"}}>
                <div className="container">
                    <div className="row">
                        <button
                            onClick={openCreate}
                            style={{ width: "200px" }}
                            data-bs-toggle="modal"
                            data-bs-target="#create-modal"
                            className="btn btn-purple mt-5"
                        ><BsFillBagPlusFill style={{ marginTop: "-6px", marginRight: "7px" }} />
                            Agregar producto
                        </button>
                    </div>
                    <div className="row">
                        <div className="col mt-5">
                            <table className="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Categoria</th>
                                        <th scope="col">Precio</th>
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
                                                <td>${Number(item.precio).toLocaleString('en-US')}</td>
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
                                                        className="btn btn-primary m-1"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-modal"
                                                        onClick={() => llenarCamposEdicion(item)}
                                                    >
                                                        <RiPencilFill />
                                                    </button>
                                                    <button className="btn btn-danger m-1">
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
                    <div style={{background: "#2c3034"}} className="row w-auto rounded p-2 d-flex justify-content-center align-items-center">
                        <Pagination onChange={handlePage} count={10} color="secondary" className="w-auto"/>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <div className="modal fade" tabIndex="-1" id="desc-modal">
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
            <div className="modal fade" tabIndex="-1" id="img-modal">
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
            {/* Modal Agregar */}
            <div className="modal fade" data-target="myModalCreate" tabIndex="-1" id="create-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                            <h5 className="modal-title"><BsFillBagPlusFill /> Crear producto</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-1 row">
                                    <div className="col-8">
                                        <label htmlFor="nombre">Nombre</label>
                                        <input onChange={handleNombre} value={inpNombre} type="text" className="form-control" id="nombre" />
                                    </div>
                                    <div className="col-4">
                                        <label htmlFor="categoria">Categoria</label>
                                        <input onChange={handleCategoria} value={inpCategoria} type="text" className="form-control" id="categoria" />
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="descripcion">Descripción</label>
                                    <textarea onChange={handleDescripcion} value={inpDescripcion} type="text" className="form-control" id="descripcion"></textarea>
                                </div>
                                <div className="mb-1 row">
                                    <div className="col-8">
                                        <label htmlFor="img">Precio</label>
                                        <input onChange={handlePrecio} value={inpPrecio} type="text" className="form-control" id="img" />
                                    </div>
                                    <div className="col-4">
                                        <label htmlFor="stock">Stock</label>
                                        <input onChange={handleStock} value={inpStock} type="text" className="form-control" id="stock" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="img">Selecciona una imagen</label>
                                    <input onChange={handleImg} type="file" className="form-control" id="img" />
                                </div>

                                {
                                    successAlert ?
                                        <Alert variant="filled" severity="success">
                                            Producto creado con exito
                                        </Alert>
                                        :
                                        <button
                                            onClick={createProduct}
                                            type="submit"
                                            className="btn btn-primary"
                                        // disabled={!inpNombre || !inpCategoria || !inpDescripcion || !inpStock || !inpPrecio}
                                        >Crear producto</button>
                                }
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Edición */}
            <div className="modal fade" tabIndex="-1" id="edit-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                            <h5 className="modal-title">Edición <br /><HiIdentification /> {dataModal[0]}</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-1 row">
                                    <div className="col-8">
                                        <label htmlFor="nombre">Nombre</label>
                                        <input onChange={handleNombre} value={inpNombre} type="text" className="form-control" id="nombre" />
                                    </div>
                                    <div className="col-4">
                                        <label htmlFor="categoria">Categoria</label>
                                        <input onChange={handleCategoria} value={inpCategoria} type="text" className="form-control" id="categoria" />
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="descripcion">Descripción</label>
                                    <textarea onChange={handleDescripcion} value={inpDescripcion} type="text" className="form-control" id="descripcion"></textarea>
                                </div>
                                <div className="mb-1 row">
                                    <div className="col-8">
                                        <label htmlFor="img">Precio</label>
                                        <input onChange={handlePrecio} value={inpPrecio} type="number" className="form-control" id="img" />
                                    </div>
                                    <div className="col-4">
                                        <label htmlFor="stock">Stock</label>
                                        <input onChange={handleStock} value={inpStock} type="text" className="form-control" id="stock" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="img">Selecciona una imagen</label>
                                    <input onChange={handleImg} type="file" className="form-control" id="img" />
                                </div>
                                {
                                    editAlert ?
                                        <Alert variant="filled" severity="success">
                                            Producto actualizado con exito
                                        </Alert>
                                        :
                                        <button
                                            onClick={editProduct}
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={!inpNombre || !inpCategoria || !inpDescripcion || !inpStock || !inpPrecio}
                                        >Editar producto</button>
                                }
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
