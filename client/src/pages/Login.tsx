import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/authSlice';

const Login = () => {

    // En lugar de usar "http://localhost:5000" directamente, ahora usaré apiUrl que cambia según si estoy en modo desarrollo o producción.
    // Vercel automáticamente asignará el valor de NODE_ENV a production cuando se despliegue, por lo que se usará la URL de producción (REACT_APP_API_URL_PRODUCTION).
    // Obtener la URL base de la API según el entorno
    const apiUrl = import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_API_URL_PRODUCTION
        : import.meta.env.VITE_API_URL_LOCAL;


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [changeRegisterLogin, setChangeRegisterLogin] = useState(false);

    const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        // Para enviar los datos del usuario registrado al server hay que crear un objeto FormData que permita enviar archivos y datos en un solo POST request
        const dataUser = new FormData()
        dataUser.append('name', name)
        dataUser.append('password', password)
        dataUser.append('email', email)
        // Añadir la imágen
        if (image) {
            dataUser.append('profile_image', image);
        } else {
            console.error("No se ha seleccionado ninguna imagen.");
            return; // Sal de la función si no hay imagen
        }

        try {
            await axios.post(`${apiUrl}/users/register`, dataUser, { // ruta servidor local: "http://localhost:5000/api/users/register"
                headers: {
                    'Content-Type': 'multipart/form-data',  //definir siempre para enviar imágenes en la cabecera
                },
            })
            alert('registo correcto!')

            // Limpiar los campos del formulario después de un registro exitoso
            setName('');
            setEmail('');
            setPassword('');
            setImage(null);


        } catch (error: any) {
            if (error.response) {
                console.error('Error durante el registro:', error.response.data.message);
                alert(`Error: ${error.response.data.message}`);
            } else {
                console.error('Error durante el registro:', error);
                alert('Error inesperado. Intenta nuevamente.');
            }
        }
    }

    // Función que se encarga de logear a un usuario
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        // se desestructuran los datos que el usuario introduce en el formulario para logearse
        const userDataLogin = { email, password }

        try {
            const response = await axios.post(`${apiUrl}/users/login`, userDataLogin)

            console.log("Datos del user devueltos por el servidor: ", response)

            // Si el login es exitoso
            alert(response.data.message);

            // Se extraen los datos de la respuesta del objeto de la respuesta con destructuración
            const { id, name, email, profileImage } = response.data;
            // Se actualiza el estado global con los nuevos datos del nuevo usuario
            dispatch(setUser({
                user_id: id,
                userName: name,
                userEmail: email,
                profileImage: profileImage,
            }));

            navigate('/home')

        } catch (error) {
            console.log('Error durante el login:', error);
            alert('Email o contraseña incorrectos'); // Mensaje de error
        }
    }


    const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]); // Guarda el primer archivo
        } else {
            setImage(null); // Restablece a null si no hay archivo
        }
    }


    return (
        <div className="container-fluid py-5">
            <div className="row">
                <div className="col">
                    <form action="" onSubmit={changeRegisterLogin ? handleRegister : handleLogin}>
                        <div className="card w-50 m-auto p-4">
                            <h3 className='text-center my-4'>{changeRegisterLogin ? 'Register' : 'Login'}</h3>
                            {changeRegisterLogin &&
                                <div className='w-50 m-auto mb-3'>
                                    <label className='form-label' htmlFor="name">Name:</label>
                                    <input
                                        className='form-control'
                                        type="text"
                                        id='name'
                                        onChange={handleInputName}
                                        required
                                    />
                                </div>
                            }
                            <div className='w-50 m-auto mb-4'>
                                <label className='form-label' htmlFor="email">Email:</label>
                                <input
                                    className='form-control'
                                    type="text"
                                    id='email'
                                    onChange={handleInputEmail}
                                    required
                                />
                            </div>
                            <div className='w-50 m-auto mb-4'>
                                <label className='form-label' htmlFor="password">Password:</label>
                                <input
                                    className='form-control'
                                    type="text"
                                    id='password'
                                    onChange={handleInputPassword}
                                    required
                                />
                            </div>
                            {changeRegisterLogin &&
                                <div className='w-50 m-auto mb-4'>
                                    <label className='form-label' htmlFor="imagen">Imágen del perfil:</label>
                                    <input
                                        className='form-control'
                                        type="file"
                                        id='imagen'
                                        onChange={handleInputImage}
                                        accept="image/*" // Aceptar solo archivos de imagen
                                        required
                                    />
                                </div>
                            }
                            {changeRegisterLogin ? (
                                <div className='d-flex flex-column'>
                                    <button onClick={handleRegister} type='submit' className='btn btn-warning w-25 m-auto'>Sign Up</button>
                                    <a onClick={() => setChangeRegisterLogin(false)} className='text-center mt-3'> Already have an account! </a>
                                </div>
                            ) : (
                                <div className='d-flex flex-column'>
                                    <button onClick={handleLogin} type='submit' className='btn btn-success w-25 m-auto'>Log In</button>
                                    <a onClick={() => setChangeRegisterLogin(true)} className='text-center mt-3'> Create Acount! </a>
                                </div>
                            )}
                        </div>
                    </form>
                </div >
            </div >
        </div >
    )
}

export default Login