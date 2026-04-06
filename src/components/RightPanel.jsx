import { useEffect, useState, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import PosterCanvas from './poster/PosterCanvas';
import { Button } from './UI';
import { downloadPoster } from '../utils';
import { usePosterStore } from '../store/usePosterStore';
import styles from './RightPanel.module.css';

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
    <div style={{ position: 'relative' }} ref={menuRef}>
      <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
        🔗 Share ▾
      </Button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '6px',
          background: 'var(--bg-panel, rgba(30, 30, 30, 0.95))', // Adapts cleanly
          border: '1px solid rgba(120, 120, 120, 0.2)',
          borderRadius: '8px',
          padding: '6px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          minWidth: '140px',
          zIndex: 100,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Menu Items */}
          <Button variant="ghost" onClick={handlePrint} style={{ justifyContent: 'flex-start', width: '100%' }}>
            ⎙ Print
          </Button>
         <Button variant="ghost" onClick={handleEmail} style={{ justifyContent: 'flex-start', width: '100%' }}>
            ↑ Share
          </Button>
                    
          {/* You can easily add more options here in the future:
          <Button variant="ghost" onClick={handleTwitterShare} style={{ justifyContent: 'flex-start', width: '100%' }}>
            🐦 Twitter
          </Button>
          */}
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
      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        <span className={styles.toolbarLabel}>Live Preview</span>
        <div className={styles.toolbarRight}>
          <Button variant="ghost" onClick={randomizeAll}>🎲 Randomize All</Button>
          <Button variant="ghost" onClick={randomizeLayout}>⟳ Layout Only</Button>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'rgba(120, 120, 120, 0.1)', 
            padding: '2px', 
            borderRadius: '6px',
            border: '1px solid rgba(120, 120, 120, 0.2)'
          }}>
            <select 
              value={downloadFormat} 
              onChange={(e) => setDownloadFormat(e.target.value)}
              style={{ 
                background: 'transparent', 
                color: 'inherit', 
                border: 'none', 
                padding: '0 10px', 
                outline: 'none', 
                cursor: 'pointer', 
                fontFamily: 'inherit',
                fontSize: '13px'
              }}
            >
              <option value="png" style={{ color: '#000' }}>PNG</option>
              <option value="jpeg" style={{ color: '#000' }}>JPEG</option>
              <option value="pdf" style={{ color: '#000' }}>PDF</option>
            </select>
            <Button variant="primary" onClick={handleDownload}>↓ Download</Button>
          </div>

          {/* Integrated the new Share Menu here */}
          <ShareMenu />
        </div>
      </div>

      {/* ── Preview area ── */}
      <div className={styles.previewArea}>
        <div className={styles.shadow}>
          <PosterCanvas />
        </div>
      </div>
    </main>
  );
}