import { SDG_OPTIONS } from '../../constants';
import { DraggableItem } from './DraggableItem';

// ── New Sub-components for independent dragging ──
export function SpeakerPhoto({ img, name, accent, size = 52 }) {
  return img ? (
    <img
      src={img}
      alt={name}
      draggable={false} // Prevents native browser image dragging crashes
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accent}`, flexShrink: 0 }}
    />
  ) : (
    <div style={{ width: size, height: size, borderRadius: '50%', background: `${accent}28`, border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: size > 44 ? 20 : 16 }}>
      👤
    </div>
  );
}

export function SpeakerText({ name, title, alumni, accent, df, bf }) {
  return (
    <div style={{ textAlign: 'center' }}>
      {name && <div style={{ fontFamily: df, fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{name}</div>}
      {title && <div style={{ fontFamily: bf, fontSize: 10, color: accent, marginTop: 1 }}>{title}</div>}
      {alumni && <div style={{ fontFamily: bf, fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 1, fontStyle: 'italic' }}>{alumni}</div>}
    </div>
  );
}

// ── Reconstructed SpeakerCard (Used by SpeakerFooter) ──
export function SpeakerCard({ img, name, title, alumni, accent, df, bf, size = 52 }) {
  if (!name && !img) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: 220 }}>
      {/* We do NOT wrap these in DraggableItems here so SpeakerFooter stays static/safe */}
      <SpeakerPhoto img={img} name={name} accent={accent} size={size} />
      <SpeakerText name={name} title={title} alumni={alumni} accent={accent} df={df} bf={bf} />
    </div>
  );
}


export function InfoRow({ icon, text, accent, bf, align }) {
  if (!text) return null;

  const justifyMap = { center: 'center', right: 'flex-end', left: 'flex-start' };

  return (
    <div
      style={{
        fontFamily: bf,
        fontSize: 12,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        justifyContent: justifyMap[align] || 'flex-start',
      }}
    >
      <span style={{ color: accent, fontSize: 14, flexShrink: 0 }}>{icon}</span>
      {text}
    </div>
  );
}

export function QRBlock({ showQR, qrDataUrl, bf }) {
  if (!showQR || !qrDataUrl) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        marginTop: 8,
      }}
    >
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

export function TaglineBar({ tagline, reglink, bf, primary }) {
  const text = tagline || reglink;
  if (!text) return null;

  return (
    <div style={{ padding: '7px 24px', textAlign: 'center' }}>
      <span style={{ fontFamily: bf, fontSize: 11, fontWeight: 700, color: primary }}>
        {text}
      </span>
    </div>
  );
}

export function SpeakerFooter({ poster, accent, bf, df, centered = true }) {
  const normalizedSpeakers = Array.isArray(poster.speakers)
    ? poster.speakers.filter((speaker) => speaker.name || speaker.img)
    : [];
  const speaker1 = normalizedSpeakers[0] || {
    img: poster.sp1img,
    name: poster.sp1name,
    title: poster.sp1title,
    details: poster.sp1details ?? poster.sp1alumni,
  };
  const speaker2 = normalizedSpeakers[1] || {
    img: poster.sp2img,
    name: poster.sp2name,
    title: poster.sp2title,
    details: poster.sp2details ?? poster.sp2alumni,
  };
  const hasSpeaker = speaker1.name || speaker1.img || speaker2.name || speaker2.img;
  if (!hasSpeaker) return null;

  return (
    <div
      style={{
        
        padding: '16px 24px',
        
      }}
    >

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 14,
          alignItems: centered ? 'center' : 'flex-start',
        }}
      >
        <SpeakerCard
          img={speaker1.img}
          name={speaker1.name}
          title={speaker1.title}
          alumni={speaker1.details}
          accent={accent}
          df={df}
          bf={bf}
        />
        
          <SpeakerCard
            img={speaker2.img}
            name={speaker2.name}
            title={speaker2.title}
            alumni={speaker2.details}
            accent={accent}
            df={df}
            bf={bf}
          />
        
      </div>
    </div>
  );
}


export function SDGBlock({ sdgs = [], size = 32, gap = 6, align = 'flex-start' }) {
  const selected = sdgs
    .map((id) => SDG_OPTIONS.find((sdg) => sdg.value === id))
    .filter(Boolean);

  if (!selected.length) return null;

  return (
    <div
      style={{
        display: 'flex',
        gap,
        alignItems: 'center',
        justifyContent: align,
        flexWrap: 'wrap',
      }}
    >
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
            objectFit: 'cover',
          }}
        />
      ))}
    </div>
  );
}
