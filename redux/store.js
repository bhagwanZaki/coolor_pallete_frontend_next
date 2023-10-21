import { configureStore } from "@reduxjs/toolkit";
import colorDataReducer from "./reducers/color-slice";

export const store = configureStore({
  reducer: {
    colorDataReducer,
  },
});
