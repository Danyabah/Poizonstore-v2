import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userReducer";
import settingsReducer from "./slices/settingsReducer";
import categoriesReducer from "./slices/categoriesReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
