var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchDataApi } from "../services/externalApiService.js";
import Cart from "../models/Cart.js";
//Se obtienen los libros de la Api, La API se consume en el backend realmente
export const getDataBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1; // Obtiene el número de página de la consulta, por defecto es 1
    const searchTerm = req.query.searchTerm || ''; // Castea searchTerm a string o vacío, Obtiene el término de búsqueda de la consulta
    try {
        // Llamada a la function fetchDataApi desde el controlador de Express
        const books = yield fetchDataApi(page, searchTerm); // Pasa la página y el término de búsqueda a la función
        res.json(books);
        console.log(books);
    }
    catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: 'Error fetching books' });
    }
});
export const addDataBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, book } = req.body; // Desestructura el usuario y el libro desde el cuerpo de la solicitud enviados en el frontend
    try {
        // Busca el carrito del usuario
        let cart = yield Cart.findOne({ userId });
        // Si el carrito no existe, crea uno nuevo
        if (!cart) {
            cart = new Cart({ userId, books: [] });
        }
        /*book es el array de objetos pasado por el front con la propiedades de un libro:
        de aquí se extraen las propiedades necesarias
           book: {
                    key: book.key,
                    title: book.title,
                    category: book.category,
                    price: book.price,
                    cover: book.cover
                }
        */
        // Utiliza el `book.key` como identificador único del libro 
        const bookId = book.key;
        console.log("Id del libro:", bookId);
        // Verifica si el libro ya está en el carrito usando `bookId`
        const existingBook = cart.books.find(item => item.bookId === bookId);
        if (existingBook) {
            // Si ya existe, puedes aumentar la cantidad
            existingBook.quantity += 1;
        }
        else {
            // Si no existe, añade el libro al carrito
            cart.books.push({ bookId: bookId, title: book.title, price: book.price, cover: book.cover, quantity: 1 });
        }
        yield cart.save(); // Guarda el carrito actualizado en la base de datos
        return res.status(200).json({ message: 'Libro añadido al carrito', cart });
    }
    catch (error) {
        console.error('Error al añadir el libro al carrito:', error);
        return res.status(500).json({ message: 'Error al añadir el libro al carrito' });
    }
});
