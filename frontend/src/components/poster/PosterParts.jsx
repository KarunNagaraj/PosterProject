import { SDG_OPTIONS } from '../../constants';

export function getSpeakers(poster) {
  if (Array.isArray(poster.speakers)) {
    return poster.speakers.filter(
      (speaker) => speaker.name || speaker.title || speaker.details || speaker.img || speaker.role
    );
  }

  return [1, 2]
    .map((index) => ({
      id: `speaker-${index}`,
      role: '',
      name: poster[`sp${index}name`] || '',
      title: poster[`sp${index}title`] || '',
      details: poster[`sp${index}details`] ?? poster[`sp${index}alumni`] ?? '',
      img: poster[`sp${index}img`] || null,
    }))
    .filter((speaker) => speaker.name || speaker.title || speaker.details || speaker.img);
}

export function SpeakerCard({
  speaker,
  accent,
  df,
  bf,
  size = 52,
  primary = '#fff',
  centered = true,
}) {
  if (!speaker) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: centered ? 'center' : 'flex-start',
        textAlign: centered ? 'center' : 'left',
        gap: 8,
        width: 220,
      }}
    >
      {speaker.img ? (
        <img
          src={speaker.img}
          alt={speaker.name}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            objectFit: 'cover',
            border: `2px solid ${accent}`,
            flexShrink: 0,
            background: '#fff',
          }}
        />
      ) : (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: `${accent}28`,
            border: `2px solid ${accent}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: size > 44 ? 20 : 16,
          }}
        >
          👤
        </div>
      )}

      <div style={{ width: '100%' }}>
        {speaker.role ? (
          <div
            style={{
              fontFamily: bf,
              fontSize: 9,
              color: accent,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            {speaker.role}
          </div>
        ) : null}

        {speaker.name ? (
          <div
            style={{
              fontFamily: df,
              fontSize: 13,
              fontWeight: 700,
              color: primary,
              lineHeight: 1.2,
            }}
          >
            {speaker.name}
          </div>
        ) : null}

        {speaker.title ? (
          <div
            style={{
              fontFamily: bf,
              fontSize: 10,
              color: accent,
              marginTop: 2,
              lineHeight: 1.25,
            }}
          >
            {speaker.title}
          </div>
        ) : null}

        {speaker.details ? (
          <div
            style={{
              fontFamily: bf,
              fontSize: 9,
              color: 'rgba(255,255,255,0.65)',
              marginTop: 2,
              fontStyle: 'italic',
              lineHeight: 1.25,
            }}
          >
            {speaker.details}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function SpeakerGallery({
  poster,
  accent,
  primary = '#fff',
  bf,
  df,
  centered = true,
  imageSize = 64,
  gap = 16,
}) {
  const speakers = getSpeakers(poster);
  if (!speakers.length) return null;

  return (
    <div
      style={{
        display: 'flex',
        gap,
        flexWrap: 'wrap',
        justifyContent: centered ? 'center' : 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      {speakers.map((speaker) => (
        <SpeakerCard
          key={speaker.id}
          speaker={speaker}
          accent={accent}
          primary={primary}
          bf={bf}
          df={df}
          centered={centered}
          size={imageSize}
        />
      ))}
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

export function SpeakerFooter({ poster, accent, bf, df, centered = true, primary = '#fff' }) {
  const speakers = getSpeakers(poster);
  if (!speakers.length) return null;

  return (
    <div style={{ padding: '16px 24px' }}>
      <div
        style={{
          fontFamily: bf,
          fontSize: 9,
          color: accent,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          textAlign: centered ? 'center' : 'left',
          marginBottom: 12,
        }}
      >
        Resource Person{speakers.length > 1 ? 's' : ''}
      </div>
      <SpeakerGallery
        poster={poster}
        accent={accent}
        primary={primary}
        bf={bf}
        df={df}
        centered={centered}
      />
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
