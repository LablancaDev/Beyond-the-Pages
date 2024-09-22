// externalApiService.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Se consume la API de Google Books
export const fetchDataApi = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, searchTerm = '') {
    const maxResults = 40; // Cambiar a resultados por página
    const startIndex = (page - 1) * maxResults; // Calcula el índice de inicio
    const urlApi = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm ? encodeURIComponent(searchTerm) : 'book'}&startIndex=${startIndex}&maxResults=${maxResults}`;
    try {
        const response = yield fetch(urlApi);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        // Se está extrayendo solo la información esencial (clave, título y portada) con data.items.map() crea un nuevo array de objetos JavaScript,
        // de los datos del libro que devuelve la API.El resultado será un objeto más pequeño y simplificado
        // Este proceso reduce la complejidad del JSON original y solo deja los campos que necesito para mostrar los libros (clave, título y portada).
        return data.items
            ? data.items.map((book) => ({
                key: book.id,
                title: book.volumeInfo.title,
                category: book.volumeInfo.categories,
                price: (Math.random() * (40 - 10) + 10).toFixed(2), // Precio aleatorio entre 10 y 40 euros con 2 decimales (INVENTADO: NO EXTRAIDO DEL JSON ORIGINAL)
                cover: book.volumeInfo.imageLinks
                    ? book.volumeInfo.imageLinks.thumbnail
                    : null, // La imagen de portada
            }))
            : [];
    }
    catch (error) {
        console.error("Error fetching data from API:", error);
        throw error; // Lanza el error para manejarlo en el controlador
    }
});
// * Nota: La API de Google Books tiene un límite de 40 libros por solicitud
// * Consultar JSON : https://www.googleapis.com/books/v1/volumes?q=book 
