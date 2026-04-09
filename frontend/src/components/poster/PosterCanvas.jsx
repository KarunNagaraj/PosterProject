import { useShallow } from 'zustand/react/shallow';
import { usePosterStore } from '../../store/usePosterStore';
import { PosterPreview } from './PosterPreview';

export default function PosterCanvas() {
  const { poster, design, qrDataUrl } = usePosterStore(
    useShallow((state) => ({
      poster: state.poster,
      design: state.design,
      qrDataUrl: state.qrDataUrl,
    }))
  );

  return (
    <PosterPreview
      canvasId="poster-canvas"
      poster={poster}
      design={design}
      qrDataUrl={qrDataUrl}
    />
  );
}
