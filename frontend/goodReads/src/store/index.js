import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlicer";



const store = configureStore({
    reducer: {
        auth: authSlice
    

},
});

export default store;