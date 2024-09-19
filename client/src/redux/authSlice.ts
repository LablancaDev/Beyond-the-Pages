import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState { 
    user_id: number | null
    userName: string | null,
    userEmail: string |null,
    profileImage: string |null,
    isAuthenticated: boolean,
}

const initialState: AuthState = {
    user_id: null,
    userName: null,
    userEmail: null,
    profileImage: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{user_id:number, userName: string; userEmail: string; profileImage: string }>) => {
            state.user_id=action.payload.user_id
            state.userName = action.payload.userName
            state.userEmail = action.payload.userEmail
            state.profileImage = action.payload.profileImage;
            state.isAuthenticated = true
        },
        logout(state) {
            state.userName = null
            state.userEmail = null
            state.profileImage = null;
            state.isAuthenticated = false
        }
    }
})

// Exportar las acciones
export const { setUser, logout } = authSlice.actions;

// Exportar el reducer
export default authSlice.reducer;