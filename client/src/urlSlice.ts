import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface urlIns {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
}

interface UrlState {
  urls: urlIns | null;
  loading: boolean;
  error: string | null;
}

const initialState: UrlState = {
  urls: null,
  loading: false,
  error: null,
};

export const createShortUrl = createAsyncThunk(
  "url/createShortUrl",
  async (originalUrl: string) => {
    try {
      const response = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl }),
      });
      const data = await response.json();

      return { data, ok: response.ok };
    } catch (error: unknown) {
      return { error: (error as Error).message };
    }
  }
);

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createShortUrl.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createShortUrl.fulfilled, (state, action) => {
      state.loading = false;

      const { data, ok } = action.payload;

      if (ok === false) {
        state.error = data.message;
      } else {
        state.urls = data.data;
      }
    });
    builder.addCase(createShortUrl.rejected, (state) => {
      console.log("An error occurred");
      state.loading = false;
      state.error = "An error occurred";
    });
  },
});

export default urlSlice.reducer;
