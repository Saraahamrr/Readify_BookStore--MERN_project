import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Combine your reducers
const SubscribeSlicer = createSlice({
  name: "SubscribeSlicer",
initialState: {
        isSubscribed: !!Cookies.get("isSubscribed"),
    },

    reducers: {
        subscribed(state) {
            state.isSubscribed = true;
        },
        unsubscribed(state) {
            state.isSubscribed = false;
        }
    }
});

export const subscribActions = SubscribeSlicer.actions;
export default SubscribeSlicer.reducer;