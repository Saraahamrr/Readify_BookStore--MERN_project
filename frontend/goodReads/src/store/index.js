// src/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlicer"; 
import SubscribeSlicer from "./SubscribeSlicer";

const rootReducer = combineReducers({
  auth: authSlice,
  SubscribeSlicer: SubscribeSlicer,

});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/FLUSH", "persist/PAUSE", "persist/PURGE", "persist/REGISTER"],
      },
    }),
});


export const persistor = persistStore(store);
export default store;
