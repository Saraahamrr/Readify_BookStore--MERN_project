import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchFavorites = createAsyncThunk("favs/fetchFavorites", async () => {
  axios.defaults.withCredentials = true;
  const response = await axios.get("http://localhost:3000/api/get-favourite");
  return response.data.data || [];
});

export const toggleFavourite = createAsyncThunk("favs/toggleFavourite", async (bookId, { getState }) => {
  axios.defaults.withCredentials = true;
  const favs = getState().favs.items;
  if (favs.includes(bookId)) {
    await axios.delete("http://localhost:3000/api/remove-favourite", { headers: { bookid: bookId } });
    return favs.filter(id => id !== bookId); // إزالة الكتاب من المفضلة
  } else {
    await axios.put("http://localhost:3000/api/add-favourite", null, { headers: { bookid: bookId } });
    return [...favs, bookId];
  }
});


const favSlice = createSlice({
  name: "favs",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(toggleFavourite.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default favSlice.reducer;
