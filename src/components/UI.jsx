import styles from './UI.module.css';

// ── SectionLabel ──────────────────────────────
export function SectionLabel({ children }) {
  return <div className={styles.sectionLabel}>{children}</div>;
}

// ── FieldGroup ────────────────────────────────
export function FieldGroup({ label, children }) {
  return (
    <div className={styles.fieldGroup}>
      {label && <div className={styles.fieldLabel}>{label}</div>}
      {children}
    </div>
  );
}

// ── TextInput ─────────────────────────────────
export function TextInput({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

// ── Select ────────────────────────────────────
export function Select({ value, onChange, options }) {
  return (
    <select
      className={styles.input}
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map(opt =>
        typeof opt === 'string'
          ? <option key={opt} value={opt}>{opt}</option>
          : <option key={opt.value} value={opt.value}>{opt.label}</option>
      )}
    </select>
  );
}

// ── Row2 ──────────────────────────────────────
export function Row2({ children }) {
  return <div className={styles.row2}>{children}</div>;
}

// ── Button ────────────────────────────────────
export function Button({ children, onClick, variant = 'default', style }) {
  const cls = [
    styles.btn,
    variant === 'primary' && styles.btnPrimary,
    variant === 'ghost'   && styles.btnGhost,
  ].filter(Boolean).join(' ');
  return <button className={cls} onClick={onClick} style={style}>{children}</button>;
}

// ── UploadBox ─────────────────────────────────
export function UploadBox({ icon, label, preview, onChange }) {
  return (
    <div className={styles.uploadBox}>
      <input
        type="file"
        accept="image/*"
        className={styles.uploadInput}
        onChange={e => e.target.files[0] && onChange(e.target.files[0])}
      />
      {preview
        ? <img src={preview} className={styles.uploadPreview} alt="preview" />
        : <><span className={styles.uploadIcon}>{icon}</span><span>{label}</span></>
      }
    </div>
  );
}
