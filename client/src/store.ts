import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import urlSlice from "./urlSlice";

export const store = configureStore({
  reducer: {
    url: urlSlice,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
