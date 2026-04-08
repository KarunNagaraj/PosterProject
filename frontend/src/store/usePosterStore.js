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
  speakers: (DEFAULT_STATE.speakers || []).map((speaker) => ({ ...speaker })),
  sdgs: [...(DEFAULT_STATE.sdgs || [])],
});

const createDesignState = () => ({
  ...DEFAULT_DESIGN,
  textScale: { ...DEFAULT_DESIGN.textScale },
  movableElementsByLayout: {},
  customTextboxes: [],
});

const createSpeakerId = () =>
  `speaker-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const createTextboxId = () =>
  `textbox-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const normalizeSpeakers = (savedPoster = {}) => {
  if (Array.isArray(savedPoster.speakers)) {
    return savedPoster.speakers.map((speaker, index) => ({
      id: speaker.id || createSpeakerId(),
      role: speaker.role || '',
      name: speaker.name || '',
      title: speaker.title || '',
      details: speaker.details ?? speaker.alumni ?? '',
      img: speaker.img ?? null,
      order: speaker.order ?? index,
    }));
  }

  const legacySpeakers = [1, 2]
    .map((index) => ({
      id: `speaker-${index}`,
      role: '',
      name: savedPoster[`sp${index}name`] || '',
      title: savedPoster[`sp${index}title`] || '',
      details: savedPoster[`sp${index}details`] ?? savedPoster[`sp${index}alumni`] ?? '',
      img: savedPoster[`sp${index}img`] ?? null,
      order: index - 1,
    }))
    .filter((speaker) => speaker.name || speaker.title || speaker.details || speaker.img);

  return legacySpeakers.length > 0
    ? legacySpeakers
    : createPosterState().speakers.map((speaker, index) => ({
        ...speaker,
        order: index,
      }));
};

const serializeEditorState = (poster, design) =>
  JSON.stringify({ poster, design });

const mergePosterState = (savedPoster = {}) => ({
  ...createPosterState(),
  ...savedPoster,
  speakers: normalizeSpeakers(savedPoster),
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
  movableElementsByLayout: savedDesign.movableElementsByLayout || {},
  customTextboxes: Array.isArray(savedDesign.customTextboxes)
    ? savedDesign.customTextboxes
    : [],
});

const mergeLayoutElementPatch = (movableElementsByLayout, layoutId, elementId, patch) => ({
  ...movableElementsByLayout,
  [layoutId]: {
    ...(movableElementsByLayout[layoutId] || {}),
    [elementId]: {
      ...(movableElementsByLayout[layoutId]?.[elementId] || {}),
      ...patch,
    },
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
  selectedCanvasElement: null,

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

  setSpeakerField: (speakerId, key, value) =>
    set((state) =>
      withDirtyState(state, {
        poster: {
          ...state.poster,
          speakers: state.poster.speakers.map((speaker) =>
            speaker.id === speakerId
              ? {
                  ...speaker,
                  [key]: value,
                }
              : speaker
          ),
        },
      })
    ),

  addSpeaker: () =>
    set((state) =>
      withDirtyState(state, {
        poster: {
          ...state.poster,
          speakers: [
            ...state.poster.speakers,
            {
              id: createSpeakerId(),
              role: '',
              name: '',
              title: '',
              details: '',
              img: null,
              order: state.poster.speakers.length,
            },
          ],
        },
      })
    ),

  removeSpeaker: (speakerId) =>
    set((state) =>
      withDirtyState(state, {
        poster: {
          ...state.poster,
          speakers: state.poster.speakers.filter((speaker) => speaker.id !== speakerId),
        },
      })
    ),

  updateMovableElement: (layoutId, elementId, patch) =>
    set((state) =>
      withDirtyState(state, {
        design: {
          ...state.design,
          movableElementsByLayout: mergeLayoutElementPatch(
            state.design.movableElementsByLayout,
            layoutId,
            elementId,
            patch
          ),
        },
      })
    ),

  addCustomTextbox: (textbox = {}) => {
    const id = createTextboxId();

    set((state) =>
      withDirtyState(state, {
        design: {
          ...state.design,
          customTextboxes: [
            ...state.design.customTextboxes,
            {
              id,
              text: 'Add your text',
              x: 48,
              y: 48,
              width: 180,
              fontSize: 20,
              color: state.design.primary,
              fontFamily: 'body',
              ...textbox,
            },
          ],
        },
      })
    );

    set({
      selectedCanvasElement: {
        kind: 'textbox',
        id,
      },
    });
  },

  updateCustomTextbox: (textboxId, patch) =>
    set((state) =>
      withDirtyState(state, {
        design: {
          ...state.design,
          customTextboxes: state.design.customTextboxes.map((textbox) =>
            textbox.id === textboxId
              ? {
                  ...textbox,
                  ...patch,
                }
              : textbox
          ),
        },
      })
    ),

  removeCustomTextbox: (textboxId) =>
    set((state) => ({
      ...withDirtyState(state, {
        design: {
          ...state.design,
          customTextboxes: state.design.customTextboxes.filter(
            (textbox) => textbox.id !== textboxId
          ),
        },
      }),
      selectedCanvasElement:
        state.selectedCanvasElement?.kind === 'textbox' &&
        state.selectedCanvasElement?.id === textboxId
          ? null
          : state.selectedCanvasElement,
    })),

  selectCanvasElement: (selection) =>
    set({
      selectedCanvasElement: selection,
    }),

  clearCanvasSelection: () =>
    set({
      selectedCanvasElement: null,
    }),

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
        selectedCanvasElement: null,
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
        selectedCanvasElement: null,
      };
    }),

  fetchSavedPosters: async (token) => {
    set({ isFetchingPosters: true, savedPostersError: null });

    try {
      const response = await fetch('/api/posters', {
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
      const response = await fetch(`/api/posters/${posterId}`, {
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

      const response = await fetch('/api/posters', {
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
