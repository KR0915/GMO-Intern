// atoms.ts
import { atom } from 'recoil';

interface PlanDetail {
  size: string;
  cpu: string;
  ssd: string;
}

export const selectedPlanState = atom<PlanDetail | null>({
  key: 'selectedPlanState',
  default: null,
});

export const selectedPriceState = atom<number | null>({
  key: 'selectedPriceState',
  default: null,
});

export const selectedAppState = atom<string | null>({
  key: 'selectedAppState',
  default: null,
});

export const selectedServiceState = atom<string | null>({
  key: 'selectedServiceState',
  default: null,
});

export const selectedOptionState = atom<string | null>({
  key: 'selectedOptionState',
  default: null,
});
