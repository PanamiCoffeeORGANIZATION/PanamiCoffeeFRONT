import { Alert } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../api/user";
import logo from "../../../assets/images/logos/logo.png";

export const Login = (props) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState({
        ok: false,
        msg: ""
    });

    return (
        <section id="login" className="scroll">
            <div className="container">
                <div className="data col-12 col-lg-6 col-md-6 text-bg-dark p-5 rounded">
                    <img src={logo} className="logo" alt="logo" />
                    <h4 className="mb-3">Log-in</h4>
                    {
                        warning.ok &&
                        <Alert severity="error" className="mb-3">{warning.msg}</Alert>
                    }
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validate={(values) => {
                            let error = {};

                            if (!values.email.trim()) {
                                error.email = "El correo es obligatorio *";
                            } else if (
                                !/^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/.test(
                                    values.email
                                )
                            ) {
                                error.email = "Este correo no es válido *";
                            } else if (!values.password.trim()) {
                                error.password = "La contraseña es obligatoria *";
                            }

                            return error;
                        }}
                        onSubmit={async (values, { resetForm }) => {

                            setLoading( true );
                            const { ok, msg, ...rest } = await login(values);
                            setLoading( false );

                            if (rest.errors) {
                                setWarning({
                                    ok: true,
                                    msg: rest.errors[0].msg
                                })
                            }
                            else if (ok) {
                                setWarning({
                                    ok: false,
                                    msg: ""
                                })
                                localStorage.setItem("token", rest.token);
                                localStorage.setItem("uid", rest.user.uid )
                                navigate('/user/productos');
                            }
                            else {
                                setWarning({
                                    ok: true,
                                    msg: msg
                                })
                            }
                        }}
                    >
                        {({ errors }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Correo electrónico
                                    </label>
                                    <Field
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                    />
                                    <ErrorMessage name='email' component={() => (<div id="emailHelp" className="form-text error">{errors.email}</div>)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Contraseña
                                    </label>
                                    <Field type="password" className="form-control" id="password" name="password" />
                                    <ErrorMessage name='password' component={() => (<div id="emailHelp" className="form-text error">{errors.password}</div>)} />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>

                                    {
                                        loading ?
                                            <div className="px-5">
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            </div>
                                            :
                                            "Iniciar sesión"
                                    }
                                </button>
                            </Form>
                        )}

                    </Formik>
                    <div className="registerLink row">
                        <p className="mt-3 ms-1 col">
                            Nuevo por aquí?{" "}
                            <Link className="col" to="/signup">
                                Registrate
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
