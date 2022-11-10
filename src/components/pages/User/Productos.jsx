import { Fragment, useEffect, useState } from "react"

// Components
import { NavbarLayout } from "../../layouts/NavbarLayout"
import { Carrito } from "../components/Carrito"
import { ProductoItem } from "../components/ProductoItem"
import { AlertUI } from "../../UI/Alert"
import { getProductsByCategory } from "../../../api/search"
import { ProductCardPlaceholder } from "../../layouts/Placeholders/ProductCardPlaceholder"
import { HeaderPlaceholder } from "../../layouts/Placeholders/HeaderPlaceholder"

// Images
import empty from '../../../assets/images/varios/empty.png'

// API
import { getAllCategories, getOneCategory } from "../../../api/category"
import { getAllProducts } from "../../../api/product"

// Styles
import '../styles.css'
import useUser from "../../../hooks/useUser"
import { useNavigate } from "react-router"

export const Productos = () => {

    const [carrito, setCarrito] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    const [category, setCategory] = useState("TODO");
    const [reload, setReload] = useState(false);
    const [alert, setAlert] = useState([false, {}])

    const [loading, setLoading] = useState(true);
    const [categoryLoader, setCategoryLoader] = useState(false);

    const [productos, setProductos] = useState([]);
    const [categories, setCategories] = useState([]);

    const logged = useUser();
    const navigate = useNavigate();

    const addProduct = (item) => {
        logged.isLogged !== 1 && navigate('/login');
        item.cantidadProductos = 1;
        setCarrito([...carrito, item]);
    }
    const removeProduct = (item) => {
        // Busco el producto en el carrito
        const [itemCarrito] = carrito.filter(itemCart => itemCart.id === item.id);
        // Resto el producto * unidades del total
        console.log(itemCarrito);
        setTotalValue(totalValue - (itemCarrito.price * itemCarrito.cantidadProductos))
        setCarrito(carrito.filter(element => element.id !== item.id));
    }

    const handleCategory = (item) => {
        setCategory(item);
        setCategoryLoader(true);
        if (item === "TODO") return getApi();
        getProductsByCategory(item)
            .then(resp => {
                setCategoryLoader(false);
                setProductos(resp[0]);
            })
    }

    const getApi = async () => {
        setProductos(
            await getAllProducts()
        )
        setCategories(
            await getAllCategories()
        )
        setLoading(false);
        setCategoryLoader(false);
    }

    const reloadMyData = () => {
        // De momento no sé porqué las unidades no se actualizan inmediatamente
        setLoading(true);
        setTimeout(() => {
            getApi();
        }, 1000)
    }

    useEffect(() => {
        setLoading(true);
        getApi();
    }, [reload])


    return (
        <>
            {
                loading ?
                    <HeaderPlaceholder />
                    :
                    <NavbarLayout carrito={carrito.length} />
            }
            <section id="productos" className="scroll">
                <div className="container p-lg-5 p-2 p-md-3 d-flex justify-content-center flex-column align-items-center">
                    <div className="row categories-div scroll mb-4">
                        {
                            alert[0] && <AlertUI text={alert[1].text} type={alert[1].type} close={setAlert} />
                        }
                        {
                            loading ?
                                [1, 2, 3, 4, 5, 6].map(item => (
                                    <button key={item} className="placeholder"></button>
                                ))
                                :
                                <>
                                    <button
                                        onClick={() => handleCategory("TODO")}
                                        className={`btn btn-${category === "TODO" ? "yellow" : "secondary"}`}
                                    >
                                        {
                                            category === "TODO" && categoryLoader ?
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                :
                                                "TODO"
                                        }
                                    </button>
                                    {
                                        categories.map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() => handleCategory(item.id)}
                                                className={`btn btn-${category === item.id ? "yellow" : "secondary"}`}
                                            >
                                                {
                                                    category === item.id && categoryLoader ?
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        :
                                                        item.name
                                                }
                                            </button>
                                        ))
                                    }
                                </>
                        }
                    </div>
                    <div className="row d-flex flex-row">
                        {
                            loading ?
                                [1, 2, 3, 4, 5, 6].map(item => (
                                    <ProductCardPlaceholder key={item} />
                                ))
                                :
                                productos.length === 0 ?
                                    <div className="empty">
                                        <img src={empty} alt="empty" />
                                        <h4>Ahora no tenemos productos</h4>
                                    </div>
                                    :
                                    productos.map((item, i) => (
                                        <Fragment key={item.id}>
                                            {
                                                item.stock > 0 &&
                                                <ProductoItem
                                                    key={item.id}
                                                    addProduct={addProduct}
                                                    removeProduct={removeProduct}
                                                    data={item}
                                                    index={i}
                                                    carrito={carrito}
                                                />
                                            }
                                        </Fragment>
                                    ))
                        }
                    </div>
                </div>
            </section>
            {/* Carrito de compras */}
            <Carrito
                reload={reload}
                changeReload={setReload}
                carrito={carrito}
                changeCarrito={setCarrito}
                setAlert={setAlert}
                reloadMyData={reloadMyData}
                totalValue={totalValue}
                setTotalValue={setTotalValue}
            />
        </>
    )
}