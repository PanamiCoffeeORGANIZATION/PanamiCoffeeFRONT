import { useEffect, useState } from "react";


export const ProductoItem = (props) => {
    const { addProduct, removeProduct, data, index, carrito = [] } = props;

    const [deleteSelect, setDeleteSelect] = useState(false);

    useEffect(() => {
        setDeleteSelect(false)
        carrito.map(item => {
            item.id === data.id 
            ? setDeleteSelect(true)
            : null
        })
    }, [carrito])

    const handleDelete = ( item ) => {
        setDeleteSelect( false )
        removeProduct( item )
    }

    return (
        <div className="col-md-4 col-sm-6 mb-5" key={index}>
            <div className="card card-producto position-relative">
                <img src={data.img} className="card-img-top" alt="greta" />
                <div className="card-body text-white text-white">
                    <h5 className="card-title">{data.nombre}</h5>
                    <p className="card-text"><i>{data.descripcion}</i></p>
                    <small>{data.stock}</small>
                    {
                        !deleteSelect
                            ?
                            <a href="#" id={data.id} className="btn btn-purple my-2 add-product" onClick={() => addProduct(data)}>
                                Agregar producto
                            </a>
                            :
                            <a href="#" id={data.id} className="btn btn-warning my-2 add-remove" onClick={() => handleDelete(data)}>
                                Eliminar producto
                            </a>
                    }
                </div>
                <p className="price">$ {data.precio}</p>
            </div>
        </div>
    )
}
