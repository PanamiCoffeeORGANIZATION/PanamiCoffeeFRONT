import { useEffect, useState } from 'react'
import './styles.css'

// Icons
import { MdRemoveShoppingCart } from "react-icons/md";

export const CarritoItem = (props) => {

    const { carrito, data, changeCarrito, totalValue, changeValue } = props;

    const [cantPerProduct, setCantPerProduct] = useState(1);
    const [stockAlert, setStockAlert] = useState(false);

    const addProducto = () => {
        if (cantPerProduct >= carrito.stock) {
            setStockAlert(true);
            setTimeout(() => {
                setStockAlert(false);
            }, 5000)
            return
        };

        carrito.cantidadProductos = cantPerProduct + 1;
        let valorPr = Number(carrito.price);
        changeValue(totalValue + valorPr);
        setCantPerProduct(cantPerProduct + 1)
    }

    const removeProduct = () => {

        if (cantPerProduct <= 1) return
        carrito.cantidadProductos = cantPerProduct - 1;
        let valorPr = Number(carrito.price);
        changeValue(totalValue - valorPr);
        setCantPerProduct(cantPerProduct - 1)
    }

    const deleteProduct = () => {
        changeValue(totalValue - cantPerProduct * Number(carrito.price))
        changeCarrito(data.filter(item => item !== carrito))
    }


    return (
        <>
            <div className="row">
                <div id="carritoItem" className="col p-0 mx-2 mt-2 d-flex justify-content-between rounded position-relative" style={{ background: "#525964" }}>
                    <div className="myItem">
                        <p className='price'>${ Number(carrito.price).toLocaleString('en','US') }</p>
                        <div className='counter'>
                            <button className='mas' onClick={addProducto}>+</button>
                            <p className='number'>{ cantPerProduct }</p>
                            <button className='menos' onClick={removeProduct}>-</button>
                        </div>
                        <div>
                            <img src={carrito.img} alt={carrito.name} />
                        </div>
                        <div className='name-delete'>
                            <p className='name'>{carrito.name}</p>
                            <MdRemoveShoppingCart className='remove' onClick={deleteProduct} />
                        </div>
                    </div>
                </div>
            </div>
            {
                stockAlert &&
                <div style={{ zIndex: "10000" }} className="row position-absolute bottom-0 start-0 end-0 mx-4 mb-2 bg-danger text-center p-2 rounded">
                    <p className='m-0'>No hay más disponibilidad para este producto</p>
                </div>
            }
        </>
    )
}

