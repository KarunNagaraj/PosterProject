import { useEffect, useState, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import PosterCanvas from './poster/PosterCanvas';
import { Button } from './UI';
import { downloadPoster } from '../utils';
import { usePosterStore } from '../store/usePosterStore';
import styles from './RightPanel.module.css';
import LoadButton from './right-panel/LoadButton';
import SaveButton from './right-panel/SaveButton';
import ToolbarAuth from './right-panel/ToolbarAuth';

// ── Share Menu Component ─────────────────────────────────────
// Extensible dropdown menu for sharing options
function ShareMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrint = () => {
    setIsOpen(false);
    window.print();
  };

 const handleEmail = async () => {
  setIsOpen(false);

  // Step 1: generate the poster as a PNG blob
  const { domToBlob } = await import('modern-screenshot');
  const el = document.getElementById('poster-canvas');
  if (!el) return;

  const blob = await domToBlob(el, {
    scale: 3,
    type: 'image/png',
    style: { transform: 'none', overflow: 'visible' },
  });

  const file = new File([blob], 'poster.png', { type: 'image/png' });

  // Step 2: use Web Share API if available (mobile + modern desktop)
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title: 'Event Poster',
        text: 'Check out this event poster I made!',
        files: [file],
      });
      return;
    } catch (err) {
      // User cancelled — do nothing
      if (err.name === 'AbortError') return;
    }
  }

  // Step 3: fallback — just download the file if Web Share isn't available
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'poster.png';
  link.click();
  URL.revokeObjectURL(url);
};

  return (
    <div className={styles.shareMenu} ref={menuRef}>
      <Button variant="ghost" className={styles.actionButton} onClick={() => setIsOpen(!isOpen)}>
        Share
      </Button>

      {isOpen && (
        <div className={styles.shareDropdown}>
          <Button variant="ghost" className={styles.shareItem} onClick={handlePrint}>
            Print
          </Button>
         <Button variant="ghost" className={styles.shareItem} onClick={handleEmail}>
            Share File
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Main Right Panel ─────────────────────────────────────────
export default function RightPanel() {
  const [downloadFormat, setDownloadFormat] = useState('png');

  const {
    category,
    layout,
    gradient,
    accent,
    font,
    randomizeAll,
    randomizeLayout,
  } = usePosterStore(
    useShallow((state) => ({
      category: state.poster.category,
      layout: state.design.layout,
      gradient: state.design.gradient,
      accent: state.design.accent,
      font: state.design.font,
      randomizeAll: state.randomizeAll,
      randomizeLayout: state.randomizeLayout,
    }))
  );

  // Trigger flash animation on randomize
  useEffect(() => {
    const el = document.getElementById('poster-canvas');
    if (!el) return;
    el.classList.remove('poster-flash');
    void el.offsetWidth; // reflow
    el.classList.add('poster-flash');
  }, [layout, gradient, accent, font]);

  const handleDownload = () => {
    const safeCategory = category ? category.toLowerCase().replace(/\s+/g, '-') : 'event';
    const filename = `poster-${safeCategory}`;
    downloadPoster('poster-canvas', filename, downloadFormat);
  };

  return (
    <main className={styles.panel}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarTop}>
          <div className={styles.previewMeta}>
            <div className={styles.previewBadge}>Live Preview</div>
            <div>
              <div className={styles.previewTitle}>Poster workspace</div>
              <div className={styles.previewHint}>Shuffle layouts, export drafts, and save signed-in designs.</div>
            </div>
          </div>
          <ToolbarAuth />
        </div>

        <div className={styles.toolbarActions}>
          <div className={styles.actionGroup}>
            <span className={styles.groupLabel}>Remix</span>
            <div className={styles.actionRow}>
              <Button variant="ghost" className={styles.actionButton} onClick={randomizeAll}>Randomize All</Button>
              <Button variant="ghost" className={styles.actionButton} onClick={randomizeLayout}>Layout Only</Button>
            </div>
          </div>

          <div className={styles.actionGroup}>
            <span className={styles.groupLabel}>Export</span>
            <div className={styles.actionRow}>
              <div className={styles.exportCluster}>
                <label className={styles.formatLabel} htmlFor="download-format">Format</label>
                <select
                  id="download-format"
                  className={styles.formatSelect}
                  value={downloadFormat}
                  onChange={(e) => setDownloadFormat(e.target.value)}
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>
              <Button variant="primary" className={[styles.actionButton, styles.downloadButton].join(' ')} onClick={handleDownload}>
                Download
              </Button>
              <LoadButton />
              <SaveButton />
              <ShareMenu />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.previewArea}>
        <div className={styles.shadow}>
          <PosterCanvas />
        </div>
      </div>
    </main>
  );
}
