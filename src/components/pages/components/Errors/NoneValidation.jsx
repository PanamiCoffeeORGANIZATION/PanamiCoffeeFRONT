import React from 'react'
import astronauta from '../../../../assets/images/varios/nonevalidation.png'
import './style.css'

export const NoneValidation = () => {
    return (
        
        <section id="noneValidation">
            <h1>¡Error!</h1>
            <p>No hemos podido validar tus datos, por favor inicia sesión nuevamente. <br />
            </p>
            <a href="/login" className='btn btn-primary'>Iniciar sesión</a>
            <img src={astronauta} alt="nonevalidation" />
            <p><b>¡Esperamos no vuelva a ocurrir!</b></p>
        </section>

    )
}
