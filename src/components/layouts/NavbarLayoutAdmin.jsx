import './styles.css'
import logo from '../../assets/images/logos/logosinfondo.png';
import { Link } from 'react-router-dom';

export const NavbarLayoutAdmin = (props) => {
    const { carrito } = props;
    return (
        <nav className="navbar navbar-expand-lg navbar-myDark position-relative p-0" id='navbar'>
            <div className="container-fluid mx-5">
                <a className="navbar-brand me-5" href="#">
                    <img className="logo logo me-3" src={logo} alt="logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/user/productos" className="nav-link">Usuario View</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/productos" className="nav-link">Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/ventas" className="nav-link" href="#">Ventas</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}