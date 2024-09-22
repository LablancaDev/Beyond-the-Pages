import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // O cualquier otro almacenamiento que necesites
import authSlice from "./authSlice";
import booksSlice from "./booksSlice";
import cartSlice from "./cartSlice";

// Configuración de persistencia
const persistConfig = {
    key: "root", // La clave que se usará para almacenar el estado
    storage,     // El almacenamiento que se usará (localStorage en este caso)
};

// Crea un reducer persistente
const persistedReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
    reducer: {
        auth: persistedReducer, // Usa el reducer persistente
        books: booksSlice,
        cart: cartSlice,
    }
});

// Crea el persistor
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;       
export type AppDispatch = typeof store.dispatch;

export { store, persistor }; // Exporta el store y el persistor
