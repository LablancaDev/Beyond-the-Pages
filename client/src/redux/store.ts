import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {
        auth: autSlice;
    }
})

export default store;