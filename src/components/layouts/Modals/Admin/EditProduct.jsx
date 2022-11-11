import { Alert } from '@mui/material'
import { HiIdentification } from 'react-icons/hi'

export const EditProduct = ( props ) => {
    const { dataModal, editAlert } = props;
    return (
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
                                    <input type="text" className="form-control" id="nombre" />
                                </div>
                                <div className="col-4">
                                    <label htmlFor="categoria">Categoria</label>
                                    <input type="text" className="form-control" id="categoria" />
                                </div>
                            </div>
                            <div className="mb-1">
                                <label htmlFor="descripcion">Descripción</label>
                                <textarea type="text" className="form-control" id="descripcion"></textarea>
                            </div>
                            <div className="mb-1 row">
                                <div className="col-8">
                                    <label htmlFor="img">Precio</label>
                                    <input type="number" className="form-control" id="img" />
                                </div>
                                <div className="col-4">
                                    <label htmlFor="stock">Stock</label>
                                    <input type="text" className="form-control" id="stock" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="img">Selecciona una imagen</label>
                                <input type="file" className="form-control" id="img" />
                            </div>
                            {
                                editAlert ?
                                    <Alert variant="filled" severity="success">
                                        Producto actualizado con exito
                                    </Alert>
                                    :
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
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
    )
}
