import { atom } from 'recoil';
import { PlanDetail } from '../components/Service'; // PlanDetailのインポート

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
