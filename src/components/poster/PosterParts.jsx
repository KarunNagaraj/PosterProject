import { SDG_OPTIONS } from '../../constants';
// ── SpeakerCard ───────────────────────────────
export function SpeakerCard({ img, name, title, alumni, accent, df, bf, size = 52 }) {
  if (!name && !img) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: 220 }}>
      {img ? (
        <img
          src={img}
          alt={name}
          style={{
            width: size, height: size, borderRadius: '50%',
            objectFit: 'cover', border: `2px solid ${accent}`, flexShrink: 0,
          }}
        />
      ) : (
        <div style={{
          width: size, height: size, borderRadius: '50%',
          background: `${accent}28`, border: `2px solid ${accent}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, fontSize: size > 44 ? 20 : 16,
        }}>👤</div>
      )}
      <div style={{flex : 1}}>
        {name && (
          <div style={{ fontFamily: df, fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
            {name}
          </div>
        )}
        {title && (
          <div style={{ fontFamily: bf, fontSize: 10, color: accent, marginTop: 1 }}>
            {title}
          </div>
        )}
        {alumni && (
          <div style={{ fontFamily: bf, fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 1, fontStyle: 'italic' }}>
            {alumni}
          </div>
        )}
      </div>
    </div>
  );
}

// ── InfoRow ───────────────────────────────────
export function InfoRow({ icon, text, accent, bf, align }) {
  if (!text) return null;
  const justifyMap = { center: 'center', right: 'flex-end', left: 'flex-start' };
  return (
    <div style={{
      fontFamily: bf, fontSize: 12, color: '#fff',
      display: 'flex', alignItems: 'center', gap: 7,
      justifyContent: justifyMap[align] || 'flex-start',
    }}>
      <span style={{ color: accent, fontSize: 14, flexShrink: 0 }}>{icon}</span>
      {text}
    </div>
  );
}

// ── QRBlock ───────────────────────────────────
export function QRBlock({ showQR, qrDataUrl, bf }) {
  if (!showQR || !qrDataUrl) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginTop: 8 }}>
      <img
        src={qrDataUrl}
        alt="QR Code"
        style={{ width: 64, height: 64, borderRadius: 6, background: '#fff', padding: 4 }}
      />
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontFamily: bf }}>
        Scan to Register
      </div>
    </div>
  );
}

// ── TaglineBar ────────────────────────────────
export function TaglineBar({ tagline, reglink, accent, bf }) {
  const text = tagline || reglink;
  if (!text) return null;
  return (
    <div style={{ background: accent, padding: '7px 24px', textAlign: 'center' }}>
      <span style={{ fontFamily: bf, fontSize: 11, fontWeight: 700, color: '#000' }}>
        {text}
      </span>
    </div>
  );
}

// ── SpeakerFooter ─────────────────────────────
export function SpeakerFooter({ poster, accent, bf, df, centered = true }) {
  const hasSpeaker = poster.sp1name || poster.sp1img || poster.sp2name || poster.sp2img;
  if (!hasSpeaker) return null;
  return (
    <div style={{ background: 'rgba(0,0,0,0.38)', padding: '16px 24px', borderTop: `2px solid ${accent}` }}>
      <div style={{
        fontFamily: bf, fontSize: 9, color: accent,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        textAlign: centered ? 'center' : 'left', marginBottom: 12,
      }}>
        Resource Person{poster.sp2name ? 's' : ''}
      </div>
      <div style={{
            display: 'flex',
            flexDirection: 'column',   // ← ADD
            gap: 14,                   // ← adjust spacing
            alignItems: centered ? 'center' : 'flex-start', // ← ADD
          }}>
        <SpeakerCard img={poster.sp1img} name={poster.sp1name} title={poster.sp1title} alumni={poster.sp1alumni} accent={accent} df={df} bf={bf} />
        {poster.sp2name && (
          <SpeakerCard img={poster.sp2img} name={poster.sp2name} title={poster.sp2title} alumni={poster.sp2alumni} accent={accent} df={df} bf={bf} />
        )}
      </div>
    </div>
  );
}


// ── SDG BLOCK ───────────────────────────────
export function SDGBlock({ sdgs = [], size = 32, gap = 6, align = 'flex-start' }) {
  const selected = sdgs
    .map(id => SDG_OPTIONS.find(s => s.value === id))
    .filter(Boolean);

  if (!selected.length) return null;

  return (
    <div style={{
      display: 'flex',
      gap,
      alignItems: 'center',
      justifyContent: align,
      flexWrap: 'wrap'
    }}>
      {selected.map((sdg) => (
        <img
          key={sdg.value}
          src={sdg.img}
          alt={sdg.label}
          title={sdg.label}
          style={{
            width: size,
            height: size,
            borderRadius: 4,
            objectFit: 'cover'
          }}
        />
      ))}
    </div>
  );
}