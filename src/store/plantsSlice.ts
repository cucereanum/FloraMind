import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { loadPlants } from '@src/storage/plants';
import type { Plant, PlantDraft } from '@src/types';
import { createPlant } from '@src/utils/plant';

type PlantsState = {
  items: Plant[];
};

const initialState: PlantsState = {
  items: loadPlants(),
};

const plantsSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {
    addPlant: (state, action: PayloadAction<PlantDraft>) => {
      const payload = action.payload;
      const next = createPlant({
        name: payload.name,
        category: payload.category ?? 'unknown',
        description: payload.description,
        room: payload.room,
        photoUri: payload.photoUri,
        waterAmount: payload.waterAmount,
        waterDays: payload.waterDays,
      });
      state.items.unshift(next);
    },
    updatePlant: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Plant> }>,
    ) => {
      const { id, updates } = action.payload;
      const index = state.items.findIndex((plant) => plant.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates };
      }
    },
  },
});

export const { addPlant, updatePlant } = plantsSlice.actions;
export default plantsSlice.reducer;
