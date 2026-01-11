import { addDays, dayDiff, startOfToday } from './date';
import { CareSchedule, Plant } from '../types';

export type DueInfo = {
  type: CareSchedule['type'];
  dueDate: Date;
  label: string;
};

export function getNextDue(plant: Plant): DueInfo | null {
  if (plant.schedules.length === 0) {
    return null;
  }

  const baseDate = startOfToday();
  let next: DueInfo | null = null;

  plant.schedules.forEach((schedule) => {
    const last = schedule.lastCompleted ? new Date(schedule.lastCompleted) : new Date(plant.createdAt);
    const dueDate = addDays(last, schedule.intervalDays);
    const label = formatDueLabel(dueDate, baseDate);
    if (!next || dueDate.getTime() < next.dueDate.getTime()) {
      next = { type: schedule.type, dueDate, label };
    }
  });

  return next;
}

function formatDueLabel(dueDate: Date, baseDate: Date) {
  const diff = dayDiff(dueDate, baseDate);
  if (diff === 0) return 'Due today';
  if (diff === 1) return 'Due tomorrow';
  if (diff > 1) return `In ${diff} days`;
  if (diff === -1) return 'Overdue by 1 day';
  return `Overdue by ${Math.abs(diff)} days`;
}
