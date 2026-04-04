import { useShallow } from 'zustand/react/shallow';
import { POSTER_SIZES } from '../../constants';
import { usePosterStore } from '../../store/usePosterStore';
import {
  L0_Classic, L1_Editorial, L2_Split, L3_Band, L4_Overlay,
  L5_Minimal, L6_Diagonal, L7_Frame, L8_Timeline, L9_Typographic,
} from './layouts';
import { useState } from 'react';

const LAYOUTS = [
  L0_Classic, L1_Editorial, L2_Split, L3_Band, L4_Overlay,
  L5_Minimal, L6_Diagonal, L7_Frame, L8_Timeline, L9_Typographic,
];

export default function PosterCanvas() {
  const { poster, design, qrDataUrl, setDesignField } = usePosterStore(
    useShallow((state) => ({
      poster: state.poster,
      design: state.design,
      qrDataUrl: state.qrDataUrl,
      setDesignField: state.setDesignField
    }))
  );
  

  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const handleMouseDown = (e) => {
  // Only start drag if user clicked logo
  if (e.target.dataset.type === 'logo') {
    setIsDraggingLogo(true);
    setDesignField('logoMode', 'manual');
    }
  };

  const handleMouseMove = (e) => {
    if (!isDraggingLogo) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const logoWidth = 56;
    const padding = 24;

    let newX = e.clientX - rect.left - (logoWidth / 2);

    const minX = 0;
    const maxX = rect.width - logoWidth - padding;

    newX = Math.max(minX, Math.min(newX, maxX));

    setDesignField('logoX', newX);
  };

  const handleMouseUp = () => {
    setIsDraggingLogo(false);
  };

  const { w, h } = POSTER_SIZES[design.size] || POSTER_SIZES.a4;
  const Layout   = LAYOUTS[design.layout] || LAYOUTS[0];

  return (
    <div
      id="poster-canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        width:     w,
        minHeight: h,
        position:  'relative',
        overflow:  'hidden',
        display:   'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      <Layout poster={poster} design={design} qrDataUrl={qrDataUrl} />
    </div>
  );
}
