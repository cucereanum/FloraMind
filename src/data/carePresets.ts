import { CareSchedule, PlantCategory } from '@src/types';

type CarePreset = {
  waterEvery: number;
  fertilizeEvery: number;
};

export const carePresets: Record<PlantCategory, CarePreset> = {
  succulent: { waterEvery: 14, fertilizeEvery: 45 },
  tropical: { waterEvery: 7, fertilizeEvery: 30 },
  fern: { waterEvery: 5, fertilizeEvery: 30 },
  herb: { waterEvery: 4, fertilizeEvery: 30 },
  unknown: { waterEvery: 7, fertilizeEvery: 45 },
};

export function buildSchedules(category: PlantCategory): CareSchedule[] {
  const preset = carePresets[category];
  return [
    { type: 'water', intervalDays: preset.waterEvery },
    { type: 'fertilize', intervalDays: preset.fertilizeEvery },
  ];
}
