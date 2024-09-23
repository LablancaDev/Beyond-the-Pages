import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { CartBook } from '../redux/types'
import { useDispatch } from 'react-redux'
import { clearCart, removeFromCart } from '../redux/cartSlice'
import oferta from '../assets/img/oferta.jpg'

const Cart = () => {
  const dispatch = useDispatch()

  // * Se obtiene el id del usuario logeado actualmente desde el estado global para utilizarlo en la obtención de su carrito en la DB y poder mostralo en este componente
  const { user_id } = useSelector((state: RootState) => state.auth)

  // Estado Local de los libros almacenados en el carrito del usuario logeado actualmente
  const [booksCart, setBooksCart] = useState<CartBook[]>([])

  // Obtener el carrito desde Redux para comparar y sincronizar cambios 
  // const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const getBooksFromCart = async () => {
      if (user_id !== null) { // Me aseguro de que user_id no es null antes de realizar la solicitud
        // probar el if con return,se obtiene el mismo resultado?
        try {
          const response = await axios.get("http://localhost:5000/api/books/getBooksFromCart", {
            params: { userId: user_id }
            /* MUY IMPORTANTE: 

            CUANDO UTILICE POST ENVIAR LOS DATOS DIRECTAMENTE, CUANDO UTILICE GET HAY QUE DEFINIR PARAMS
            POST: Envías datos en el cuerpo de la solicitud (ej. { userId, book }).
            GET: Envías datos como parámetros de consulta en la URL (ej. params: { userId: user_id }).*/
          })
          // Almacenar los libros en el estado local
          setBooksCart(response.data)
          
          if (response.data.length === 0) {
            alert("Tu carrito está vacío.");
        }

        } catch (error) {
          // Si el error es un 404, maneja eso de manera específica
          if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 404) {
                alert("No hay libros en el carrito para este usuario.");
            } else {
                console.log("Error al obtener los libros de la base de datos", error);
                alert("Error al cargar los libros del carrito.");
            }
        } else {
            console.log("Error inesperado", error);
            alert("Error al cargar los libros del carrito.");
        }
        }
      }
    } 
    getBooksFromCart()
  }, [user_id]) //Dependencia: Cuando cambie el usuario se obtendrán los libros de nuevo

  console.log("Usuario Logeado:", user_id)
  console.log("Libros del carrito: ", booksCart)



  const removeFromMyCart = ( bookId:string) => {
    console.log("Id del libro a eliminar:", bookId)

    if(!bookId){
      return console.log("No se ha obtenido el id del libro a eliminar")
    }
    try {
      // * Problema con la eliminación de libros del carrito:
       /*El problema radica en la falta de sincronización entre el estado local (booksCart) y el estado global de Redux. 
       Aunque eliminamos libros en Redux, el componente sigue mostrando los datos del estado local, que no se actualiza. 
       La solución es obtener el carrito directamente desde Redux, eliminando la dependencia del estado local para asegurar 
       que los cambios en Redux se reflejen en la UI correctamente.*/ 
      
      //  Eliminar los libros del estado local
      setBooksCart((prevBooks) => prevBooks.filter((book) => book.bookId !== bookId));
      
       // Despachar la acción de Redux para eliminar los libros del estado global
       dispatch(removeFromCart(bookId))

       // ELIMINAR LOS LIBROS DE LA DB... 
      const response = axios.post("http://localhost:5000/api/books/removeBook", {
        bookId,           // id del libro a eliminar
        userId: user_id   // id del usuario logeado, se elimina el libro de su carrito
      })
      
      alert("Libro eliminado de la DB correctamente!")
      
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  }


  const clearMyCart = () => {
    setBooksCart([]); // Vaciar el estado local
    dispatch(clearCart()); // Vaciar el estado global en Redux
  }



  return (
    <div className="container-fluid">
      <h1 className='text-center my-4'>Cart Books</h1>
      <div className='d-flex justify-content-center'>
        <img className='img-fluid m-auto w-75' src={oferta} alt="oferta" />
      </div>
        <div className='d-flex justify-content-center'>
          <button onClick={clearMyCart} className='btn btn-warning w-25 my-3'>Vaciar Carrio</button>
        </div>
      <div className="row">
          {booksCart.map((book, index)=>(
        <div className="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 mb-4 ">
            <div className='card w-100' style={{ maxHeight: '450px' }} key={index}>
              <img className='w-100 img-fluid' src={book.cover} style={{ height: '200px', objectFit: 'cover' }} alt="" />
              <div className="card-body">
                <h6 className='card-title text-center' style={{ minHeight: '50px' }}>{book.title}</h6>
              </div>
              <div>
                <h5 className='text-danger text-center'>{book.price} €</h5>
              </div>
              <div className='m-auto p-2'>
                <button onClick={()=>removeFromMyCart(book.bookId)} className='btn btn-danger'>Eliminar <i className="bi bi-trash3"></i></button>
              </div>
              <div>
                <h6 className='text-center'>Cantidad: {book.quantity}</h6>
              </div>
            </div>
        </div>
          ))}
      </div>
    </div>
  )
}

export default Cart

// * IMPORTANTE FUNCIONAMIENTO DE RESPONSE EN AXIOS 

    // Estructura de response en Axios   w_OhaFDePS4C
    // Un response típico de Axios tiene la siguiente estructura: 

// {
//   "data": { /* Datos reales enviados por el servidor */ },
//   "status": 200, // Código HTTP de la respuesta
//   "statusText": "OK", // Texto asociado al código HTTP
//   "headers": { /* Encabezados de la respuesta */ },
//   "config": { /* Configuración de la solicitud original */ },
//   "request": { /* Objeto de solicitud XMLHttpRequest en el navegador */ }
// }

// * Por lo tanto, cuando quieres acceder a los datos devueltos por el servidor, debes hacer referencia a response.data  