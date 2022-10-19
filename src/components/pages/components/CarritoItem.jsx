import { useEffect, useState } from 'react'
import './styles.css'

// Icons
import { MdRemoveShoppingCart } from "react-icons/md";

export const CarritoItem = (props) => {

    const { carrito, data, changeData, totalValue, changeValue } = props;

    const [cantPerProduct, setCantPerProduct] = useState(1);
    const [stockAlert, setStockAlert] = useState(false);
    const [formatPrice, setFormatPrice] = useState('');

    useEffect( () => {
        setFormatPrice(Number(carrito.precio).toLocaleString('en-US'))
    }, [carrito])

    const addProducto = () => {
        if (cantPerProduct >= 20) return;
        if (cantPerProduct >= carrito.stock){
            setStockAlert( true );
            setTimeout( () => {
                setStockAlert( false );
            }, 5000)
            return
        };
        
        carrito.cantidadProductos = cantPerProduct + 1;
        let valorPr = Number(carrito.precio);
        changeValue(totalValue + valorPr);
        setCantPerProduct(cantPerProduct + 1)
    }

    const removeProduct = () => {

        if (cantPerProduct <= 1) return
        if (cantPerProduct > 20) return

        carrito.cantidadProductos = cantPerProduct - 1;
        let valorPr = Number(carrito.precio);
        changeValue(totalValue - valorPr);
        setCantPerProduct(cantPerProduct - 1)
    }

    const deleteProduct = () => {
        changeValue(totalValue - cantPerProduct * Number(carrito.precio))
        changeData(data.filter(item => item !== carrito))
    }


    return (
        <>
            <div className="row">
                <div id="carritoItem" className="col mx-2 mt-2 d-flex justify-content-between rounded position-relative" style={{ background: "#525964" }}>
                    <div className="row">
                        <div className="col-5 p-0 position-relative">
                            <img className="img-fluid" src={carrito.img} alt="" />
                            <h6 className="text-center">${formatPrice}</h6>
                        </div>
                        <div className="col-7 d-flex justify-content-between align-items-center">
                            <p className="col">{carrito.nombre}</p>

                            {/* Flotantes */}
                            <p className='position-absolute counter'>{cantPerProduct}</p>
                            <button className="counter a" onClick={addProducto}>+</button>
                            <button className="counter b" onClick={removeProduct}>-</button>
                            <MdRemoveShoppingCart className='counter x' onClick={deleteProduct} />
                        </div>
                    </div>
                </div>
            </div>
            {
                stockAlert &&
                <div style={{zIndex:"10000"}} className="row position-absolute bottom-0 start-0 end-0 mx-4 mb-2 bg-danger text-center p-2 rounded">
                    <p className='m-0'>No hay más disponibilidad para este producto</p>
                </div>
            }
        </>
    )
}
