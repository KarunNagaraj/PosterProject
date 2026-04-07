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

const createPosterState = () => ({
  ...DEFAULT_STATE,
  sdgs: [...(DEFAULT_STATE.sdgs || [])],
});

const createDesignState = () => ({
  ...DEFAULT_DESIGN,
  textScale: { ...DEFAULT_DESIGN.textScale },
});

const serializeEditorState = (poster, design) =>
  JSON.stringify({ poster, design });

const mergePosterState = (savedPoster = {}) => ({
  ...createPosterState(),
  ...savedPoster,
  sdgs: Array.isArray(savedPoster.sdgs)
    ? savedPoster.sdgs
    : [...createPosterState().sdgs],
});

const mergeDesignState = (savedDesign = {}) => ({
  ...createDesignState(),
  ...savedDesign,
  textScale: {
    ...createDesignState().textScale,
    ...(savedDesign.textScale || {}),
  },
});

const withDirtyState = (state, patch) => {
  const nextPoster = patch.poster ?? state.poster;
  const nextDesign = patch.design ?? state.design;

  return {
    ...patch,
    hasUnsavedChanges:
      serializeEditorState(nextPoster, nextDesign) !== state.lastSyncedSnapshot,
  };
};

export const usePosterStore = create((set, get) => ({
  poster: createPosterState(),
  design: createDesignState(),
  isDark: true,
  qrDataUrl: null,
  isSaving: false,
  savedPosters: [],
  isFetchingPosters: false,
  isLoadingPoster: false,
  savedPostersError: null,
  activePosterId: null,
  lastSyncedSnapshot: serializeEditorState(createPosterState(), createDesignState()),
  hasUnsavedChanges: false,

  setPosterField: (key, value) =>
    set((state) =>
      withDirtyState(state, {
        poster: {
          ...state.poster,
          [key]: value,
        },
      })
    ),

  setDesignField: (key, value) =>
    set((state) =>
      withDirtyState(state, {
        design: {
          ...state.design,
          [key]: value,
        },
      })
    ),

  applyCategoryTheme: (category) => {
    const theme = CATEGORY_THEMES[category];
    if (!theme) return;

    set((state) =>
      withDirtyState(state, {
        design: {
          ...state.design,
          gradient: theme.gradient,
          accent: theme.accent,
          layout: theme.layout,
        },
      })
    );
  },

  randomizeAll: () =>
    set((state) =>
      withDirtyState(state, {
        design: {
          ...state.design,
          gradient: randomInt(GRADIENTS.length),
          accent: randomItem(ACCENTS),
          layout: randomInt(LAYOUT_NAMES.length),
          font: randomItem(FONT_PAIRS).value,
          bgtype: randomItem(RANDOM_BG_TYPES),
        },
      })
    ),

  randomizeLayout: () =>
    set((state) =>
      withDirtyState(state, {
        design: {
          ...state.design,
          layout: randomInt(LAYOUT_NAMES.length),
        },
      })
    ),

  toggleTheme: () =>
    set((state) => ({
      isDark: !state.isDark,
    })),

  setQrDataUrl: (qrDataUrl) => set({ qrDataUrl }),
  replaceEditorState: (savedPoster) =>
    set(() => {
      const poster = mergePosterState(savedPoster.posterState);
      const design = mergeDesignState(savedPoster.designState);

      return {
        poster,
        design,
        activePosterId: savedPoster._id,
        lastSyncedSnapshot: serializeEditorState(poster, design),
        hasUnsavedChanges: false,
      };
    }),

  markCurrentStateSaved: (savedPoster) =>
    set((state) => {
      const poster = mergePosterState(savedPoster?.posterState ?? state.poster);
      const design = mergeDesignState(savedPoster?.designState ?? state.design);

      return {
        poster,
        design,
        activePosterId: savedPoster?._id ?? state.activePosterId,
        lastSyncedSnapshot: serializeEditorState(poster, design),
        hasUnsavedChanges: false,
      };
    }),

  fetchSavedPosters: async (token) => {
    set({ isFetchingPosters: true, savedPostersError: null });

    try {
      const response = await fetch('http://localhost:5000/api/posters', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch saved posters');
      }

      const posters = await response.json();
      set({ savedPosters: posters });
    } catch (error) {
      console.error('Error fetching posters:', error);
      set({ savedPostersError: error.message || 'Failed to fetch saved posters' });
    } finally {
      set({ isFetchingPosters: false });
    }
  },

  loadPosterById: async (posterId, token) => {
    set({ isLoadingPoster: true, savedPostersError: null });

    try {
      const response = await fetch(`http://localhost:5000/api/posters/${posterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load poster');
      }

      const savedPoster = await response.json();
      get().replaceEditorState(savedPoster);
      return savedPoster;
    } catch (error) {
      console.error('Error loading poster:', error);
      set({ savedPostersError: error.message || 'Failed to load poster' });
      return null;
    } finally {
      set({ isLoadingPoster: false });
    }
  },

  savePosterToCloud: async (token) => {
    set({ isSaving: true });

    try {
      const { poster, design } = get();

      const response = await fetch('http://localhost:5000/api/posters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: poster.title || 'My Poster',
          posterState: poster,
          designState: design,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to save poster');
      }

      const savedData = await response.json();
      get().markCurrentStateSaved(savedData);

      set((state) => ({
        savedPosters: [
          {
            _id: savedData._id,
            title: savedData.title,
            updatedAt: savedData.updatedAt,
            createdAt: savedData.createdAt,
            category: savedData.posterState?.category ?? '',
          },
          ...state.savedPosters.filter((item) => item._id !== savedData._id),
        ],
      }));

      alert('Poster saved to your account!');
    } catch (error) {
      console.error('Error saving poster:', error);
      alert('Failed to save poster. Please try again.');
    } finally {
      set({ isSaving: false });
    }
  },
}));
