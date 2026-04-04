import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import PosterCanvas from './poster/PosterCanvas';
import { Button } from './UI';
import { downloadAsPNG } from '../utils';
import { usePosterStore } from '../store/usePosterStore';
import styles from './RightPanel.module.css';

export default function RightPanel() {
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
    const filename = `poster-${category.toLowerCase().replace(/\s+/g, '-')}.png`;
    downloadAsPNG('poster-canvas', filename);
  };

  return (
    <main className={styles.panel}>
      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        <span className={styles.toolbarLabel}>Live Preview</span>
        <div className={styles.toolbarRight}>
          <Button variant="ghost" onClick={randomizeAll}>🎲 Randomize All</Button>
          <Button variant="ghost" onClick={randomizeLayout}>⟳ Layout Only</Button>
          <Button variant="primary" onClick={handleDownload}>↓ Download PNG</Button>
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
