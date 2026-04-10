// ── Gradient palettes ─────────────────────────
export const GRADIENTS = [
  ['#0f2027', '#203a43', '#2c5364'],
  ['#1a1a2e', '#16213e', '#0f3460'],
  ['#2d1b69', '#11998e', '#38ef7d'],
  ['#360033', '#0b8793', '#360033'],
  ['#1a472a', '#2d5a27', '#52b788'],
  ['#7b2d00', '#c85c1d', '#f9a14f'],
  ['#0d0d0d', '#2d2d2d', '#0d0d0d'],
  ['#03045e', '#023e8a', '#0077b6'],
  ['#370617', '#6a040f', '#d62828'],
  ['#240046', '#5a0080', '#c77dff'],
  ['#1f4e79', '#2e75b6', '#9dc3e6'],
  ['#1b263b', '#415a77', '#778da9'],
  ['#4a0e0e', '#7b2d2d', '#b56576'],
  ['#0d1f0d', '#1a4a1a', '#2d7a2d'],
  ['#2c1810', '#5c3317', '#c47c3e'],
];

// ── Accent colors ─────────────────────────────
export const ACCENTS = [
  '#FFD700', '#FF6B6B', '#4ECDC4', '#C77DFF',
  '#F8961E', '#43AA8B', '#F72585', '#90E0EF',
  '#CAFFBF', '#FFB4A2', '#FF9F1C', '#2EC4B6',
];

// ── Primary text colors (for contrast on dark backgrounds) ────────────────────────
export const PRIMARY_COLORS = [
  '#FFFFFF', '#222121', '#123085', '#D3D3D3',
  '#F8961E', '#43AA8B', '#F72585', '#90E0EF',
  '#CAFFBF', '#FFB4A2', '#FF9F1C', '#2EC4B6',
];

// ── Font pairings: [display, body] ───────────
export const FONT_PAIRS = [
  { label: 'Classic Academic',   value: 'Georgia,serif|Trebuchet MS,sans-serif' },
  { label: 'Refined Palatino',   value: "'Palatino Linotype',serif|Optima,sans-serif" },
  { label: 'Traditional Serif',  value: "'Times New Roman',serif|Verdana,sans-serif" },
  { label: 'Bold Impact',        value: 'Impact,fantasy|Tahoma,sans-serif' },
  { label: 'Tech Mono',          value: "'Courier New',monospace|Tahoma,sans-serif" },
  { label: 'Garamond Modern',    value: "Garamond,serif|'Gill Sans',sans-serif" },
  { label: 'Antiqua Century',    value: "'Book Antiqua',serif|'Century Gothic',sans-serif" },
  { label: 'Heavy Sans',         value: "'Arial Black',sans-serif|Arial,sans-serif" },
  { label: 'Modern Sans',        value: 'Montserrat,sans-serif|Poppins,sans-serif' },
];

// ── Layout names (matches index in layouts file) ──
export const LAYOUT_NAMES = [
  'Classic', 'Editorial', 'Split', 'Band',
  'Overlay', 'Minimal', 'Diagonal', 'Frame',
  'Timeline', 'Typographic',
];

// ── Per-category default theme ────────────────
export const CATEGORY_THEMES = {
  'Workshop':          { gradient: 2,  accent: '#38ef7d', layout: 0 },
  'Seminar':           { gradient: 1,  accent: '#FFD700', layout: 2 },
  'Skill Enhancement': { gradient: 9,  accent: '#C77DFF', layout: 4 },
  'Competitive Exam':  { gradient: 8,  accent: '#FF6B6B', layout: 6 },
  'Guest Lecture':     { gradient: 10, accent: '#90E0EF', layout: 1 },
  'Hackathon':         { gradient: 6,  accent: '#4ECDC4', layout: 7 },
  'Symposium':         { gradient: 3,  accent: '#FFD700', layout: 3 },
  'Conference':        { gradient: 11, accent: '#43AA8B', layout: 5 },
  'Webinar':           { gradient: 7,  accent: '#90E0EF', layout: 8 },
  'FDP':               { gradient: 13, accent: '#CAFFBF', layout: 9 },
};

// ── Category options for dropdown ────────────
export const CATEGORIES = [
  'Workshop', 'Seminar', 'Skill Enhancement', 'Competitive Exam',
  'Guest Lecture', 'Hackathon', 'Symposium', 'Conference', 'Webinar', 'FDP',
];

// ── Poster size dimensions [width, height] px ─
export const POSTER_SIZES = {
  signagePortrait: { label: 'Portrait Signage (1080×1515)', w: 1080, h: 1515 },
  signageLandscape: { label: 'Landscape Signage (1920×1080)', w: 1920, h: 1080 },
  ledWall: { label: 'LED Wall (1620×810)', w: 1620, h: 810 },
};

// ── Background types ──────────────────────────
export const BG_TYPES = [
  { value: 'gradient', label: 'Gradient' },
  { value: 'solid',    label: 'Solid Color' },
  { value: 'pattern',  label: 'Geometric Pattern' },
  { value: 'mesh',     label: 'Mesh Gradient' },
  { value: 'image',    label: 'Image Upload' },
];

// ── Category icons for Minimal layout ────────
export const CATEGORY_ICONS = {
  'Workshop': '🛠', 'Seminar': '🎓', 'Hackathon': '💻',
  'Competitive Exam': '🏆', 'Conference': '🌐',
  'Webinar': '🖥', 'FDP': '📋', 'Symposium': '🎤',
  'Skill Enhancement': '💡', 'Guest Lecture': '🎙',
};
// ── SDG options with icons ─────────────────────`
export const SDG_OPTIONS = [
  { value: 1,  label: 'No Poverty',                              img: '/sdg/E_SDG_PRINT-01.jpg' },
  { value: 2,  label: 'Zero Hunger',                             img: '/sdg/E_SDG_PRINT-02.jpg' },
  { value: 3,  label: 'Good Health and Well-being',              img: '/sdg/E_SDG_PRINT-03.jpg' },
  { value: 4,  label: 'Quality Education',                       img: '/sdg/E_SDG_PRINT-04.jpg' },
  { value: 5,  label: 'Gender Equality',                         img: '/sdg/E_SDG_PRINT-05.jpg' },
  { value: 6,  label: 'Clean Water and Sanitation',              img: '/sdg/E_SDG_PRINT-06.jpg' },
  { value: 7,  label: 'Affordable and Clean Energy',             img: '/sdg/E_SDG_PRINT-07.jpg' },
  { value: 8,  label: 'Decent Work and Economic Growth',         img: '/sdg/E_SDG_PRINT-08.jpg' },
  { value: 9,  label: 'Industry, Innovation and Infrastructure', img: '/sdg/E_SDG_PRINT-09.jpg' },
  { value: 10, label: 'Reduced Inequalities',                    img: '/sdg/E_SDG_PRINT-10.jpg' },
  { value: 11, label: 'Sustainable Cities and Communities',      img: '/sdg/E_SDG_PRINT-11.jpg' },
  { value: 12, label: 'Responsible Consumption and Production',  img: '/sdg/E_SDG_PRINT-12.jpg' },
  { value: 13, label: 'Climate Action',                          img: '/sdg/E_SDG_PRINT-13.jpg' },
  { value: 14, label: 'Life Below Water',                        img: '/sdg/E_SDG_PRINT-14.jpg' },
  { value: 15, label: 'Life on Land',                            img: '/sdg/E_SDG_PRINT-15.jpg' },
  { value: 16, label: 'Peace, Justice and Strong Institutions',  img: '/sdg/E_SDG_PRINT-16.jpg' },
  { value: 17, label: 'Partnerships for the Goals',              img: '/sdg/E_SDG_PRINT-17.jpg' },
];

// ── Default poster state ──────────────────────
export const DEFAULT_STATE = {
  // Header
  university: 'Christ University',
  dept: 'Department of Computer Science',
  campus: 'Bangalore, Central Campus',
  tagline: '',
  logoImg: '/logo%20(1).png',
  // Event
  category: 'Workshop',
  title: 'Introduction to Machine Learning',
  titlePosition: {
  x: 0,
  y: 0,
  },
  subtitle: 'Bridging Theory and Practice',
  date: '2025-04-15',
  time: '10:00',
  venue: 'Seminar Hall A, Block IV',
  audience: 'II & III Year B.E. / B.Tech Students',
  reglink: '',
  showQR: false,
  // Speakers
  speakers: [
    {
      id: 'speaker-1',
      role: 'Resource Person',
      name: 'Dr. Rajesh Kumar',
      title: 'Associate Professor, IIT Madras',
      details: "B.E. CSE '08",
      img: null,
    },
    {
      id: 'speaker-2',
      role: '',
      name: '',
      title: '',
      details: '',
      img: null,
    },
  ],
  sdgs: [],
};

// ── Default design state ──────────────────────
export const DEFAULT_DESIGN = {
  layout: 0,
  bgtype: 'solid',
  gradient: 2,
  bgcolor: '#1e3a5f',
  bgimg: null,
  accent: '#38ef7d',
  primary: '#FFFFFF',
  font: 'Georgia,serif|Trebuchet MS,sans-serif',
  align: 'center',
  size: 'signagePortrait',
  textScale: {
    primary: 1, // headings
    secondary: 1, // subtitles, metadata
  },
};

const cloneDefaultSpeaker = (speaker) => ({ ...speaker });

const cloneDefaultDesign = (overrides = {}) => {
  const { customTextboxes: _customTextboxes, ...designOverrides } = overrides;

  return {
    ...DEFAULT_DESIGN,
    ...designOverrides,
    textScale: {
      ...DEFAULT_DESIGN.textScale,
      ...(overrides.textScale || {}),
    },
  };
};

const cloneDefaultPoster = (overrides = {}) => ({
  ...DEFAULT_STATE,
  ...overrides,
  speakers: Array.isArray(overrides.speakers)
    ? overrides.speakers.map((speaker, index) => ({
        id: speaker.id || `landing-speaker-${index + 1}`,
        role: '',
        name: '',
        title: '',
        details: '',
        img: null,
        ...speaker,
      }))
    : DEFAULT_STATE.speakers.map(cloneDefaultSpeaker),
  sdgs: Array.isArray(overrides.sdgs) ? [...overrides.sdgs] : [...DEFAULT_STATE.sdgs],
});

const createLandingPreset = ({
  id,
  kicker,
  description,
  poster,
  design,
}) => ({
  id,
  kicker,
  description,
  poster: cloneDefaultPoster(poster),
  design: cloneDefaultDesign(design),
});

export const LANDING_POSTER_PRESETS = [
  createLandingPreset({
    id: 'ml-workshop',
    kicker: 'Workshop',
    description: 'A high-energy portrait layout for hands-on faculty and student sessions.',
    poster: {
      university: 'Christ University',
      dept: 'School of Sciences',
      campus: 'Central Campus, Bangalore',
      category: 'Workshop',
      title: 'AI Design Sprint',
      subtitle: 'Prototype, prompt, and publish in one afternoon',
      date: '2026-04-18',
      time: '14:00',
      venue: 'Innovation Lab 2',
      audience: 'Design and CS students',
      tagline: 'Build sharp visuals without a long production cycle',
      speakers: [
        {
          id: 'landing-speaker-ai-1',
          role: 'Lead Mentor',
          name: 'Asha Menon',
          title: 'Creative Technologist',
          details: 'Interaction Design Lab',
          img: null,
        },
        {
          id: 'landing-speaker-ai-2',
          role: 'Guest Expert',
          name: 'Rohan Xavier',
          title: 'ML Product Designer',
          details: 'Studio North',
          img: null,
        },
      ],
    },
    design: {
      layout: 4,
      bgtype: 'gradient',
      gradient: 9,
      accent: '#FFB4A2',
      primary: '#FFFFFF',
      font: 'Montserrat,sans-serif|Poppins,sans-serif',
      size: 'signagePortrait',
    },
  }),
  createLandingPreset({
    id: 'research-symposium',
    kicker: 'Symposium',
    description: 'A formal composition tuned for keynote-heavy academic events.',
    poster: {
      university: 'Christ University',
      dept: 'Centre for Research',
      campus: 'Bannerghatta Road Campus',
      category: 'Symposium',
      title: 'Future of Learning Systems',
      subtitle: 'Research talks on adaptive education and applied AI',
      date: '2026-05-02',
      time: '09:30',
      venue: 'Main Auditorium',
      audience: 'Faculty, researchers, and PG scholars',
      tagline: 'Elegant academic communication for flagship events',
      speakers: [
        {
          id: 'landing-speaker-research-1',
          role: 'Keynote',
          name: 'Dr. Mira Nair',
          title: 'Professor, Learning Sciences',
          details: 'National Institute of Education',
          img: null,
        },
      ],
    },
    design: {
      layout: 7,
      bgtype: 'gradient',
      gradient: 11,
      accent: '#FFD700',
      primary: '#FFFFFF',
      font: "'Palatino Linotype',serif|Optima,sans-serif",
      size: 'signagePortrait',
    },
  }),
  createLandingPreset({
    id: 'hacknight',
    kicker: 'Hackathon',
    description: 'A wide-format event poster built for social sharing and hallway displays.',
    poster: {
      university: 'Christ University',
      dept: 'Tech Club',
      campus: 'Kengeri Campus',
      category: 'Hackathon',
      title: 'Midnight Buildathon',
      subtitle: '24 hours of rapid prototyping and live demos',
      date: '2026-05-14',
      time: '18:00',
      venue: 'Digital Fabrication Studio',
      audience: 'Interdisciplinary student teams',
      tagline: 'Fast visuals for fast-moving campus events',
      speakers: [
        {
          id: 'landing-speaker-hack-1',
          role: 'Host',
          name: 'Campus Tech Guild',
          title: 'Student Innovation Collective',
          details: 'Open to all departments',
          img: null,
        },
      ],
    },
    design: {
      layout: 6,
      bgtype: 'gradient',
      gradient: 7,
      accent: '#4ECDC4',
      primary: '#FFFFFF',
      font: "'Courier New',monospace|Tahoma,sans-serif",
      size: 'signageLandscape',
    },
  }),
  createLandingPreset({
    id: 'faculty-webinar',
    kicker: 'Webinar',
    description: 'A clean remote-event treatment that still feels distinctly academic.',
    poster: {
      university: 'Christ University',
      dept: 'Faculty Development Cell',
      campus: 'Remote Broadcast Series',
      category: 'Webinar',
      title: 'From Draft to Defense',
      subtitle: 'Publishing strategies for emerging researchers',
      date: '2026-05-28',
      time: '17:30',
      venue: 'Online via Teams',
      audience: 'Faculty members and research assistants',
      tagline: 'Built for online sessions, exports, and cross-channel promotion',
      speakers: [
        {
          id: 'landing-speaker-webinar-1',
          role: 'Speaker',
          name: 'Prof. Elena Dsouza',
          title: 'Editor, Journal of Digital Pedagogy',
          details: 'Research and Publications Office',
          img: null,
        },
      ],
    },
    design: {
      layout: 9,
      bgtype: 'gradient',
      gradient: 10,
      accent: '#90E0EF',
      primary: '#FFFFFF',
      font: 'Georgia,serif|Trebuchet MS,sans-serif',
      size: 'ledWall',
    },
  }),
];
