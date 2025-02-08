import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlicer";
import favSlice from "./favSlice";


const store = configureStore({
    reducer: {
        auth: authSlice
        ,
        favs:favSlice

},
});

export default store;