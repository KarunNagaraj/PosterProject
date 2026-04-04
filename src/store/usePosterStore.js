import { create } from 'zustand';
import {
  DEFAULT_STATE,
  DEFAULT_DESIGN,
  GRADIENTS,
  ACCENTS,
  FONT_PAIRS,
  LAYOUT_NAMES,
  CATEGORY_THEMES,
} from '../constants';
import { randomInt, randomItem } from '../utils';

const RANDOM_BG_TYPES = ['gradient', 'gradient', 'gradient', 'pattern', 'mesh'];

const createPosterState = () => ({ ...DEFAULT_STATE });
const createDesignState = () => ({ ...DEFAULT_DESIGN });

export const usePosterStore = create((set) => ({
  poster: createPosterState(),
  design: createDesignState(),
  isDark: true,
  qrDataUrl: null,

  setPosterField: (key, value) =>
    set((state) => ({
      poster: {
        ...state.poster,//copy existing posters key value pairs
        [key]: value,//overwrite the specific key with new value
      },
    })),

  setDesignField: (key, value) =>
    set((state) => ({
      design: {
        ...state.design,
        [key]: value,
      },
    })),

  applyCategoryTheme: (category) => {
    const theme = CATEGORY_THEMES[category];
    if (!theme) return;

    set((state) => ({
      design: {
        ...state.design,
        gradient: theme.gradient,
        accent: theme.accent,
        layout: theme.layout,
      },
    }));
  },

  randomizeAll: () =>
    set((state) => ({
      design: {
        ...state.design,
        gradient: randomInt(GRADIENTS.length),
        accent: randomItem(ACCENTS),
        layout: randomInt(LAYOUT_NAMES.length),
        font: randomItem(FONT_PAIRS).value,
        bgtype: randomItem(RANDOM_BG_TYPES),
      },
    })),

  randomizeLayout: () =>
    set((state) => ({
      design: {
        ...state.design,
        layout: randomInt(LAYOUT_NAMES.length),
      },
    })),

  toggleTheme: () =>
    set((state) => ({
      isDark: !state.isDark,
    })),

  setQrDataUrl: (qrDataUrl) => set({ qrDataUrl }),
}));
