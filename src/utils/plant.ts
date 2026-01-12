import { buildSchedules } from "@src/data/carePresets";
import { CareTaskType, Plant, PlantCategory } from "@src/types";
import { nowIso } from "@src/utils/date";
import { makeId } from "@src/utils/id";

type PlantInput = {
  name: string;
  category: PlantCategory;
  description?: string;
  room?: string;
  photoUri?: string;
  waterAmount?: string;
  waterDays?: string[];
};

export function createPlant(input: PlantInput): Plant {
  const createdAt = nowIso();
  return {
    id: makeId(),
    name: input.name.trim(),
    description: input.description?.trim() || undefined,
    category: input.category,
    room: input.room?.trim() || undefined,
    photoUri: input.photoUri,
    waterAmount: input.waterAmount?.trim() || undefined,
    waterDays: input.waterDays?.length ? input.waterDays : undefined,
    createdAt,
    schedules: buildSchedules(input.category),
  };
}

export function markTaskCompleted(plant: Plant, type: CareTaskType): Plant {
  const completedAt = nowIso();
  return {
    ...plant,
    schedules: plant.schedules.map((schedule) =>
      schedule.type === type
        ? { ...schedule, lastCompleted: completedAt }
        : schedule
    ),
  };
}
