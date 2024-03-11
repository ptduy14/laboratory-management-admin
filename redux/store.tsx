import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";

export const store = configureStore({
  reducer: userSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
