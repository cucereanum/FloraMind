import { storage } from '@src/storage/mmkv';
import { Plant } from '@src/types';

const STORAGE_KEY = 'floramind/plants';

export function loadPlants(): Plant[] {
  const stored = storage.getString(STORAGE_KEY);
  if (!stored) {
    return [];
  }
  try {
    return JSON.parse(stored) as Plant[];
  } catch {
    return [];
  }
}

export function savePlants(plants: Plant[]): void {
  storage.set(STORAGE_KEY, JSON.stringify(plants));
}
