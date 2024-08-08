import { atom } from 'recoil';

// プラン、価格、アプリケーションの状態を管理するためのRecoil atoms
export const selectedPlanState = atom<string | null>({
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
