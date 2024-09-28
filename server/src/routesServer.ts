import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { loginUser, registerNewUser } from './controllers/authController.js'; // Siempre añadir .js muy importante para la importación con node
import { addDataBooks, getDataBooks } from './controllers/booksControllers.js';
import { cleanAllCart, deleteBook, getDataBooksCart } from './controllers/cartController.js';

// Simulación de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../dist/uploads'), // Guardar imágenes en "uploads"
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para cada archivo
    },
});

const upload = multer({ storage }); // Middleware para manejo de archivos

// * Ruta para el registro de usuarios en la base de datos
// Acepta el middleware de multer para la subida de la imagen
router.post('/register', upload.single('profile_image'), registerNewUser);

// * Ruta para logear un usuario
router.post('/login', loginUser)

// * Ruta para solicitar los datos de la API de libros
router.get('/getBooks', getDataBooks) 

// * Ruta para agregar los libros a la base de datos
router.post('/addBooks', addDataBooks)

// * Ruta para obtener de la base de datos los libros del carrito del usuario logeado 
router.get('/getBooksFromCart', getDataBooksCart)

// * Ruta para eliminar un libro de la base de datos
router.post('/removeBook', deleteBook)

// * Ruta para limpiar/vaciar el carrito
router.post('/cleanCart', cleanAllCart)


export default router;

