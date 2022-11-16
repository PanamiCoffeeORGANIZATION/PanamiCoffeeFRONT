import { useEffect, useState } from "react";

// Iconos
import { BsFillBagPlusFill, BsImages } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { RiPencilFill, RiDeleteBin4Fill } from "react-icons/ri";
import { HiIdentification } from "react-icons/hi";
// Componentes
import { NavbarLayoutAdmin } from "../../layouts/NavbarLayoutAdmin";
import { FullScreenPlaceholder } from "../../layouts/Placeholders/FullScreenPlaceholder";

// Helpers
import { arr } from "../../../helpers/data";
import { Alert, Pagination } from "@mui/material";
import { AddProduct } from "../../layouts/Modals/Admin/AddProduct";

// Api
import { getAllCategories } from "../../../api/category";
import { deleteProduct, getProductsByPage } from "../../../api/product";
import { getProductsByName } from "../../../api/search";
import { EditProduct } from "../../layouts/Modals/Admin/EditProduct";
import { AlertUI } from "../../UI/Alert";


export const AdminProductos = () => {

    const [data, setData] = useState(arr);
    const [dataModal, setDataModal] = useState([])
    const [reload, setReload] = useState(false);
    const [editAlert, setEditAlert] = useState(false);
    const [count, setCount] = useState(0);
    const [inpSearch, setInpSearch] = useState("");

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productEdit, setProductEdit] = useState({});

    const [loading, setLoading] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [warning, setWarning] = useState({ok: false, msg: "", type: ""});

    const handleSearch = async () => {
        if ( inpSearch.length === 0 ) return;

        setLoadingPage( false );
        setLoadingProducts( true );
        const result = await getProductsByName( inpSearch );
        setProducts( result.result );
        setLoadingProducts( false );
    }
    // Volver de la busqueda por producto
    const returnToAll = () => {
        setLoadingProducts( true );
        setLoadingPage( true );
        setInpSearch("");
        getApi();
    }

    const handleDescription = ({ name, description, img }) => {
        // 0 -> name
        // 1 -> descripcion
        // 2 -> img
        setDataModal([name, description, img])
    }

    const getApi = async () => {

        setCategories(await getAllCategories());
        const data = await getProductsByPage();
        setProducts(data.products);

        const stringCount = String(data.total / 5);
        const total = stringCount.split(".")[1] ? Number(stringCount.split(".")[0]) + 1 : Number(stringCount);

        setCount(total)
        setLoading(false);
        setLoadingProducts( false );
    }

    const handlePage = async (e, newPage) => {
        setLoadingProducts(true);
        const { products } = await getProductsByPage((newPage * 5) - 5);
        setProducts(products)
        setLoadingProducts(false);
    }

    const handleEdit = ( item ) => {

        handleDescription( item );
        setProductEdit( item );

    }

    const handleDelete = async id => {
        const { ok, msg } = await deleteProduct( id );
        ok ? 
        setWarning({ok: true, msg , type: "success"}) 
        :
        setWarning({ok: true, msg: "Hubo un error al eliminar el producto", type: "error"});
        setTimeout( () => setWarning({ok: false, msg: "", type: ""}), 3000)
        setReload( !reload );
    }

    useEffect(() => {
        getApi();
        setData(arr);
    }, [reload])


    return (
        <>
            {
                loading ?
                    <FullScreenPlaceholder />
                    :
                    <>
                        <NavbarLayoutAdmin />
                        <div id="admin-productos" className="bg-dark scroll pb-5" style={{ height: "calc(100vh - 68px)", overflowY: "scroll" }}>
                            <div className="container">
                                {
                                    warning.ok && <AlertUI text={warning.msg} type={warning.type} />
                                }
                                <div className="row">
                                    <button
                                        style={{ width: "200px" }}
                                        data-bs-toggle="modal"
                                        data-bs-target="#create-modal"
                                        className="btn btn-purple mt-5"
                                    ><BsFillBagPlusFill style={{ marginTop: "-6px", marginRight: "7px" }} />
                                        Agregar producto
                                    </button>
                                </div>
                                {/* BUSCADOR ------------------------------ */}
                                <div className="row mt-4">
                                    <div className="col-lg-4 col-sm-8">
                                        <div className="input-group mb-3">
                                            <input value={inpSearch} onChange={ e => setInpSearch( e.target.value ) } type="text" className="form-control text-bg-dark" placeholder="Buscador de productos" aria-label="Buscador de productos" aria-describedby="button-addon2" />
                                            <button className="btn btn-secondary" type="button" id="button-addon2" onClick={handleSearch}>Buscar</button>
                                        </div>
                                    </div>
                                    {
                                        !loadingPage &&
                                        <div className="col-2">
                                            <button onClick={returnToAll} className="btn btn-primary">Volver</button>
                                        </div>
                                    }
                                </div>
                                {/* /BUSCADOR ------------------------------ */}
                                <div className="row">
                                    <div className="col mt-2">
                                        {
                                            loadingProducts ?
                                                <div className="d-flex justify-content-center my-5">
                                                    <div className="spinner-border text-secondary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                                :
                                                <table className="table table-dark table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Nombre</th>
                                                            <th scope="col">Categoria</th>
                                                            <th scope="col">Precio</th>
                                                            <th scope="col">Stock</th>
                                                            <th scope="col">Imagen</th>
                                                            <th scope="col">Descripción</th>
                                                            <th scope="col">Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            products.map(item => (
                                                                <tr key={item.id}>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.category.name}</td>
                                                                    <td>${Number(item.price).toLocaleString('en-US')}</td>
                                                                    <td style={item.stock <= 0 ? {color: "#dc3545"} : {color: "#77ff77"}}>{item.stock}</td>
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
                                                                    <td>
                                                                        <button
                                                                            className="btn btn-primary m-1"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#edit-modal"
                                                                            onClick={() => handleEdit(item)}
                                                                        >
                                                                            <RiPencilFill />
                                                                        </button>
                                                                        <button className="btn btn-danger m-1" onClick={ () => handleDelete(item.id)}>
                                                                            <RiDeleteBin4Fill />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                        }
                                    </div>
                                </div>
                                {
                                    loadingPage &&
                                    <div style={{ background: "#2c3034" }} className="row w-auto rounded p-2 d-flex justify-content-center align-items-center">
                                        <Pagination onChange={handlePage} count={count} color="secondary" className="w-auto" />
                                    </div>
                                }
                            </div>
                        </div>
                    </>
            }
            {/* Modal */}
            <div className="modal fade" tabIndex="-1" id="desc-modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                            <h5 className="modal-title">Descripción <br /><HiIdentification /> {dataModal[0]}</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                {
                                    dataModal[1] ? dataModal[1] : "(No hay descripción para este producto)"
                                }
                            </p>
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
            <AddProduct categories={categories} reload={reload} setReload={setReload}/>
            {/* Modal Edición */}
            <EditProduct dataModal={dataModal} reload={reload} setReload={setReload} editAlert={editAlert} product={productEdit} categories={categories}/>
        </>
    )
}
