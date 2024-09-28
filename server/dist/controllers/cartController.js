var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Cart from "../models/Cart.js";
export const getDataBooksCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // En una solicitud GET, no se envía un cuerpo. La información que deseas enviar al servidor debe estar en la URL, puedes enviar un objeto completo como cuerpo de la solicitud
    /*  GET: Usa req.query para acceder a los parámetros de la URL.
        GET: Envías datos como parámetros de consulta en la URL (ej. params: { userId: user_id }).

        POST: Usa req.body para acceder a los datos enviados en el cuerpo de la solicitud.
        POST: Envías datos en el cuerpo de la solicitud (ej. { userId, book }).
        */
    // Recuperamos el userId que es un parámetro de la url
    const { userId } = req.query;
    try {
        if (userId) {
            // Consulta para obtener los libros del carrito de un usuario específico
            // const booksInCart = await Cart.find({userId})
            const userCart = yield Cart.findOne({ userId }); // findOne porque el usuario debe tener un único carrito
            // Encuentra el carrito del usuario utilizando el userId.
            if (!userCart || userCart.books.length === 0) {
                return res.status(404).json({ message: "No hay libros en el carrito para este usuario." });
            }
            // Devolver los libros al frontend
            res.json(userCart.books); // Aquí devolvemos los libros que están en la propiedad 'books'
        }
        else {
            res.status(400).json({ message: "Falta el ID de usuario" });
        }
    }
    catch (error) {
        console.error("Error al obtener los libros del carrito", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});
export const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bookId } = req.body; // Asegúrate de recibir ambos IDs
    try {
        // Validar que se reciban userId y bookId
        if (!userId || !bookId) {
            return res.status(400).json({ message: "Se requiere el userId y bookId ." });
        }
        // Encontrar el carrito del usuario
        const userCart = yield Cart.findOne({ userId });
        // Validar que se encontró el carrito y que hay libros
        if (!userCart || !userCart.books) {
            return res.status(404).json({ message: "Carrito no encontrado o no tiene libros." });
        }
        // Encontrar el índice del libro que se desea eliminar
        const bookIndex = userCart.books.findIndex(book => book.bookId === bookId);
        // Verificar si el libro existe en el carrito
        if (bookIndex === -1) {
            return res.status(404).json({ message: "El libro no existe en el carrito " });
        }
        // Eliminar el libro utilizando splice
        userCart.books.splice(bookIndex, 1);
        // Guardar el carrito actualizado
        yield userCart.save();
        return res.status(200).json({ message: "Book removed successfully." });
    }
    catch (error) {
        console.error("Error removing book from cart:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
export const cleanAllCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.body;
    try {
        if (!user_id) {
            return res.status(400).json({ message: 'No se ha proporcionado el ID del usuario.' });
        }
        // Encuentra el carrito del usuario
        const userCart = yield Cart.findOne({ userId: user_id });
        if (!userCart) {
            return res.status(404).json({ message: 'No se encontró un carrito para este usuario.' });
        }
        // Vaciar el array de libros correctamente usando splice
        userCart.books.splice(0, userCart.books.length);
        // Guardar el carrito actualizado
        yield userCart.save();
        return res.status(200).json({ message: 'Carrito limpiado correctamente.' });
    }
    catch (error) {
    }
});
