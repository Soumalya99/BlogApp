import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../Appwrite/dbservice";

console.log("hi");

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const post = await service.getPosts([]);
    return post.documents
  } catch (error) {
    console.log("Error :: fetchpost", error);
  }
});

const initialState = {
  posts: [],
  isLoading: false,
  status: "idle",
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.posts = action.payload;
        console.log("Posts in postSlice:", state.posts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = true;
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
