import { useShallow } from 'zustand/react/shallow';
import { POSTER_SIZES } from '../../constants';
import { getBodyFont, getDisplayFont } from '../../utils';
import { usePosterStore } from '../../store/usePosterStore';
import {
  L0_Classic, L1_Editorial, L2_Split, L3_Band, L4_Overlay,
  L5_Minimal, L6_Diagonal, L7_Frame, L8_Timeline, L9_Typographic,
} from './layouts';
import MovableElement from './MovableElement';

const LAYOUTS = [
  L0_Classic, L1_Editorial, L2_Split, L3_Band, L4_Overlay,
  L5_Minimal, L6_Diagonal, L7_Frame, L8_Timeline, L9_Typographic,
];

export default function PosterCanvas() {
  const {
    poster,
    design,
    qrDataUrl,
    selectedCanvasElement,
    updateCustomTextbox,
    selectCanvasElement,
    clearCanvasSelection,
  } = usePosterStore(
    useShallow((state) => ({
      poster: state.poster,
      design: state.design,
      qrDataUrl: state.qrDataUrl,
      selectedCanvasElement: state.selectedCanvasElement,
      updateCustomTextbox: state.updateCustomTextbox,
      selectCanvasElement: state.selectCanvasElement,
      clearCanvasSelection: state.clearCanvasSelection,
    }))
  );

  const { w, h } = POSTER_SIZES[design.size] || POSTER_SIZES.a4;
  const Layout = LAYOUTS[design.layout] || LAYOUTS[0];

  return (
    <div
      id="poster-canvas"
      onClick={() => clearCanvasSelection()}
      style={{
        width: w,
        minHeight: h,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      <Layout poster={poster} design={design} qrDataUrl={qrDataUrl} />

      {design.customTextboxes.map((textbox) => {
        const selected =
          selectedCanvasElement?.kind === 'textbox' &&
          selectedCanvasElement?.id === textbox.id;

        const fontFamily =
          textbox.fontFamily === 'display'
            ? getDisplayFont(design.font)
            : textbox.fontFamily === 'body'
            ? getBodyFont(design.font)
            : textbox.fontFamily;

        return (
          <MovableElement
            key={textbox.id}
            elementId={textbox.id}
            absolute
            resizable
            defaultWidth={textbox.width}
            defaultHeight={Math.max(textbox.fontSize + 24, 52)}
            position={textbox}
            selected={selected}
            onSelect={() =>
              selectCanvasElement({
                kind: 'textbox',
                id: textbox.id,
              })
            }
            onChange={(patch) => updateCustomTextbox(textbox.id, patch)}
            wrapperStyle={{
              maxWidth: w - 24,
            }}
          >
            <div
              style={{
                width: textbox.width,
                minHeight: Math.max(textbox.fontSize + 24, 52),
                color: textbox.color,
                fontFamily,
                fontSize: textbox.fontSize,
                lineHeight: 1.2,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                padding: '4px 6px',
                background: 'transparent',
              }}
            >
              {textbox.text}
            </div>
          </MovableElement>
        );
      })}
    </div>
  );
}
