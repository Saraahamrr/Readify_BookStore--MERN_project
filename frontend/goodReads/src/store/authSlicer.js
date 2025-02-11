import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: !!Cookies.get("token"),
        role: "user",
    },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
        changeRole(state, action) {
            state.role = action.payload;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
