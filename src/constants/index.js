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
  a4:    { label: 'A4 Portrait (420×594)',  w: 420, h: 594 },
  a4l:   { label: 'A4 Landscape (594×420)', w: 594, h: 420 },
  sq:    { label: 'Square (480×480)',        w: 480, h: 480 },
  story: { label: 'Story / Reel (360×640)', w: 360, h: 640 },
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

// ── Default poster state ──────────────────────
export const DEFAULT_STATE = {
  // Header
  university: 'Anna University',
  dept: 'Department of Computer Science & Engineering',
  campus: 'CEG Campus, Chennai — 600 025',
  tagline: '',
  logoImg: null,
  // Event
  category: 'Workshop',
  title: 'Introduction to Machine Learning',
  subtitle: 'Bridging Theory and Practice',
  date: '2025-04-15',
  time: '10:00',
  venue: 'Seminar Hall A, Block IV',
  audience: 'II & III Year B.E. / B.Tech Students',
  reglink: '',
  showQR: false,
  // Speakers
  sp1name: 'Dr. Rajesh Kumar',
  sp1title: "Associate Professor, IIT Madras",
  sp1alumni: "B.E. CSE '08",
  sp1img: null,
  sp2name: '',
  sp2title: '',
  sp2alumni: '',
  sp2img: null,
};

// ── Default design state ──────────────────────
export const DEFAULT_DESIGN = {
  layout: 0,
  bgtype: 'gradient',
  gradient: 2,
  bgcolor: '#1e3a5f',
  bgimg: null,
  accent: '#38ef7d',
  font: 'Georgia,serif|Trebuchet MS,sans-serif',
  align: 'center',
  size: 'a4',
  logoMode: 'auto',
  logoX: 0,
};
