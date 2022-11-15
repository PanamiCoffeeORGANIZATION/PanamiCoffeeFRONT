import { Alert } from '@mui/material'
import { useEffect } from 'react';
import { useState } from 'react';
import { HiIdentification } from 'react-icons/hi'
import { putProduct } from '../../../../api/product';
import { ButtonSpinner } from '../../../UI/ButtonSpinner';

export const EditProduct = (props) => {
    const { dataModal, editAlert, product, categories, reload, setReload } = props;

    const [successAlert, setSuccessAlert] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [warning, setWarning] = useState({ ok: false, msg: "", type: "" })

    // INPUTS
    const [inpName, setInpName] = useState("");
    const [inpCategory, setInpCategory] = useState("");
    const [inpPrice, setInpPrice] = useState("");
    const [inpDescription, setInpDescription] = useState("");
    const [inpStock, setInpStock] = useState("");
    const [inpImg, setInpImg] = useState("");

    const editProduct = async () => {

        const values = {
            name: inpName,
            category: inpCategory,
            price: inpPrice,
            description: inpDescription,
            stock: inpStock,
            img: inpImg,
            id: product.id
        }

        setLoadingCreate(true);
        const { ok, msg, ...rest } = await putProduct(values);

        // Si la consulta tiene errores en la respuesta ( middlewares ) 
        if (rest.errors) {
            setWarning({
                ok: true,
                msg: `${rest.errors[0].msg} (${rest.errors[0].param})`,
                type: "error"
            })
        }
        // // Si la respuesta trae un ok 
        else if (ok) {
            setWarning({
                ok: true,
                msg: msg,
                type: "success"
            })
            setReload(!reload);
        }
        else {
            setWarning({
                ok: true,
                msg: msg,
                type: "error"
            })
        }

        setLoadingCreate(false);
        setTimeout(() => setWarning({ ok: false, msg: "", type: "" }), 5000);

    }

    useEffect(() => {
        if (!!product.name) {
            setInpName(product.name);
            setInpCategory(product.category._id);
            setInpPrice(product.price);
            setInpImg( product.img )
            product.description ? setInpDescription(product.description) : setInpDescription("");
            setInpStock(product.stock);
        }
    }, [product])

    return (
        <div className="modal fade" tabIndex="-1" id="edit-modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-white">
                    <div className="modal-header">
                        <h5 className="modal-title">Edición <br /><HiIdentification /> {dataModal[0]}</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            warning.ok &&
                            <Alert className='mb-2' variant="filled" severity={warning.type}>
                                {warning.msg}
                            </Alert>
                        }
                        <form>
                            <div className="mb-1 row">
                                <div className="col-7">
                                    <label htmlFor="name">Nombre</label>
                                    <input value={inpName} onChange={e => setInpName(e.target.value)} type="text" className="form-control" id="name" name='name' />
                                </div>
                                <div className="col-5">
                                    <label htmlFor="img">Imagen</label>
                                    <input type="file" className="form-control" id="img" name='img' />
                                </div>
                            </div>

                            <div className="mb-1">
                                <label htmlFor="category">Category</label>
                                <select value={inpCategory} onChange={e => setInpCategory(e.target.value)} className="form-select col-4" id='category' name='category'>
                                    <option value="none">Selecciona una categoría</option>
                                    {
                                        categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="mb-1">
                                <label htmlFor="description">Descripción</label>
                                <input value={inpDescription} onChange={e => setInpDescription(e.target.value)} as='textarea' type="text" className="form-control" id="description" name='description'></input>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-8">
                                    <label htmlFor="price">Precio</label>
                                    <input value={inpPrice} onChange={e => setInpPrice(e.target.value)} type="text" className="form-control" id="price" name='price' />
                                </div>
                                <div className="col-4">
                                    <label htmlFor="stock">Stock</label>
                                    <input value={inpStock} onChange={e => setInpStock(e.target.value)} type="text" className="form-control" id="stock" name='stock' />
                                </div>
                            </div>


                            <button
                                type="button"
                                onClick={editProduct}
                                className="btn btn-primary"
                            // disabled={!inpNombre || !inpCategoria || !inpDescripcion || !inpStock || !inpPrecio}
                            >
                                {
                                    loadingCreate ?
                                        <ButtonSpinner />
                                        :
                                        "Editar producto"
                                }
                            </button>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
