import { useShallow } from 'zustand/react/shallow';
import { POSTER_SIZES } from '../../constants';
import { usePosterStore } from '../../store/usePosterStore';
import {
  L0_Classic, L1_Editorial, L2_Split, L3_Band, L4_Overlay,
  L5_Minimal, L6_Diagonal, L7_Frame, L8_Timeline, L9_Typographic,
} from './layouts';

const LAYOUTS = [
  L0_Classic, L1_Editorial, L2_Split, L3_Band, L4_Overlay,
  L5_Minimal, L6_Diagonal, L7_Frame, L8_Timeline, L9_Typographic,
];

export default function PosterCanvas() {
  const { poster, design, qrDataUrl } = usePosterStore(
    useShallow((state) => ({
      poster: state.poster,
      design: state.design,
      qrDataUrl: state.qrDataUrl,
    }))
  );

  const { w, h } = POSTER_SIZES[design.size] || POSTER_SIZES.a4;
  const Layout   = LAYOUTS[design.layout] || LAYOUTS[0];

  return (
    <div
      id="poster-canvas"
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
