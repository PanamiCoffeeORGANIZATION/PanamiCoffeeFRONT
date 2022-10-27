import './styles.css'
import logo from '../../assets/images/logos/logosinfondo.png';

import { HiShoppingCart } from 'react-icons/hi'

export const NavbarLayout = (props) => {
    const { carrito } = props;
    return (
        <nav className="navbar navbar-expand-lg navbar-myDark position-relative p-0" id='navbar'>
            <div className="container-fluid mx-4">
                <a className="navbar-brand me-5" href="#">
                    <img className="logo logo me-3" src={logo} alt="logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu bg-dark">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled">Disabled</a>
                        </li>
                        <li className='nav-item'>
                            <div className="carrito ms-5" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRightProducts" aria-controls="offcanvasRight">
                                <HiShoppingCart size={"25px"} />
                                {
                                    carrito > 0 &&
                                    <p>{carrito}</p>
                                }
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}