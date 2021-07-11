import { configureStore } from "@reduxjs/toolkit";

import CounterReducer from "./slices/counter";

const Store = configureStore({
  reducer: {
    counter: CounterReducer,
  },
});

export default Store;
