import { useState } from "react"
import { Link } from "react-router-dom"
import logo from '../../../assets/images/logos/logo.png'

export const Register = () => {

    const [terms, setTerms] = useState(true);

    const handleTerms = e => {
        setTerms( !terms )
    }

    return (
        <section id="register" className="scroll">
            <div className="container">
                <div className="data col-12 col-lg-6 col-md-6 text-bg-dark p-5 rounded">
                    <img src={logo} className="logo" alt="logo" />
                    <h4 className="mb-3">Sign-up</h4>
                    <form>
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name" className="form-label">Nombre completo</label>
                            <input type="text" className="form-control" id="name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="password" />
                        </div>
                        <div className="mb-3 form-check">
                            <input onChange={handleTerms} type="checkbox" className="form-check-input" id="termsandconditions" />
                            <label className="form-check-label" htmlFor="termsandconditions">Acepto los <Link to="/">terminos y condiciones</Link></label>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={ terms }>Registrarme</button>
                    </form>
                    <div className="registerLink row">
                        <p className="mt-3 ms-1 col">Ya tienes una cuenta? <Link className="col" to="/login">Log-in</Link></p>
                    </div>

                </div>
            </div>
        </section>
    )
}