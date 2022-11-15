import { useEffect, useState } from "react";
import { purchase } from "../../../api/user";

// Helpers
import { CarritoItem } from "./CarritoItem";

export const Carrito = (props) => {
    const { carrito, changeCarrito, totalValue, setTotalValue, setAlert, reloadMyData } = props;

    const [formatValue, setFormatValue] = useState(0);
    const [currentLength, setCurrentLength] = useState(carrito.length);

    const [pendingPurchase, setPendingPurchase] = useState({})

    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    const realizarCompra = () => {

        purchase(pendingPurchase).then(resp => {
            console.log(resp);
        })

        changeCarrito([])
        setAlert([true, { text: 'Tu orden se ha realizado exitosamente', type: 'success' }])
        reloadMyData();
        setTimeout(() => { setAlert([false, {}]) }, 10000)
    }

    const validarCompra = () => {
        console.log(carrito);
        const compra = {
            products: [],
            total: totalValue
        }

        carrito.map(item => {
            if (!item.total) {
                compra.products.push({ id: item.id, amount: item.cantidadProductos })
            }
            else {
                compra.total = item.total;
            }
        })

        setPendingPurchase(compra);
    }

    const cancelarCompra = () => {
        changeCarrito([])
        setAlert([true, { text: 'Tu orden ha sido cancelada', type: 'info' }])
        setTimeout(() => { setAlert([false, {}]) }, 10000)
    }

    useEffect(() => {
        setCurrentLength(carrito.length)
        if (carrito.length > 0) {

            if (carrito.length < currentLength) return
            let item = carrito[carrito.length - 1];

            setTotalValue(totalValue + Number(item.price))
        }
        else setTotalValue(0)
    }, [carrito])

    useEffect(() => {
        setFormatValue(totalValue.toLocaleString('en-US'))
    }, [totalValue])
    return (
        <>
            <div className="carritoLayout">
                <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasRightProducts" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasRightLabel">Mi compra</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="row mb-4">
                            <div className="col mx-2 p-3 d-flex justify-content-between rounded" style={{ background: "#525964" }}>
                                <div className="h-100 d-flex flex-column justify-content-between align-items-center">
                                    <span>{`${year}/${month}/${day}`}</span>
                                    <p style={{ margin: "0px" }}><b>{carrito.length}</b> Articulos</p>
                                </div>
                                <h3 className="h-100 d-flex justify-content-center align-items-center">$ {formatValue}</h3>
                            </div>
                        </div>
                        {
                            carrito.length === 0 ?
                                <div className="row text-center">
                                    <p className="m-0">Aun no hay productos seleccionados</p>
                                </div>
                                :
                                <div className="row text-center">
                                    <p className="m-0">Productos</p>
                                </div>
                        }

                        {
                            // Se recorre cada item que esté dentro del carrito
                            carrito.map(item => (
                                <CarritoItem
                                    key={item.id}
                                    carrito={item}
                                    totalValue={totalValue}
                                    changeValue={setTotalValue}
                                    data={carrito}
                                    changeCarrito={changeCarrito}
                                />
                            ))
                        }
                        {
                            carrito.length > 0 &&
                            <div className="row">
                                <button
                                    onClick={validarCompra}
                                    data-bs-toggle="modal"
                                    data-bs-target="#confirm"
                                    className="btn btn-purple mt-3">Finalizar compra</button>
                                <button
                                    onClick={cancelarCompra}
                                    data-bs-dismiss="offcanvas"
                                    className="btn btn-danger mt-2">Cancelar compra</button>
                            </div>
                        }

                    </div>
                </div>
            </div>
            {/*  Modal Confirmar Compra */}
            <div className="modal fade" id="confirm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content text-bg-dark">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Confirma tu pedido</h1>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ¿Estás seguro de realizar esta compra?

                            <hr />
                            {
                                carrito.map(product => (
                                    <div
                                        className="m-0 d-flex justify-content-between pt-1"
                                        style={{ borderBottom: "1px solid white" }}
                                        key={product.id}
                                    >
                                        {product.name}  ({product.cantidadProductos})
                                        <small>$ {(Number(product.price) * product.cantidadProductos).toLocaleString('en', 'US')}</small>
                                    </div>
                                ))
                            }
                            <div
                                className="m-0 d-flex justify-content-between pt-1"
                            >
                                <b>Total</b>
                                <small>${Number(totalValue).toLocaleString('en', 'US')}</small>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" onClick={realizarCompra} className="btn btn-success" data-bs-dismiss="modal">Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
