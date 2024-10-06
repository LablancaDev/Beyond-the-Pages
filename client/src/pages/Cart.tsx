import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { CartBook } from '../redux/types'
import { useDispatch } from 'react-redux'
import { clearCart, removeFromCart } from '../redux/cartSlice'
import oferta from '../assets/img/oferta.jpg'
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import logo from '../assets/img/logo.png'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const navigate = useNavigate()

  // Obtener la URL base de la API según el entorno
  const apiUrl = import.meta.env.MODE === 'production' 
    ? import.meta.env.VITE_APP_API_URL_PRODUCTION
    : import.meta.env.VITE_APP_API_URL_LOCAL;


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
          const response = await axios.get(`${apiUrl}/api/books/getBooksFromCart`, { // ruta a servidor local: "http://localhost:5000/api/books/getBooksFromCart"
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



  const removeFromMyCart = async ( bookId:string) => {
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
       
       // ELIMINAR LOS LIBROS DE LA DB... 
        const response = await axios.post(`${apiUrl}/api/books/removeBook`, {
        bookId,           // id del libro a eliminar
        userId: user_id   // id del usuario logeado, se elimina el libro de su carrito
      })

       // Solo eliminar del estado local y global si la operación fue exitosa
    if (response.status === 200) {
      //  Eliminar los libros del estado local
      setBooksCart((prevBooks) => prevBooks.filter((book) => book.bookId !== bookId));
      
       // Despachar la acción de Redux para eliminar los libros del estado global
       dispatch(removeFromCart(bookId))

      
      alert("Libro eliminado de la DB correctamente!")

    }else {
      alert("Error al eliminar el libro de la base de datos");
    }
      
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  }


  const clearMyCart = async () => {

    try {
      // Limpiar el carrito de la base de datos
      const response = await axios.post(`${apiUrl}/api/books/cleanCart`, {user_id})

      // Verificar si el servidor respondió correctamente
      if(response.status === 200){
        
        setBooksCart([]); // Vaciar el estado local
        dispatch(clearCart()); // Vaciar el estado global en Redux
        alert('Se vacío el carrito correctamente')

      }else{
        alert('Error al vaciar el carrito en la base de datos');
      }


    } catch (error) {
      console.error('Error al vaciar el carrito', error)
    }

  }

  // Calcular el total de unidades y el precio total de libros
  const quantityTotal = booksCart.reduce((total, book)=> total + book.quantity, 0)
  const priceTotal = booksCart.reduce((total, book) => total + book.quantity * book.price ,0).toFixed(2)

  

  // * Implementación descarga de archivo PDF de las compras realizadas (factura)

  const finalizePurchase = () => {
    
    const doc = new jsPDF()

    // Logo de la empresa 
    const logoUrl = logo;   
    
    // Agregar el logo  
    doc.addImage(logoUrl, 'JPEG', 10, 10, 50, 20); // Posición del logo 

    // Título del PDF
    doc.setFontSize(20);
    doc.text('Detalles de la compra', 10, 50);

     // Tabla con los detalles del carrito
     const tableColumn = ['Título', 'Cantidad', 'Precio Unitario (€)', 'Precio Total (€)'];
     const tableRows: any[] = [];

     booksCart.forEach((book) => {
      const bookData = [
        book.title,
        book.quantity,
        book.price.toFixed(2),
        (book.quantity * book.price).toFixed(2),
      ];
      tableRows.push(bookData);
    });

     // Calcular el total general
     const totalPrice = booksCart.reduce((total, book) => total + book.quantity * book.price, 0).toFixed(2);

     // Agregar tabla al PDF
     doc.autoTable({
       head: [tableColumn],
       body: tableRows,
       startY: 60,
     });
 
     // Mostrar el total general
     doc.setFontSize(16); 
     doc.text(`Total: ${totalPrice} €`, 10, doc.lastAutoTable.finalY + 10);
 
     // Descargar el PDF
     doc.save('resumen_compra.pdf');

     navigate('/purchaseComplete')

  }


  return (
    <div className="container-fluid back-cart">
      <h1 className='text-center my-4'>Mi Carrito</h1>
      <div className='d-flex justify-content-center mt-5'>
        <img className='img-fluid m-auto w-75' src={oferta} alt="oferta" />
      </div>
      <div className='border rounded w-75 m-auto my-4 py-2 cart'>
      <h4 className='mb-4 text-center'>Mis Compras</h4>
        <div className=' w-75 m-auto d-flex justify-content-between align-items-center'>
          <div>
            <h6>Cantidad de artículos: <span className='text-primary'>{quantityTotal} unidades </span></h6>
            <h5 className='py-2'>Total: <span className='text-danger'> {priceTotal} € </span></h5>
            <h6 className='text-success'>ENVÍO GRATIS! <i className="bi bi-truck"></i></h6> 
          </div>
          <div className='d-flex flex-column gap-2'>
            <button onClick={clearMyCart} className='btn btn-warning'>Vaciar Carrito</button>
            <button onClick={finalizePurchase} className='btn btn-success'>Finalizar Compra</button>
          </div>
        </div>
      </div>
      <div className="row">
          {booksCart.map((book, index)=>(
        <div className="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 mb-4 ">
            <div className='card w-100 back-card' style={{ maxHeight: '450px' }} key={index}>
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