import { Link } from "react-router-dom"
import logo from '../../../assets/images/logos/logo.png'

export const Login = () => {
    return (
        <section id="login" className="scroll">
            <div className="container">
                <div className="data col-12 col-lg-6 col-md-6 text-bg-dark p-5 rounded">
                    <img src={logo} className="logo" alt="logo" />
                    <h4 className="mb-3">Log-in</h4>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                    </form>
                    <div className="registerLink row">
                        <p className="mt-3 ms-1 col">Nuevo por aquí? <Link className="col" to="/signup">Registrate</Link></p>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}