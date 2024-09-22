import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "./types";

interface CartState {
    items: Book[]; // Array de libros en el carrito     
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Book>) => {
            state.items.push(action.payload)
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(book => book.bookId !== action.payload)
        },
        clearCart(state) {
            state.items = []
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

