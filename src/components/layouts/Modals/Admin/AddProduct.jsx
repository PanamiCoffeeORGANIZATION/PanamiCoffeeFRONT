import { Alert } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useState } from 'react';
import { BsFillBagPlusFill } from 'react-icons/bs'

export const AddProduct = (props) => {

    const { createProduct, categories } = props;

    const [successAlert, setSuccessAlert] = useState(false);

    return (
        <div className="modal fade" data-target="myModalCreate" tabIndex="-1" id="create-modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-white">
                    <div className="modal-header">
                        <h5 className="modal-title"><BsFillBagPlusFill /> Crear producto</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Formik
                            initialValues={{
                                name: "",
                                category: "none",
                                description: "",
                                price: "",
                                stock: "",
                                img: "",
                            }}
                            validate={(values) => {
                                let error = {};
                                if (!values.name.trim()) { error.name = "El nombre es obligatorio *"; }
                                else if (values.category === "none") { error.category = "La categoría es obligatoria *"; }
                                else if (!values.price.trim()) { error.price = "El precio es obligatorio *"; }
                                else if (!values.stock.trim()) { error.stock = "El stock es obligatorio *"; }
                                return error;
                            }}
                            onSubmit={async (values, { resetForm }) => {
                                console.log( values );
                                // const { ok, msg, ...rest } = await signup(values);
                                // // Si la consulta tiene errores en la respuesta ( middlewares ) 
                                // if (rest.errors) {
                                //     setWarning({
                                //         ok: true,
                                //         msg: rest.errors[0].msg,
                                //         type: "error"
                                //     })
                                // }
                                // // Si la respuesta trae un ok 
                                // else if (ok) {
                                //     setWarning({
                                //         ok: true,
                                //         msg: msg,
                                //         type: "success"
                                //     })
                                //     resetForm();
                                // }
                                // else {
                                //     setWarning({
                                //         ok: true,
                                //         msg: msg,
                                //         type: "error"
                                //     })
                                // }
                            }}
                        >
                            {({ errors }) => (
                                <Form>
                                    <div className="mb-1 row">
                                        <div className="col-7">
                                            <label htmlFor="name">Nombre</label>
                                            <Field type="text" className="form-control" id="name" name='name' />
                                        </div>
                                        <div className="col-5">
                                            <label htmlFor="img">Imagen</label>
                                            <Field type="file" className="form-control" id="img" name='img' />
                                        </div>
                                    </div>
                                    <ErrorMessage name='name' component={() => (<div id="emailHelp" className="form-text error">{errors.name}</div>)} />
                                    <div className="mb-1">
                                        <label htmlFor="category">Category</label>
                                        <Field as='select' className="form-select col-4" id='category' name='category'>
                                            <option value="none">Selecciona una categoría</option>
                                            {
                                                categories.map( category => (
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                ))
                                            }
                                        </Field>
                                    </div>
                                    <ErrorMessage name='category' component={() => (<div id="emailHelp" className="form-text error">{errors.category}</div>)} />
                                    <div className="mb-1">
                                        <label htmlFor="description">Descripción</label>
                                        <Field as='textarea' type="text" className="form-control" id="description" name='description'></Field>
                                    </div>
                                    <div className="mb-3 row">
                                        <div className="col-8">
                                            <label htmlFor="price">Precio</label>
                                            <Field type="text" className="form-control" id="price" name='price' />
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="stock">Stock</label>
                                            <Field type="text" className="form-control" id="stock" name='stock' />
                                        </div>
                                    </div>
                                    <ErrorMessage name='price' component={() => (<div id="emailHelp" className="form-text error">{errors.price}</div>)} />
                                    <ErrorMessage name='stock' component={() => (<div id="emailHelp" className="form-text error">{errors.stock}</div>)} />
                                    {
                                        successAlert ?
                                            <Alert variant="filled" severity="success">
                                                Producto creado con exito
                                            </Alert>
                                            :
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            // disabled={!inpNombre || !inpCategoria || !inpDescripcion || !inpStock || !inpPrecio}
                                            >Crear producto</button>
                                    }
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
