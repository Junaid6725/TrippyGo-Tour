import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/reduxToolkit/slices/authSlices/authSlices.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
