import React from 'react'
import { useNavigate } from 'react-router'
import astronauta from '../../../../assets/images/varios/missed.png'
import './style.css'

export const Error404 = () => {

    const navigate = useNavigate();
    return (

        <section id="noneValidation">
            <div class="container">
                <p class="glitch">
                    <span aria-hidden="true">error 404</span>
                    error 404
                    <span aria-hidden="true">error 404</span>
                </p>
            </div>
            <h4 className='text-white'>Tenemos problemas para encontrar lo que buscas</h4>

            <img className='missed' src={astronauta} alt="missed" />
            <a className='btn btn-primary' role='button' onClick={ () => navigate('/login')}>Iniciar sesión</a>
            <div className='d-flex text-white justify-content-center align-items-center'>
                <p className='m-0'>-------- O --------</p>
            </div>
            <a className='btn btn-secondary' role='button' onClick={ () => navigate( -1 )}>Volver</a>
        </section>

    )
}
