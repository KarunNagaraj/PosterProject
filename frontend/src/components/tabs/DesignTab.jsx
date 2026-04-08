import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { FieldGroup, Select, SectionLabel, Button, UploadBox, TextInput } from '../UI';
import {
  GRADIENTS, ACCENTS, PRIMARY_COLORS, FONT_PAIRS, LAYOUT_NAMES,
  BG_TYPES, POSTER_SIZES,
} from '../../constants';
import { fileToBase64 } from '../../utils';
import { usePosterStore } from '../../store/usePosterStore';
import styles from './DesignTab.module.css';

function LayoutGrid({ selected, onChange }) {
  return (
    <div className={styles.layoutGrid}>
      {LAYOUT_NAMES.map((name, i) => (
        <button
          key={name}
          className={[styles.layoutThumb, selected === i && styles.layoutSelected].filter(Boolean).join(' ')}
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

function AccentRow({ selected, onChange }) {
  return (
    <div className={styles.accentRow}>
      {ACCENTS.map((color) => (
        <button
          key={color}
          className={[styles.accentSwatch, selected === color && styles.accentSelected].filter(Boolean).join(' ')}
          style={{ background: color }}
          onClick={() => onChange(color)}
          title={color}
        />
      ))}
      <input
        type="color"
        className={styles.colorPicker}
        value={selected}
        onChange={(event) => onChange(event.target.value)}
        title="Custom colour"
      />
    </div>
  );
}

function PrimaryRow({ selected, onChange }) {
  return (
    <div className={styles.accentRow}>
      {PRIMARY_COLORS.map((color) => (
        <button
          key={color}
          className={[styles.accentSwatch, selected === color && styles.accentSelected].filter(Boolean).join(' ')}
          style={{ background: color, border: '1px solid rgba(0,0,0,0.2)' }}
          onClick={() => onChange(color)}
          title={color}
        />
      ))}
      <input
        type="color"
        className={styles.colorPicker}
        value={selected}
        onChange={(event) => onChange(event.target.value)}
        title="Custom colour"
      />
    </div>
  );
}

function AlignRow({ selected, onChange }) {
  return (
    <div className={styles.alignRow}>
      {['left', 'center', 'right'].map((align) => (
        <Button
          key={align}
          variant={selected === align ? 'primary' : 'ghost'}
          onClick={() => onChange(align)}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          {align === 'left' ? '⬅ Left' : align === 'center' ? 'Center' : 'Right ➡'}
        </Button>
      ))}
    </div>
  );
}

export default function DesignTab() {
  const {
    layout,
    bgtype,
    gradient,
    bgcolor,
    bgimg,
    accent,
    primary,
    font,
    align,
    size,
    textScale,
    customTextboxes,
    selectedCanvasElement,
    setDesignField,
    addCustomTextbox,
    updateCustomTextbox,
    removeCustomTextbox,
    selectCanvasElement,
  } = usePosterStore(
    useShallow((state) => ({
      layout: state.design.layout,
      bgtype: state.design.bgtype,
      gradient: state.design.gradient,
      bgcolor: state.design.bgcolor,
      bgimg: state.design.bgimg,
      accent: state.design.accent,
      primary: state.design.primary,
      font: state.design.font,
      align: state.design.align,
      size: state.design.size,
      textScale: state.design.textScale,
      customTextboxes: state.design.customTextboxes,
      selectedCanvasElement: state.selectedCanvasElement,
      setDesignField: state.setDesignField,
      addCustomTextbox: state.addCustomTextbox,
      updateCustomTextbox: state.updateCustomTextbox,
      removeCustomTextbox: state.removeCustomTextbox,
      selectCanvasElement: state.selectCanvasElement,
    }))
  );

  const showGradientPanel = ['gradient', 'pattern', 'mesh'].includes(bgtype);
  const selectedTextbox = useMemo(
    () =>
      selectedCanvasElement?.kind === 'textbox'
        ? customTextboxes.find((textbox) => textbox.id === selectedCanvasElement.id) || null
        : null,
    [customTextboxes, selectedCanvasElement]
  );

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

      <SectionLabel>Text Boxes</SectionLabel>
      <Button
        variant="primary"
        onClick={() =>
          addCustomTextbox({
            x: 48,
            y: 48,
            fontSize: 20,
            color: primary,
            fontFamily: 'body',
            width: 180,
          })
        }
      >
        Add Text Box
      </Button>

      <div className={styles.textboxList}>
        {customTextboxes.length === 0 ? (
          <div className={styles.textboxEmpty}>No custom text boxes yet.</div>
        ) : (
          customTextboxes.map((textbox, index) => (
            <button
              key={textbox.id}
              className={[
                styles.textboxItem,
                selectedTextbox?.id === textbox.id && styles.textboxItemSelected,
              ].filter(Boolean).join(' ')}
              onClick={() =>
                selectCanvasElement({
                  kind: 'textbox',
                  id: textbox.id,
                })
              }
            >
              <span>{textbox.text || `Textbox ${index + 1}`}</span>
            </button>
          ))
        )}
      </div>

      {selectedTextbox ? (
        <>
          <SectionLabel>Selected Text Box</SectionLabel>
          <FieldGroup label="Text">
            <textarea
              className={styles.textboxEditor}
              value={selectedTextbox.text}
              onChange={(event) =>
                updateCustomTextbox(selectedTextbox.id, { text: event.target.value })
              }
            />
          </FieldGroup>

          <FieldGroup label="Font">
            <Select
              value={selectedTextbox.fontFamily}
              onChange={(value) =>
                updateCustomTextbox(selectedTextbox.id, { fontFamily: value })
              }
              options={[
                { value: 'body', label: 'Current Body Font' },
                { value: 'display', label: 'Current Heading Font' },
                { value: 'Georgia,serif', label: 'Georgia' },
                { value: 'Trebuchet MS,sans-serif', label: 'Trebuchet MS' },
                { value: 'Verdana,sans-serif', label: 'Verdana' },
                { value: 'Arial,sans-serif', label: 'Arial' },
              ]}
            />
          </FieldGroup>

          <FieldGroup label="Font Size">
            <input
              className={styles.textboxControl}
              type="number"
              min="10"
              max="120"
              value={selectedTextbox.fontSize}
              onChange={(event) =>
                updateCustomTextbox(selectedTextbox.id, {
                  fontSize: parseInt(event.target.value, 10) || selectedTextbox.fontSize,
                })
              }
            />
          </FieldGroup>

          <FieldGroup label="Box Width">
            <input
              className={styles.textboxControl}
              type="number"
              min="80"
              max="600"
              value={selectedTextbox.width}
              onChange={(event) =>
                updateCustomTextbox(selectedTextbox.id, {
                  width: parseInt(event.target.value, 10) || selectedTextbox.width,
                })
              }
            />
          </FieldGroup>

          <FieldGroup label="Colour">
            <input
              type="color"
              value={selectedTextbox.color}
              onChange={(event) =>
                updateCustomTextbox(selectedTextbox.id, { color: event.target.value })
              }
              className={styles.solidColorPicker}
            />
          </FieldGroup>

          <Button variant="ghost" onClick={() => removeCustomTextbox(selectedTextbox.id)}>
            Delete Text Box
          </Button>
        </>
      ) : null}

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

      <SectionLabel>Primary Text Colour</SectionLabel>
      <PrimaryRow
        selected={primary}
        onChange={(value) => setDesignField('primary', value)}
      />

      <SectionLabel>Typography</SectionLabel>
      <FieldGroup label="Font Pairing">
        <Select
          value={font}
          onChange={(value) => setDesignField('font', value)}
          options={FONT_PAIRS}
        />
      </FieldGroup>

      <SectionLabel>Text Size</SectionLabel>
      <FieldGroup label="Primary (Headings)">
        <input
          type="range"
          min="0.7"
          max="1.5"
          step="0.05"
          value={textScale?.primary || 1}
          onChange={(e) =>
            setDesignField('textScale', {
              ...(textScale || {}),
              primary: parseFloat(e.target.value)
            })
          }
        />
      </FieldGroup>

      <FieldGroup label="Secondary (Details)">
        <input
          type="range"
          min="0.7"
          max="1.5"
          step="0.05"
          value={textScale?.secondary || 1}
          onChange={(e) =>
            setDesignField('textScale', {
              ...(textScale || {}),
              secondary: parseFloat(e.target.value)
            })
          }
        />
      </FieldGroup>

      <SectionLabel>Text Alignment</SectionLabel>
      <AlignRow
        selected={align}
        onChange={(value) => {
          setDesignField('align', value);
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
