import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState, persistor } from '../redux/store'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import axios from 'axios'
import { profile } from 'console'

const NavBar = () => {
    const dispatch = useDispatch()

    // extraer el valor de userName del estado de Redux para mostrar el usuario que inció sesión, su nombre e imágen.
    const { userName, profileImage } = useSelector((state: RootState) => state.auth)
    // const Name = useSelector((state: RootState) => state.auth.userName); (es lo mismo que arriba, pero arriba desestructura más como para extaer más propiedades de redux en el futuro)

    console.log("Imagen: ", profileImage)
    console.log("profileImage es un:", typeof(profileImage))

    const log_out = () => {
        dispatch(logout())
        persistor.purge(); // Limpia el almacenamiento persistido
    }
  

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Beyound the pages</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/home"}>
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        <form className="d-flex me-3" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <div className='d-flex justify-content-center gap-3'>
                            <div className="dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Login
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end mt-2"> {/* Alinea el menú a la derecha */}
                                    <Link to={"/login"}>
                                        <li><a className="dropdown-item" href="#">Login</a></li>
                                    </Link>
                                    <li><a className="dropdown-item" href="#">My profile</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a onClick={log_out} className="dropdown-item" href="#">Log out</a></li>
                                </ul>
                            </div>
                            <div className='text-success'>{userName}</div>
                            {profileImage &&
                                <img className='img-fluid imageProfile' src={`http://localhost:5000/uploads/${profileImage}`} alt="profile image" />  
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar