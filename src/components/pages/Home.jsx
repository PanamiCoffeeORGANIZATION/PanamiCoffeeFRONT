import React from 'react'
import { useNavigate } from 'react-router'
import logo from '../../assets/images/logos/logo.png'

export const Home = () => {

    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/user/productos')
    }

    return (
        <section id='home' className='bg-dark'>
            <h1 className='text-white'>Bienvenido a Panami Coffee</h1>
            <img src={logo} alt="logo" />
            <button className='btn btn-warning' onClick={handleStart}>Empezar</button>
        </section>
    )
}
