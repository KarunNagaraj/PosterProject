import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import PosterCanvas from './poster/PosterCanvas';
import { Button } from './UI';
import { downloadPoster } from '../utils'; // Changed import
import { usePosterStore } from '../store/usePosterStore';
import styles from './RightPanel.module.css';

export default function RightPanel() {
  // NEW: State to track selected download format
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
    // Use category for dynamic filename, default to 'event' if empty
    const safeCategory = category ? category.toLowerCase().replace(/\s+/g, '-') : 'event';
    const baseFilename = `poster-${safeCategory}`;
    
    // Assuming you have a 'downloadFormat' state from the dropdown ('png', 'jpeg', or 'pdf')
    downloadPoster('poster-canvas', baseFilename, downloadFormat);
  };

  return (
    <main className={styles.panel}>
      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        <span className={styles.toolbarLabel}>Live Preview</span>
        <div className={styles.toolbarRight}>
          <Button variant="ghost" onClick={randomizeAll}>🎲 Randomize All</Button>
          <Button variant="ghost" onClick={randomizeLayout}>⟳ Layout Only</Button>
          
          {/* NEW: Format selector and Download Button */}
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

          <Button variant="ghost" onClick={() => window.print()}>⎙ Print</Button>
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