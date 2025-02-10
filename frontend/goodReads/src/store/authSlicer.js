import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const authSlice = createSlice({
    name: "auth",
    initialState: {
<<<<<<< HEAD
        isLoggedIn: true,
=======
        isLoggedIn: !!Cookies.get("token"),
>>>>>>> 541a2cbac6fc121a1cfff1501083aec22a08ebdd
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
