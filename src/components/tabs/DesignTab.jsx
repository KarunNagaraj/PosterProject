import { useShallow } from 'zustand/react/shallow';
import { FieldGroup, Select, SectionLabel, Button, UploadBox } from '../UI';
import {
  GRADIENTS, ACCENTS, FONT_PAIRS, LAYOUT_NAMES,
  BG_TYPES, POSTER_SIZES,
} from '../../constants';
import { fileToBase64 } from '../../utils';
import { usePosterStore } from '../../store/usePosterStore';
import styles from './DesignTab.module.css';

// ── Layout thumbnail grid ─────────────────────
function LayoutGrid({ selected, onChange }) {
  return (
    <div className={styles.layoutGrid}>
      {LAYOUT_NAMES.map((name, i) => (
        <button
          key={name}
          className={[styles.layoutThumb, selected === i && styles.layoutSelected].filter(Boolean).join(' ')}// first assigning a standard style then assigning a style if that box is selected
          onClick={() => onChange(i)}
          title={name}
        >
          <div className={styles.thumbBars}>
            <div className={styles.ltBar} style={{ width: '100%', height: 7 }} /> 
            <div className={styles.ltBar} style={{ width: '70%', height: 4 }} />
            <div className={styles.ltBar} style={{ width: '50%', height: 4 }} />
          </div>
          <span className={styles.ltLabel}>{name}</span>
        </button>
      ))}
    </div>
  );
}

// ── Gradient swatch grid ──────────────────────
function GradientGrid({ selected, onChange }) {
  return (
    <div className={styles.gradientGrid}>
      {GRADIENTS.map((g, i) => (
        <button
          key={i}
          className={[styles.gradientSwatch, selected === i && styles.swatchSelected].filter(Boolean).join(' ')}
          style={{ background: `linear-gradient(135deg,${g[0]},${g[1]},${g[2]})` }}
          onClick={() => onChange(i)}
          title={`Gradient ${i + 1}`}
        />
      ))}
    </div>
  );
}

// ── Accent colour row ─────────────────────────
function AccentRow({ selected, onChange }) {
  return (
    <div className={styles.accentRow}>
      {ACCENTS.map(c => (
        <button
          key={c}
          className={[styles.accentSwatch, selected === c && styles.accentSelected].filter(Boolean).join(' ')}
          style={{ background: c }}
          onClick={() => onChange(c)}
          title={c}
        />
      ))}
      {/* Custom colour picker */}
      <input
        type="color"
        className={styles.colorPicker}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        title="Custom colour"
      />
    </div>
  );
}

// ── Alignment buttons ─────────────────────────
function AlignRow({ selected, onChange }) {
  return (
    <div className={styles.alignRow}>
      {['left', 'center', 'right'].map(a => (
        <Button
          key={a}
          variant={selected === a ? 'primary' : 'ghost'}
          onClick={() => onChange(a)}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          {a === 'left' ? '⬅ Left' : a === 'center' ? 'Center' : 'Right ➡'}
        </Button>
      ))}
    </div>
  );
}

// ── DesignTab ─────────────────────────────────
export default function DesignTab() {
  const {
    layout,
    bgtype,
    gradient,
    bgcolor,
    bgimg,
    accent,
    font,
    align,
    size,
    setDesignField,
  } = usePosterStore(
    useShallow((state) => ({
      layout: state.design.layout,
      bgtype: state.design.bgtype,
      gradient: state.design.gradient,
      bgcolor: state.design.bgcolor,
      bgimg: state.design.bgimg,
      accent: state.design.accent,
      font: state.design.font,
      align: state.design.align,
      size: state.design.size,
      setDesignField: state.setDesignField,
    }))
  );

  const showGradientPanel = ['gradient', 'pattern', 'mesh'].includes(bgtype);

  const handleBgImage = async (file) => {
    const b64 = await fileToBase64(file);
    setDesignField('bgimg', b64);
  };

  return (
    <>
      <SectionLabel>Layout Template</SectionLabel>
      <LayoutGrid
        selected={layout}
        onChange={(value) => setDesignField('layout', value)}
      />

      <SectionLabel>Background</SectionLabel>
      <FieldGroup label="Style">
        <Select
          value={bgtype}
          onChange={(value) => setDesignField('bgtype', value)}
          options={BG_TYPES}
        />
      </FieldGroup>

      {showGradientPanel && (
        <GradientGrid
          selected={gradient}
          onChange={(value) => setDesignField('gradient', value)}
        />
      )}

      {bgtype === 'solid' && (
        <input
          type="color"
          value={bgcolor}
          onChange={(e) => setDesignField('bgcolor', e.target.value)}
          className={styles.solidColorPicker}
        />
      )}

      {bgtype === 'image' && (
        <UploadBox
          icon="🖼"
          label="Upload Background Image"
          preview={bgimg}
          onChange={handleBgImage}
        />
      )}

      <SectionLabel>Accent Colour</SectionLabel>
      <AccentRow
        selected={accent}
        onChange={(value) => setDesignField('accent', value)}
      />

      <SectionLabel>Typography</SectionLabel>
      <FieldGroup label="Font Pairing">
        <Select
          value={font}
          onChange={(value) => setDesignField('font', value)}
          options={FONT_PAIRS}
        />
      </FieldGroup>

      <SectionLabel>Text Alignment</SectionLabel>
      <AlignRow
        selected={align}
        onChange={(value) => {
          setDesignField('align', value);
          setDesignField('logoMode', 'auto');
        }}
      />

      <SectionLabel>Poster Size</SectionLabel>
      <Select
        value={size}
        onChange={(value) => setDesignField('size', value)}
        options={Object.entries(POSTER_SIZES).map(([k, v]) => ({ value: k, label: v.label }))}
      />
    </>
  );
}
