export const plantCategories = ['succulent', 'tropical', 'fern', 'herb', 'unknown'] as const;

export type PlantCategory = (typeof plantCategories)[number];

export type PlantStatus = "upcoming" | "forgot" | "history";

export type CareTaskType = 'water' | 'fertilize';

export type CareSchedule = {
  type: CareTaskType;
  intervalDays: number;
  lastCompleted?: string;
};

export type Plant = {
  id: string;
  name: string;
  description?: string;
  category: PlantCategory;
  room?: string;
  photoUri?: string;
  waterAmount?: string;
  waterDays?: string[];
  status?: PlantStatus;
  createdAt: string;
  schedules: CareSchedule[];
};

export type PlantDraft = Omit<Plant, 'id' | 'createdAt' | 'schedules'>;
