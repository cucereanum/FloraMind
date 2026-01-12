import { configureStore } from "@reduxjs/toolkit";

import { savePlants } from "@src/storage/plants";
import plantsReducer from "@src/store/plantsSlice";

export const store = configureStore({
  reducer: {
    plants: plantsReducer,
  },
});

let lastSerialized = "";
store.subscribe(() => {
  const state = store.getState();
  const nextSerialized = JSON.stringify(state.plants.items);
  if (nextSerialized !== lastSerialized) {
    lastSerialized = nextSerialized;
    savePlants(state.plants.items);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
