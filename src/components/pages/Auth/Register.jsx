import { Alert } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signup } from "../../../api/user";
import logo from '../../../assets/images/logos/logo.png'

export const Register = () => {

    const [terms, setTerms] = useState(true);
    const [warning, setWarning] = useState({
        ok: false,
        msg: "",
        type: "error"
    });
    const navigate = useNavigate();

    const handleTerms = e => {
        setTerms(!terms)
    }

    return (
        <section id="register" className="scroll">
            <div className="container">
                <div className="data col-12 col-lg-6 col-md-6 text-bg-dark p-lg-5 p-md-5 p-4 rounded">
                    <img src={logo} className="logo" alt="logo" />
                    <h4 className="mb-3">Sign-up</h4>
                    {
                        warning.ok &&
                        <Alert severity={warning.type} className="mb-3">{warning.msg}</Alert>
                    }
                    <Formik
                        initialValues={{
                            email: "",
                            name: "",
                            password: "",
                        }}
                        validate={(values) => {
                            let error = {};

                            if (!values.email.trim()) {
                                error.email = "El correo es obligatorio *";
                            }
                            else if (!/^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/.test(values.email)) { error.email = "Este correo no es válido *"; }
                            else if (!values.name.trim()) { error.name = 'El nombre es obligatorio *'; }
                            else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(values.name)) { error.name = 'El nombre debe contener letras *'; }
                            else if (!values.password.trim()) { error.password = "La contraseña es obligatoria *"; }

                            return error;
                        }}
                        onSubmit={async (values, { resetForm }) => {
                            const { ok, msg, ...rest } = await signup(values);

                            // Si la consulta tiene errores en la respuesta ( middlewares ) 
                            if ( rest.errors ) {
                                setWarning({
                                    ok: true, 
                                    msg: rest.errors[0].msg,
                                    type: "error"
                                })
                            }
                            // Si la respuesta trae un ok 
                            else if (ok) {
                                setWarning({
                                    ok: true,
                                    msg: msg,
                                    type: "success"
                                })
                                resetForm();
                            }
                            else {
                                setWarning({
                                    ok: true,
                                    msg: msg,
                                    type: "error"
                                })
                            }
                            
                        }}
                    >
                        {({ errors }) => (
                            <Form>
                                <div className="mb-2 row">
                                    <div className="col-12 col-lg-6 col-md-6">
                                        <label htmlFor="email" className="form-label">Correo electrónico</label>
                                        <Field name="email" type="email" className="form-control col-6" id="email" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="col-12 col-lg-6 col-md-6">
                                        <label htmlFor="name" className="form-label">Nombre completo</label>
                                        <Field name="name" type="text" className="form-control col-6" id="name" />
                                    </div>
                                    <ErrorMessage name='email' component={() => (<div id="emailHelp" className="form-text error">{errors.email}</div>)} />
                                    <ErrorMessage name='name' component={() => (<div id="emailHelp" className="form-text error">{errors.name}</div>)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <Field name="password" type="password" className="form-control" id="password" />
                                    <ErrorMessage name='password' component={() => (<div id="emailHelp" className="form-text error">{errors.password}</div>)} />
                                </div>
                                <div className="mb-3 form-check">
                                    <input onChange={handleTerms} type="checkbox" className="form-check-input" id="termsandconditions" value={terms} />
                                    <label className="form-check-label" htmlFor="termsandconditions">Acepto los <Link to="/">terminos y condiciones</Link></label>
                                </div>
                                <div className="row">
                                    <button type="submit" className="btn btn-primary" disabled={terms}>Registrarme</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="registerLink row">
                        <p className="mt-3 ms-1 col">Ya tienes una cuenta? <Link className="col" to="/login">Log-in</Link></p>
                    </div>

                </div>
            </div>
        </section>
    )
}