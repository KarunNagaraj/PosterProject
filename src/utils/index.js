import { GRADIENTS } from '../constants';

// ── Date / Time Formatters ────────────────────
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${parseInt(d)} ${MONTHS[parseInt(m) - 1]} ${y}`;
}

export function formatTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':');
  const hr = parseInt(h);
  return `${hr > 12 ? hr - 12 : hr || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`;
}

// ── Font Helpers ──────────────────────────────
export function getDisplayFont(font) {
  return font.split('|')[0];
}

export function getBodyFont(font) {
  return font.split('|')[1];
}

// ── Background CSS String ─────────────────────
export function buildBackground(design) {
  const { bgtype, bgcolor, bgimg, gradient, accent } = design;

  if (bgtype === 'solid') return `background:${bgcolor};`;

  if (bgtype === 'image' && bgimg)
    return `background:url(${bgimg}) center/cover no-repeat;`;

  const g = GRADIENTS[gradient];

  if (bgtype === 'pattern')
    return `background:${g[0]};background-image:radial-gradient(${accent}22 1.5px,transparent 1.5px);background-size:22px 22px;`;

  if (bgtype === 'mesh')
    return [
      `background:${g[0]};`,
      `background-image:`,
      `radial-gradient(at 30% 20%,${accent}30 0px,transparent 50%),`,
      `radial-gradient(at 80% 80%,${g[2]}60 0px,transparent 50%),`,
      `radial-gradient(at 60% 50%,${g[1]}40 0px,transparent 50%);`,
    ].join('');

  // default: gradient
  return `background:linear-gradient(145deg,${g[0]},${g[1]} 50%,${g[2]});`;
}

// ── File → Base64 ────────────────────────────
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsDataURL(file);
  });
}

// ── Random pick helpers ───────────────────────
export function randomInt(max) {
  return Math.floor(Math.random() * max);
}

export function randomItem(arr) {
  return arr[randomInt(arr.length)];
}

// ── QR code generation ────────────────────────
export async function generateQRDataUrl(text) {
  if (!text) return null;
  try {
    const QRCode = (await import('qrcode')).default;
    return await QRCode.toDataURL(text, {
      width: 80,
      margin: 1,
      color: { dark: '#000000', light: '#ffffff' },
    });
  } catch {
    return null;
  }
}

// ── html2canvas PNG download ──────────────────
export async function downloadAsPNG(elementId, filename = 'poster.png') {
  const el = document.getElementById(elementId);
  if (!el) return;
  const html2canvas = (await import('html2canvas')).default;
  const canvas = await html2canvas(el, {
    scale: 2.5,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  });
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
// for text sizing feature by user, to maintain consistency across layouts since one variable will be replacing all the different font sizes intitally
export function scaleFont(size, scale = 1) {
  return Math.round(size * scale);
}