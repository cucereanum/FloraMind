import { storage } from '@src/storage/mmkv';

const ONBOARDING_KEY = 'floramind/onboarding/seen';

export function getOnboardingSeen(): boolean {
  return storage.getBoolean(ONBOARDING_KEY) ?? false;
}

export function setOnboardingSeen(value: boolean): void {
  storage.set(ONBOARDING_KEY, value);
}
