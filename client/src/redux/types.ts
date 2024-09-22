
export interface Book {
    key?: string;
    bookId: string, // Este es el identificador del libro en MongoDB
    title: string,
    category: string,
    price: number,
    cover: string
}

// Extensión de la interfaz Book para añadir campos adicionales
export interface CartBook extends Book {
    quantity: number; // Campo adicional para la cantidad de libros en el carrito
}

// CartBook heredará todas las propiedades de Book más las nuevas en CartBook

// * IMPORTANTE  
/*  Tienes dos estructuras diferentes para los libros en tu código: una para la interfaz Book en tu frontend y otra en tu esquema de MongoDB para el carrito.
    En el frontend, la interfaz Book utiliza key como identificador único, mientras que en la base de datos y en el carrito, se usa bookId para identificar los libros.
    por eso se definen en la iterfaz dos Id,s para un libro, pero realmente es una, Explicación:

    El uso del interrogante (?) en TypeScript indica que una propiedad es opcional, es decir, no siempre está presente en todos los objetos que implementan esa interfaz. 
    Al agregar el interrogante, le estamos diciendo a TypeScript que esa propiedad puede existir o no.

    La próxima vez crear la estructura igual de los datos que se obtiene del JSON de la API con los del resto de archivos tanto interfaces 
    como de los modelos creados en mongo DB para intentar no utilizar extensiones o herencia de las interfaces como en este caso, aunque sirve para practicar.

    Con esta estructura, ahora tienes una interfaz CartBook que hereda todos los campos de Book y agrega el campo quantity, 
    permitiendo que puedas manejar libros en el carrito con esta nueva interfaz sin cambiar la original.*/