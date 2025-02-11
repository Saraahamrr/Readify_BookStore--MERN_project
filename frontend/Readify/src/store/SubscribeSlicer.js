// import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

// // Combine your reducers
// const SubscribeSlicer = createSlice({
//   name: "SubscribeSlicer",
// initialState: {
//         isSubscribed: !!Cookies.get("isSubscribed"),
//     },

//     reducers: {
//         subscribed(state) {
//             state.isSubscribed = true;
//         },
//         unsubscribed(state) {
//             state.isSubscribed = false;
//         }
//     }
// });

// export const subscribActions = SubscribeSlicer.actions;
// export default SubscribeSlicer.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialSubscription = localStorage.getItem("isSubscribed") === "true"; // Ensure boolean conversion

console.log("Initial Redux State:", initialSubscription); // Debugging log

const SubscribeSlicer = createSlice({
  name: "subscribe",
  initialState: {
    isSubscribed: initialSubscription,
  },
  reducers: {
    subscribed(state) {
      state.isSubscribed = true;
      localStorage.setItem("isSubscribed", "true");
      console.log("Subscribed: Updated LocalStorage", localStorage.getItem("isSubscribed"));
    },
    unsubscribed(state) {
      state.isSubscribed = false;
      localStorage.setItem("isSubscribed", "false");
      console.log("Unsubscribed: Updated LocalStorage", localStorage.getItem("isSubscribed"));
    },
  },
});

export const subscribActions = SubscribeSlicer.actions;
export default SubscribeSlicer.reducer;
