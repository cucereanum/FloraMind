export const plantCategories = ['succulent', 'tropical', 'fern', 'herb', 'unknown'] as const;

export type PlantCategory = (typeof plantCategories)[number];

export type CareTaskType = 'water' | 'fertilize';

export type CareSchedule = {
  type: CareTaskType;
  intervalDays: number;
  lastCompleted?: string;
};

export type Plant = {
  id: string;
  name: string;
  category: PlantCategory;
  room?: string;
  photoUri?: string;
  createdAt: string;
  schedules: CareSchedule[];
};
