import { Fragment, useEffect, useState } from "react"

// Components
import { NavbarLayout } from "../layouts/NavbarLayout"
import { Carrito } from "./components/Carrito"
import { ProductoItem } from "./components/ProductoItem"

// Icons
import hotDrink from '../../assets/images/Iconos/hot-drink.png'
import coldDrink from '../../assets/images/Iconos/cold-drink.png'
import panaderia from '../../assets/images/Iconos/panaderia.png'

// Helpers
import { arr } from "../../helpers/data"

// Styles
import './styles.css'
import { filtroCategoria } from "../../helpers/filtroCategoria"

export const Productos = () => {

    const [carrito, setCarrito] = useState([]);
    const [category, setCategory] = useState(0);
    const [reload, setReload] = useState(false);
    const [productosFiltro, setProductosFiltro] = useState(arr);

    const addProduct = ( item ) => {
        item.cantidadProductos = 1;
        setCarrito( [...carrito, item] );
    }
    const removeProduct = ( item ) => {
        setCarrito( carrito.filter( element => element.id !== item.id) );
    }

    const handleCategory = ( item ) => {
        setCategory( item );
        setProductosFiltro(filtroCategoria( arr, item ));
    }

    useEffect( () => {
        setProductosFiltro( arr );
    }, [reload])

    return (
        <>
            <NavbarLayout carrito={carrito.length} />
            <section id="productos" className="scroll">
                <div className="container p-5">
                    <div className="row d-flex">
                        <div className="row d-flex justify-content-center mb-5" style={{padding: "0px 1.5rem"}}>
                            <button 
                                className={`${ category === 0 && "active" } col-12 col-md py-1 px-4 btn btn-dark m-2 my-1 my-md-4 position-relative`}
                                onClick={ () => handleCategory( 0 )}
                            >
                            Todo
                            </button>
                            <button 
                                className={`${ category === 1 && "active" } col-12 col-md py-1 px-0 px-md-4 btn btn-dark m-2 my-1 my-md-4 position-relative`}
                                onClick={ () => handleCategory( 1 )}
                            >
                            Bebidas calientes
                                {/* <img className="icons" src={hotDrink} alt="hot-drink" /> */}
                            </button>
                            <button 
                                className={`${ category === 2 && "active" } col-12 col-md py-1 px-4 btn btn-dark m-2 my-1 my-md-4 position-relative`}
                                onClick={ () => handleCategory( 2 )}
                            >
                            Bebidas frias
                                {/* <img className="icons" src={coldDrink} alt="hot-drink" /> */}
                            </button>
                            <button 
                                className={`${ category === 3 && "active" } col-12 col-md py-1 px-4 btn btn-dark m-2 my-1 my-md-4 position-relative`}
                                onClick={ () => handleCategory( 3 )}
                            >
                            Panaderia
                                {/* <img className="icons" src={panaderia} alt="hot-drink" /> */}
                            </button>
                        </div>
                    </div>
                    <div className="row d-flex flex-row">
                        {/* Mapeo de los productos y condicional para el stock */}
                        {
                            productosFiltro.map((item, i) => (
                                <Fragment key={ item.id }>
                                    {
                                        item.stock > 0 &&
                                        <ProductoItem 
                                            key={item.id}
                                            addProduct={addProduct} 
                                            removeProduct={removeProduct} 
                                            data={item} 
                                            index={i} 
                                            carrito = {carrito}
                                        />
                                    }
                                </Fragment>
                            ))
                        }
                    </div>
                </div>
            </section>
            {/* Carrito de compras */}
            <Carrito reload={reload} changeReload={setReload} data={carrito} changeData = {setCarrito} />
        </>
    )
}