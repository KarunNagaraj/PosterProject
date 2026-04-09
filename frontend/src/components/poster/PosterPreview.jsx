import { getPosterMetrics } from '../../utils';
import {
  L0_Classic,
  L1_Editorial,
  L2_Split,
  L3_Band,
  L4_Overlay,
  L5_Minimal,
  L6_Diagonal,
  L7_Frame,
  L8_Timeline,
  L9_Typographic,
} from './layouts';

const LAYOUTS = [
  L0_Classic,
  L1_Editorial,
  L2_Split,
  L3_Band,
  L4_Overlay,
  L5_Minimal,
  L6_Diagonal,
  L7_Frame,
  L8_Timeline,
  L9_Typographic,
];

export function PosterPreview({
  poster,
  design,
  qrDataUrl = null,
  canvasId,
}) {
  const { w, h, contentScale, viewportWidth, viewportHeight } = getPosterMetrics(design.size);
  const Layout = LAYOUTS[design.layout] || LAYOUTS[0];

  return (
    <div
      id={canvasId}
      style={{
        width: w,
        height: h,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: viewportWidth,
          height: viewportHeight,
          position: 'relative',
          transform: `scale(${contentScale})`,
          transformOrigin: 'top left',
        }}
      >
        <Layout poster={poster} design={design} qrDataUrl={qrDataUrl} />
      </div>
    </div>
  );
}
