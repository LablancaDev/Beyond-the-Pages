  // src/slices/booksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'; // Importa funciones de Redux Toolkit para crear slices y manejar acciones
import { Book } from './types'; // Importa la interfaz Book que define la estructura de los libros

//* SLICE QUE GESTIONA LA CARGA DE LIBROS DESDE LA API EN EL ESTADO GLOBAL

// Define la interfaz del estado del slice
interface BooksState {
  books: Book[]; // Array de libros
  loading: boolean; // Estado que indica si los libros están siendo cargados
  error: string | null; // Mensaje de error si ocurre un problema durante la carga
}

// Estado inicial del slice
const initialState: BooksState = {
  books: [], // Inicialmente, el array de libros está vacío
  loading: false, // No hay carga inicial
  error: null, // No hay error inicial
};

// Crea el slice para la gestión del estado de los libros
const booksSlice = createSlice({
  name: 'books', // Nombre del slice
  initialState, // Estado inicial definido anteriormente
  reducers: {
    // Acción para indicar que la carga de libros ha comenzado
    fetchBooksStart(state) {
      state.loading = true; // Establece loading a true al inicio de la carga
    },
    // Acción que se llama cuando la carga de libros es exitosa
    fetchBooksSuccess(state, action: PayloadAction<Book[]>) {
      state.books = action.payload; // Guarda los libros en el estado
      state.loading = false; // Establece loading a false ya que la carga ha terminado
    },
    // Acción que se llama cuando ocurre un error en la carga de libros
    fetchBooksFailure(state, action: PayloadAction<string>) {
      state.error = action.payload; // Guarda el mensaje de error en el estado
      state.loading = false; // Establece loading a false ya que ha terminado la operación
    },
  },
});

// Exporta las acciones para ser utilizadas en otras partes de la aplicación
export const { fetchBooksStart, fetchBooksSuccess, fetchBooksFailure } = booksSlice.actions;

// Exporta el reductor del slice para que se use en la configuración de la tienda de Redux
export default booksSlice.reducer;
