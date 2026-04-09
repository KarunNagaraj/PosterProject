import { jsPDF } from 'jspdf';
import { GRADIENTS, POSTER_SIZES } from '../constants';

const BASE_LAYOUT_HEIGHT = 594;

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

export function scaleFont(size, scale = 1) {
  return Math.round(size * scale);
}

export function getPosterMetrics(sizeKey) {
  const size = POSTER_SIZES[sizeKey] || POSTER_SIZES.signagePortrait;
  const contentScale = Math.max(size.h / BASE_LAYOUT_HEIGHT, 1);

  return {
    ...size,
    contentScale,
    viewportWidth: Math.round(size.w / contentScale),
    viewportHeight: Math.round(size.h / contentScale),
  };
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
export async function generateQRDataUrl(text, sizeKey = 'signagePortrait') {
  if (!text) return null;
  try {
    const QRCode = (await import('qrcode')).default;
    const { contentScale } = getPosterMetrics(sizeKey);

    return await QRCode.toDataURL(text, {
      width: Math.max(160, Math.round(80 * contentScale * 2)),
      margin: 1,
      color: { dark: '#000000', light: '#ffffff' },
    });
  } catch {
    return null;
  }
}

// ── Multi-Format Export via modern-screenshot ────────────────
export async function downloadPoster(elementId, baseFilename = 'poster', format = 'png') {
  const el = document.getElementById(elementId);
  if (!el) return;

  try {
    // Dynamically import modern-screenshot
    const { domToPng, domToJpeg } = await import('modern-screenshot');

    // Measure the natural size of the poster (ignoring RightPanel CSS scales)
    const naturalW = el.offsetWidth;
    const naturalH = el.offsetHeight;
    const renderScale = format === 'pdf' ? 3 : 1;

    // PNG/JPEG should respect the exact preset size; PDF can render at higher density.
    const options = {
      scale: renderScale,
      width: naturalW,
      height: naturalH,
      backgroundColor: null,
      filter: (node) => {
        if (node.nodeType !== 1) return true;
        const domEl = /** @type {HTMLElement} */ (node);
        if (domEl.dataset?.editorChrome === 'true') return false;
        return true;
      },
      style: {
        transform: 'none',
        overflow: 'visible', // Prevents edge clipping
      },
    };

    const filename = `${baseFilename}.${format}`;

    // ── PDF Generation ──
    if (format === 'pdf') {
      // Always use PNG inside the PDF to prevent lossy JPEG compression from destroying gradient quality
      const dataUrl = await domToPng(el, options);
      
      const pdf = new jsPDF({
        orientation: naturalW > naturalH ? 'landscape' : 'portrait',
        unit: 'px',
        format: [naturalW, naturalH]
      });
      
      // Inject the 3x resolution PNG into the 1x sized PDF container (creates a high-DPI PDF)
      pdf.addImage(dataUrl, 'PNG', 0, 0, naturalW, naturalH);
      pdf.save(filename);
    } 
    // ── JPEG Generation ──
    else if (format === 'jpeg') {
      // Force quality to 1.0 (100%) for JPEGs to minimize artifacts
      const dataUrl = await domToJpeg(el, { ...options, quality: 1.0 });
      triggerDownload(dataUrl, filename);
    } 
    // ── PNG Generation ──
    else {
      const dataUrl = await domToPng(el, options);
      triggerDownload(dataUrl, filename);
    }

  } catch (err) {
    console.error('Failed to generate poster download:', err);
    alert('There was an issue generating your poster. Please try again.');
  }
}

// Small helper to trigger the browser download behavior
function triggerDownload(dataUrl, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
