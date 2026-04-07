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

export const usePosterStore = create((set, get) => ({
  poster: createPosterState(),
  design: createDesignState(),
  isDark: true,
  qrDataUrl: null,
  isSaving: false, // New state to handle loading UI

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
  // NEW: Action to save to the backend
  savePosterToCloud: async (token) => {
    set({ isSaving: true });
    try {
      const { poster, design } = get();
      
      const response = await fetch('http://localhost:5000/api/posters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Secure token from Clerk
        },
        body: JSON.stringify({
          title: `${poster.eventName || 'My'} Poster`, // Create a dynamic title
          posterState: poster,
          designState: design
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to save poster');
      }

      const savedData = await response.json();
      console.log('Poster saved successfully:', savedData);
      alert('Poster saved to your account!');

    } catch (error) {
      console.error('Error saving poster:', error);
      alert('Failed to save poster. Please try again.');
    } finally {
      set({ isSaving: false });
    }
  }

}));
