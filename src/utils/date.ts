const dayMs = 24 * 60 * 60 * 1000;

export function nowIso() {
  return new Date().toISOString();
}

export function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function addDays(base: Date, days: number) {
  return new Date(base.getTime() + days * dayMs);
}

export function dayDiff(target: Date, base: Date) {
  const diff = target.getTime() - base.getTime();
  return Math.round(diff / dayMs);
}
