// models/Cart.ts
import mongoose from 'mongoose';

/* Definición de un esquema en Mongoose que represente la estructura del carrito de compras. 
    Este modelo incluirá, al menos, los siguientes campos:

    userId: para identificar a qué usuario pertenece el carrito.
    books: un array que contendrá los libros que el usuario ha añadido al carrito. 
    
    Cada libro puede tener su ID y otros detalles relevantes.*/

// Definición del esquema del carrito de compras
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Referencia al modelo de usuario si lo tienes
    },
    books: [
        {
            bookId: {
                type: String, // Ahora es 'String' porque usas 'key' en lugar de un ObjectId
                required: true,
            },
            title: {
                type: String,
                required: true, // Añadimos el título del libro
            },
            price: {
                type: Number,
                required: true, // Añadimos el precio del libro
            },
            cover: {
                type: String,
                required: true, // Añadimos la URL de la portada del libro
            },
            quantity: {
                type: Number,
                default: 1, // Cantidad de libros
            },
        },
    ],
});

// Crear el modelo de carrito a partir del esquema
const Cart = mongoose.model('Cart', cartSchema);

export default Cart;

/* 
Ejemplo de un carrito añadido con estos datos en mongoDB:

{
  "_id": "66eef517a650c609ba5de4a9", // ID del carrito
  "userId": "66ec233b1c934d236f793be8", // ID del usuario que posee el carrito
  "books": [      // Es un array que contiene objetos con los detalles de cada libro en el carrito, incluyendo bookId, title, price, cover, y quantity.
    {
      "bookId": "vQHmAAAAMAAJ", // ID único del libro
      "title": "El candidato de Dios", // Título del libro
      "price": 22.99, // Precio del libro
      "cover": "http://books.google.com/books/content?id=vQHmAAAAMAAJ&printsec=frontco…", // URL de la portada del libro
      "quantity": 1, // Cantidad
      "_id": "66eef544a650c609ba5de4ae" // Cada entrada de libro tiene su propio _id único en el carrito generado por MongoDB.
    }
  ]
}

Si añado libros con otro usuario se creará un nuevo ID del carrito ejemplo completo:

    * CARRITO USUARIO 1: Contiene 3 libros
{
  "_id": "66eef517a650c609ba5de4a9", // ID del carrito
  "userId": "66ec233b1c934d236f793be8", // ID del usuario 1
  "books": [
    {
      "bookId": "vQHmAAAAMAAJ", // ID único del libro
      "title": "El candidato de Dios", // Título del libro
      "price": 22.99, // Precio del libro
      "cover": "http://books.google.com/books/content?id=vQHmAAAAMAAJ&printsec=frontco…", // URL de la portada
      "quantity": 1, // Cantidad
      "_id": "66eef544a650c609ba5de4ae" // ID único para esta entrada del libro en el carrito
    },
    {
      "bookId": "bXdmAAAAMAAJ", // Otro libro
      "title": "La sombra del viento",
      "price": 18.50,
      "cover": "http://books.google.com/books/content?id=bXdmAAAAMAAJ&printsec=frontco…",
      "quantity": 1,
      "_id": "66eef544a650c609ba5de4af"
    },
    {
      "bookId": "pBHeAAAAMAAJ",
      "title": "El alquimista",
      "price": 12.99,
      "cover": "http://books.google.com/books/content?id=pBHeAAAAMAAJ&printsec=frontco…",
      "quantity": 1,
      "_id": "66eef544a650c609ba5de4b0"
    }
  ],
  "__v": 2 // Versión del documento (autogenerada por MongoDB)
}

    * CARRITO USUARIO 2: Contiene dos libros 
{
  "_id": "66eef8d9a650c609ba5de4c0", // ID del carrito
  "userId": "66eef8b6a650c609ba5de4bb", // ID del usuario 2
  "books": [
    {
      "bookId": "lC1fAAAAMAAJ", // ID único del libro
      "title": "La mala muerte", // Título del libro
      "price": 35.28, // Precio del libro
      "cover": "http://books.google.com/books/content?id=lC1fAAAAMAAJ&printsec=frontco…", // URL de la portada
      "quantity": 2, // Cantidad de este libro en el carrito
      "_id": "66eef8dfa650c609ba5de4c5" // ID único para esta entrada
    },
    {
      "bookId": "mX2fAAAAMAAJ",
      "title": "Cien años de soledad",
      "price": 28.99,
      "cover": "http://books.google.com/books/content?id=mX2fAAAAMAAJ&printsec=frontco…",
      "quantity": 1,
      "_id": "66eef8e2a650c609ba5de4c6"
    }
  ],
  "__v": 1 // Versión del documento
}


*/