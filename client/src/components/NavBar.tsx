import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState, persistor } from '../redux/store'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import imgBook from '../assets/img/logo.png'


const NavBar = () => {
    const dispatch = useDispatch()

    // extraer el valor de userName del estado de Redux para mostrar el usuario que inció sesión, su nombre e imágen.
    const { userName, profileImage } = useSelector((state: RootState) => state.auth)
    // const Name = useSelector((state: RootState) => state.auth.userName); (es lo mismo que arriba, pero arriba desestructura más como para extaer más propiedades de redux en el futuro)

    console.log("Imagen: ", profileImage)
    console.log("profileImage es un:", typeof (profileImage))

    const log_out = () => {
        dispatch(logout())
        persistor.purge(); // Limpia el almacenamiento persistido
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg position-fixed">
                <div className="container-fluid">
                    <img src={imgBook} alt="logo" className='img-fluid logo me-2' />
                    <Link to={"/home"}>
                        <h1 className="navbar-brand title text-light">Beyond the pages</h1>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/home"}>
                                    <a className="nav-link menu-nav" aria-current="page" href="#">Tienda</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link menu-nav" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle menu-nav" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Menu
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <div className='d-flex justify-content-center gap-3'>
                            <Link to={"/cart"}>
                                <a className='cart2' href=""><i className="bi bi-bag-heart-fill"></i></a>
                            </Link>
                            <div className="dropdown menu-nav">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Mi Cuenta
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end mt-2"> {/* Alinea el menú a la derecha */}
                                    <Link to={"/login"}>
                                        <li><a className="dropdown-item" href="#">Iniciar Sesión</a></li>
                                    </Link>
                                    <Link to={"/profile"}>
                                        <li><a className="dropdown-item" href="#">Mi perfil</a></li>
                                    </Link>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a onClick={log_out} className="dropdown-item" href="#">Cerrar Sesión</a></li>
                                </ul>
                            </div>
                            <div className='userName text-light'>{userName}</div>
                            {profileImage &&
                                <img className='img-fluid imageProfile' src={`http://localhost:5000/uploads/${profileImage}`} alt="profile image" />
                            }
                        </div>
                    </div>
                </div>
            </nav >
        </>
    )
}

export default NavBar