import { nowIso } from './date';
import { makeId } from './id';
import { buildSchedules } from '../data/carePresets';
import { CareTaskType, Plant, PlantCategory } from '../types';

type PlantInput = {
  name: string;
  category: PlantCategory;
  room?: string;
  photoUri?: string;
};

export function createPlant(input: PlantInput): Plant {
  const createdAt = nowIso();
  return {
    id: makeId(),
    name: input.name.trim(),
    category: input.category,
    room: input.room?.trim() || undefined,
    photoUri: input.photoUri,
    createdAt,
    schedules: buildSchedules(input.category),
  };
}

export function markTaskCompleted(plant: Plant, type: CareTaskType): Plant {
  const completedAt = nowIso();
  return {
    ...plant,
    schedules: plant.schedules.map((schedule) =>
      schedule.type === type ? { ...schedule, lastCompleted: completedAt } : schedule,
    ),
  };
}
