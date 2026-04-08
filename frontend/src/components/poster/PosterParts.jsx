import { useShallow } from 'zustand/react/shallow';
import { SDG_OPTIONS } from '../../constants';
import { usePosterStore } from '../../store/usePosterStore';
import MovableElement from './MovableElement';

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

export function SpeakerCard({ speaker, accent, df, bf, size = 52, primary = '#fff', centered = true }) {
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
          <div style={{ fontFamily: df, fontSize: 13, fontWeight: 700, color: primary, lineHeight: 1.2 }}>
            {speaker.name}
          </div>
        ) : null}

        {speaker.title ? (
          <div style={{ fontFamily: bf, fontSize: 10, color: accent, marginTop: 2, lineHeight: 1.25 }}>
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

function SpeakerPhoto({
  layoutId,
  speaker,
  accent,
  selected,
  onSelect,
  updateMovableElement,
  movableElementsByLayout,
  defaultSize,
}) {
  const position =
    movableElementsByLayout?.[layoutId]?.[`speaker-photo-${speaker.id}`] || {};

  return (
    <MovableElement
      elementId={`speaker-photo-${speaker.id}`}
      position={position}
      selected={selected}
      resizable
      defaultWidth={position.width || defaultSize}
      defaultHeight={position.height || defaultSize}
      minWidth={56}
      minHeight={56}
      onSelect={onSelect}
      onChange={(patch) =>
        updateMovableElement(layoutId, `speaker-photo-${speaker.id}`, patch)
      }
      wrapperStyle={{
        margin: '0 auto',
      }}
    >
      {speaker.img ? (
        <img
          src={speaker.img}
          alt={speaker.name}
          style={{
            width: position.width || defaultSize,
            height: position.height || defaultSize,
            borderRadius: '50%',
            objectFit: 'cover',
            border: `2px solid ${accent}`,
            background: '#fff',
            display: 'block',
          }}
        />
      ) : (
        <div
          style={{
            width: position.width || defaultSize,
            height: position.height || defaultSize,
            borderRadius: '50%',
            background: `${accent}22`,
            border: `2px solid ${accent}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: defaultSize > 80 ? 36 : 24,
          }}
        >
          👤
        </div>
      )}
    </MovableElement>
  );
}

function SpeakerDetails({
  layoutId,
  speaker,
  accent,
  primary,
  bf,
  df,
  selected,
  onSelect,
  updateMovableElement,
  movableElementsByLayout,
  centered,
}) {
  const position =
    movableElementsByLayout?.[layoutId]?.[`speaker-details-${speaker.id}`] || {};

  return (
    <MovableElement
      elementId={`speaker-details-${speaker.id}`}
      position={position}
      selected={selected}
      onSelect={onSelect}
      onChange={(patch) =>
        updateMovableElement(layoutId, `speaker-details-${speaker.id}`, patch)
      }
      wrapperStyle={{
        width: '100%',
      }}
    >
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
              textAlign: centered ? 'center' : 'left',
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
              textAlign: centered ? 'center' : 'left',
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
              textAlign: centered ? 'center' : 'left',
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
              color: 'rgba(255,255,255,0.6)',
              marginTop: 2,
              lineHeight: 1.25,
              textAlign: centered ? 'center' : 'left',
            }}
          >
            {speaker.details}
          </div>
        ) : null}
      </div>
    </MovableElement>
  );
}

function SpeakerItem({
  layoutId,
  speaker,
  accent,
  primary,
  bf,
  df,
  centered = true,
  imageSize = 64,
}) {
  const {
    selectedCanvasElement,
    selectCanvasElement,
    updateMovableElement,
    movableElementsByLayout,
  } = usePosterStore(
    useShallow((state) => ({
      selectedCanvasElement: state.selectedCanvasElement,
      selectCanvasElement: state.selectCanvasElement,
      updateMovableElement: state.updateMovableElement,
      movableElementsByLayout: state.design.movableElementsByLayout,
    }))
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: centered ? 'center' : 'flex-start',
        gap: 10,
        width: 220,
      }}
    >
      <SpeakerPhoto
        layoutId={layoutId}
        speaker={speaker}
        accent={accent}
        selected={
          selectedCanvasElement?.kind === 'speaker-photo' &&
          selectedCanvasElement?.id === speaker.id &&
          selectedCanvasElement?.layoutId === layoutId
        }
        onSelect={() =>
          selectCanvasElement({
            kind: 'speaker-photo',
            id: speaker.id,
            layoutId,
          })
        }
        updateMovableElement={updateMovableElement}
        movableElementsByLayout={movableElementsByLayout}
        defaultSize={imageSize}
      />

      <SpeakerDetails
        layoutId={layoutId}
        speaker={speaker}
        accent={accent}
        primary={primary}
        bf={bf}
        df={df}
        centered={centered}
        selected={
          selectedCanvasElement?.kind === 'speaker-details' &&
          selectedCanvasElement?.id === speaker.id &&
          selectedCanvasElement?.layoutId === layoutId
        }
        onSelect={() =>
          selectCanvasElement({
            kind: 'speaker-details',
            id: speaker.id,
            layoutId,
          })
        }
        updateMovableElement={updateMovableElement}
        movableElementsByLayout={movableElementsByLayout}
      />
    </div>
  );
}

export function SpeakerGallery({
  poster,
  layoutId,
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
        <SpeakerItem
          key={speaker.id}
          layoutId={layoutId}
          speaker={speaker}
          accent={accent}
          primary={primary}
          bf={bf}
          df={df}
          centered={centered}
          imageSize={imageSize}
        />
      ))}
    </div>
  );
}

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

export function TaglineBar({ tagline, reglink, accent, bf, primary }) {
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

export function SpeakerFooter({ poster, layoutId, accent, bf, df, centered = true, primary = '#fff' }) {
  const speakers = getSpeakers(poster);
  if (!speakers.length) return null;
  return (
    <div style={{ padding: '16px 24px' }}>
      <div style={{
        fontFamily: bf, fontSize: 9, color: accent,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        textAlign: centered ? 'center' : 'left', marginBottom: 12,
      }}>
        Resource Person{speakers.length > 1 ? 's' : ''}
      </div>
      <SpeakerGallery
        poster={poster}
        layoutId={layoutId}
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
