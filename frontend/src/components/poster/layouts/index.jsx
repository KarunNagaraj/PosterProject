import { GRADIENTS } from '../../../constants';
import { buildBackground, formatDate, formatTime, getDisplayFont, getBodyFont, scaleFont } from '../../../utils';
import { SpeakerCard, SpeakerFooter, InfoRow, QRBlock, TaglineBar, SDGBlock, SpeakerPhoto, SpeakerText} from '../PosterParts';
import { DraggableItem } from '../DraggableItem';
import { usePosterStore } from '../../../store/usePosterStore';
import { useState } from 'react';
import { ResizableSpeakerImage } from '../ResizableSpeakerImage';

// ── Shared props shape ────────────────────────
function useLayoutProps({ poster, design, qrDataUrl }) {
  const acc = design.accent;
  const pri = design.primary;
  const al  = design.align;
  const df  = getDisplayFont(design.font);
  const bf  = getBodyFont(design.font);
  const bg  = buildBackground(design);
  const g   = GRADIENTS[design.gradient];
  const dateTimeStr = [formatDate(poster.date), formatTime(poster.time)].filter(Boolean).join(' · ');
  const showQR = poster.showQR && !!qrDataUrl;
  const textScale = design.textScale || { primary: 1, secondary: 1 };
  
  const normalizedSpeakers = Array.isArray(poster.speakers)
    ? poster.speakers.filter((speaker) => speaker.name || speaker.img)
    : [];
    
  const speaker1 = normalizedSpeakers[0] || {
    img: poster.sp1img,
    name: poster.sp1name,
    title: poster.sp1title,
    alumni: poster.sp1details ?? poster.sp1alumni,
  };
  
  const speaker2 = normalizedSpeakers[1] || {
    img: poster.sp2img,
    name: poster.sp2name,
    title: poster.sp2title,
    alumni: poster.sp2details ?? poster.sp2alumni,
  };
  
  const hasSpeaker = speaker1.name || speaker1.img || speaker2.name || speaker2.img;
  
  // ── NEW: Generic Position Handlers ──
  // Grab the centralized positions object (fallback to empty if undefined)
  const positions = poster.positions || {};
  
  // Pull a generic updatePosition method from your store
  const updatePosition = usePosterStore((state) => state.updatePosition);

  return { acc, pri, al, df, bf, bg, g, dateTimeStr, showQR, textScale, speaker1, speaker2, hasSpeaker, updatePosition, positions };
}

// ─────────────────────────────────────────────
// L0 — Classic
// ─────────────────────────────────────────────
export function L0_Classic({ poster, design, qrDataUrl }) {
  const { acc, pri, al, df, bf, bg, textScale, hasSpeaker, dateTimeStr, updatePosition, positions, speaker1, speaker2} = useLayoutProps({ poster, design, qrDataUrl });
  const alignStyle = { textAlign: al };

  return (
    <div style={{ ...parse(bg), width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit' }}>
      
      {/* Header */}
      <div style={{ position: 'relative', background: 'rgba(0,0,0,0.38)', padding: '22px 24px', ...alignStyle, borderBottom: `3px solid ${acc}` }}>
        {poster.logoImg && (
          <div style={{ height: 64, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: al === 'left' ? 'flex-start' : al === 'right' ? 'flex-end' : 'center' }}>
            <DraggableItem id="logo" initialPos={positions.logo} onPositionChange={updatePosition}>
              <img
                src={poster.logoImg}
                alt="logo"
                style={{
                  height: 56,
                  width: 'auto',
                  maxWidth: 160,
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.5))',
                }}
              />
            </DraggableItem>
          </div>
        )}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2}}>
          {poster.university && (
            <DraggableItem id="university" initialPos={positions.university} onPositionChange={updatePosition}>
              <div style={{ fontFamily: df, fontSize: scaleFont(17, textScale.primary), fontWeight: 700, color: pri, letterSpacing: '0.04em' }}>{poster.university}</div>
            </DraggableItem>
          )}
          {poster.dept && (
            <DraggableItem id="dept" initialPos={positions.dept} onPositionChange={updatePosition}>
              <div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.secondary), color: acc, marginTop: 2, fontWeight: 600, letterSpacing: '0.05em' }}>{poster.dept}</div>
            </DraggableItem>
          )}
          {poster.campus && (
            <DraggableItem id="campus" initialPos={positions.campus} onPositionChange={updatePosition}>
              <div style={{ fontFamily: bf, fontSize: scaleFont(11, textScale.primary), color: `${pri}99`, marginTop: 2 }}>{poster.campus}</div>
            </DraggableItem>
          )}
        </div>
      </div>

      {/* Category band */}
      <div style={{ padding: '5px 24px', textAlign: 'center' }}>
        <DraggableItem id="category" initialPos={positions.category} onPositionChange={updatePosition}>
          <span style={{ fontFamily: bf, fontSize: 11, fontWeight: 700, color: acc, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'inline-block' }}>{poster.category}</span>
        </DraggableItem>
      </div>

      {/* Body */}
      <div style={{ padding: '26px 24px', ...alignStyle, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        <DraggableItem id="title" initialPos={positions.title} onPositionChange={updatePosition}>
          {poster.title
            ? <div style={{ fontFamily: df, fontSize: scaleFont(26, textScale.primary), fontWeight: 700, color: pri, lineHeight: 1.2, marginBottom: 10, textShadow: '0 2px 14px rgba(0,0,0,0.4)'}}>{poster.title}</div>
            : <div style={{ fontFamily: 'Georgia', fontSize: scaleFont(20, textScale.primary), color: `${pri}33`, fontStyle: 'italic' }}>Event Title</div>
          }
        </DraggableItem>
        
        {poster.subtitle && (
          <DraggableItem id="subtitle" initialPos={positions.subtitle} onPositionChange={updatePosition}>
            <div style={{ fontFamily: bf, fontSize: scaleFont(13, textScale.secondary), color: acc, marginBottom: 18, fontStyle: 'italic' }}>{poster.subtitle}</div>
          </DraggableItem>
        )}
  
        <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 60, flexWrap: 'wrap' }}>
          
          {/* Speaker 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <DraggableItem id="sp1Img" initialPos={positions.sp1Img} onPositionChange={updatePosition} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <ResizableSpeakerImage src={speaker1.img} alt={speaker1.name} acc={acc} />
            </DraggableItem>
            
            <DraggableItem id="sp1Details" initialPos={positions.sp1Details} onPositionChange={updatePosition} style={{ textAlign: 'center' }}>
              {speaker1.name && <div style={{ fontFamily: df, fontSize: scaleFont(16, textScale.primary), fontWeight: 700, color: pri }}>{speaker1.name}</div>}
              {speaker1.title && <div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.secondary), color: acc, marginTop: 3 }}>{speaker1.title}</div>}
              {speaker1.alumni && <div style={{ fontFamily: bf, fontSize: 11, color: `${pri}99`, marginTop: 2, fontStyle: 'italic' }}>{speaker1.alumni}</div>}
            </DraggableItem>
          </div>

          {/* Speaker 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            
              <>
                <DraggableItem id="sp2Img" initialPos={positions.sp2Img} onPositionChange={updatePosition} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <ResizableSpeakerImage src={speaker2.img} alt={speaker2.name} acc={acc} />
                </DraggableItem>

                <DraggableItem id="sp2Details" initialPos={positions.sp2Details} onPositionChange={updatePosition} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: df, fontSize: scaleFont(16, textScale.primary), fontWeight: 700, color: pri }}>{speaker2.name || 'Mr. Speaker'}</div>
                   <div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.secondary), color: acc, marginTop: 3 }}>{speaker2.title || 'Speaker Title'}</div>
                   <div style={{ fontFamily: bf, fontSize: 11, color: `${pri}99`, marginTop: 2, fontStyle: 'italic' }}>{speaker2.alumni }</div>
                </DraggableItem>
              </>
            
          </div>
        </div>
        
        {/* Date + Venue */}
        {(dateTimeStr || poster.venue) && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginTop: 30 }}>
            {dateTimeStr && (
              <DraggableItem id="date" initialPos={positions.date} onPositionChange={updatePosition}>
                <div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.primary), color: pri, padding: '8px 12px', background: 'rgba(255,255,255,0.08)', borderRadius: 10 }}>
                  📅 {dateTimeStr}
                </div>
              </DraggableItem>
            )}
            {poster.venue && (
              <DraggableItem id="venue" initialPos={positions.venue} onPositionChange={updatePosition}>
                <div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.primary), color: pri, padding: '8px 12px', background: 'rgba(255,255,255,0.08)', borderRadius: 10 }}>
                  📍 {poster.venue}
                </div>
              </DraggableItem>
            )}
          </div>
        )}
        
        <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', right: 24, top: '50%' }}>
          <div style={{ transform: 'translateY(-50%)' }}>
            <DraggableItem id="sdgs" initialPos={positions.sdgs} onPositionChange={updatePosition}>
              <SDGBlock sdgs={poster.sdgs} size={30} />
            </DraggableItem>
          </div>
        </div>
      </div>
      
      <TaglineBar tagline={poster.tagline} reglink={poster.reglink} accent={acc} bf={bf} primary={pri} />
    </div>
  );
}

// ─────────────────────────────────────────────
// L1 — Editorial
// ─────────────────────────────────────────────
export function L1_Editorial({ poster, design, qrDataUrl }) {
  const { acc, pri, df, bf, bg, textScale, speaker1, speaker2, hasSpeaker, positions, updatePosition } = useLayoutProps({ poster, design, qrDataUrl });

  return (
    <div style={{
      ...parse(bg),
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'inherit',
      position: 'relative'
    }}>

      <div style={{ position: 'absolute', top: 0, right: 0, width: 4, height: '100%', background: acc }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '55%', height: 4, background: acc }} />

      <div style={{ padding: '28px 36px 0 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Institution row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
          {poster.logoImg && (
              <DraggableItem id="logo" initialPos={positions?.logo} onPositionChange={updatePosition}>
                <img
                  src={poster.logoImg}
                  alt="logo"
                  draggable={false}
                  style={{ height: 60, width: 60, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 6, marginBottom: 10, position: 'relative' }}
                />
              </DraggableItem>
          )}
          
            <div>
              {poster.university && <DraggableItem id="university" initialPos={positions?.university} onPositionChange={updatePosition}><div style={{ fontFamily: df, fontSize: scaleFont(14, textScale.primary), fontWeight: 700, color: pri }}>{poster.university}</div></DraggableItem>}
              {poster.dept && <DraggableItem id="dept" initialPos={positions?.dept} onPositionChange={updatePosition}><div style={{ fontFamily: bf, fontSize: scaleFont(11, textScale.secondary), color: acc, marginTop: 2 }}>{poster.dept}</div></DraggableItem>}
              {poster.campus && <DraggableItem id="campus" initialPos={positions?.campus} onPositionChange={updatePosition}><div style={{ fontFamily: bf, fontSize: scaleFont(10, textScale.primary), color: `${pri}80`, marginTop: 1 }}>{poster.campus}</div></DraggableItem>}
            </div>
          
        </div>

        {/* Category */}
        <DraggableItem id="category" initialPos={positions?.category} onPositionChange={updatePosition}>
          <div style={{
            display: 'inline-block',
            background: acc,
            padding: '4px 14px',
            borderRadius: 2,
            marginBottom: 16,
            alignSelf: 'flex-start'
          }}>
            <span style={{
              fontFamily: bf,
              fontSize: 10,
              fontWeight: 700,
              color: '#000',
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}>
              {poster.category}
            </span>
          </div>
        </DraggableItem>

        {/* Title */}
        <DraggableItem id="title" initialPos={positions?.title} onPositionChange={updatePosition}>
          {poster.title
          ? <div style={{
              fontFamily: df,
              fontSize: scaleFont(28, textScale.primary),
              fontWeight: 700,
              color: pri,
              lineHeight: 1.15,
              marginBottom: 8,
              paddingRight: 20
            }}>
              {poster.title}
            </div>
          : <div style={{
              fontSize: scaleFont(20, textScale.primary),
              color: `${pri}33`,
              fontStyle: 'italic',
              fontFamily: 'Georgia'
            }}>
              Event title appears here
            </div>
          }
        </DraggableItem>

        {poster.subtitle && (
            <DraggableItem id="subtitle" initialPos={positions?.subtitle} onPositionChange={updatePosition}>
              <div style={{
              fontFamily: bf,
              fontSize: scaleFont(13, textScale.secondary),
              color: acc,
              fontStyle: 'italic',
              marginBottom: 12
            }}>
              {poster.subtitle}
            </div>
            </DraggableItem>
        )}

        <div style={{ width: 48, height: 2, background: acc, margin: '14px 0' }} />

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {(poster.date || poster.time) && (
            <DraggableItem id="date" initialPos={positions?.date} onPositionChange={updatePosition}>
              <div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.primary), color: pri }}>
                <span style={{ color: acc }}>▸</span> {formatDate(poster.date)}{poster.date && poster.time ? ' at ' : ''}{formatTime(poster.time)}
              </div>
            </DraggableItem>
          )}
          {poster.venue && (
            <DraggableItem id="venue" initialPos={positions?.venue} onPositionChange={updatePosition}>
              <div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.primary), color: pri }}>
                <span style={{ color: acc }}>▸</span> {poster.venue}
              </div>
            </DraggableItem>
          )}
          {poster.audience && (
            <DraggableItem id="audience" initialPos={positions?.audience} onPositionChange={updatePosition}>
              <div style={{ fontFamily: bf, fontSize: scaleFont(11, textScale.primary), color: `${pri}99` }}>
                <span style={{ color: acc }}>▸</span> {poster.audience}
              </div>
            </DraggableItem>
          )}
        </div>

        <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />

        <div style={{ flex: 1 }} />
      </div>

      {/* ── FOOTER COLUMN ── */}
      {hasSpeaker && (
        <div style={{
          padding: '36px 28px 0px 28px', 
          background: 'rgba(0,0,0,0.3)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column', // Main container is a column
          gap: 24 // Spacing between the rows
        }}>

          {/* ROW 1: Speakers (Centered, horizontal) */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            
            {/* Speaker 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: 160 }}> {/* Reduced width to 160px so they don't wrap! */}
              <DraggableItem id="sp1Img" initialPos={positions?.sp1Img} onPositionChange={updatePosition}>
                <SpeakerPhoto img={speaker1.img} name={speaker1.name} accent={acc} />
              </DraggableItem>
              <DraggableItem id="sp1Details" initialPos={positions?.sp1Details} onPositionChange={updatePosition}>
                <SpeakerText name={speaker1.name} title={speaker1.title} alumni={speaker1.alumni} accent={acc} df={df} bf={bf} />
              </DraggableItem>
            </div>

            {/* Speaker 2 */}
            {speaker2.name && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: 160 }}>
                <DraggableItem id="sp2Img" initialPos={positions?.sp2Img} onPositionChange={updatePosition}>
                  <SpeakerPhoto img={speaker2.img} name={speaker2.name} accent={acc} />
                </DraggableItem>
                <DraggableItem id="sp2Details" initialPos={positions?.sp2Details} onPositionChange={updatePosition}>
                  <SpeakerText name={speaker2.name} title={speaker2.title} alumni={speaker2.alumni} accent={acc} df={df} bf={bf} />
                </DraggableItem>
              </div>
            )}
            
          </div>

          {/* ROW 2: SDGs (Right aligned, Row form) */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 16 }}>
            <DraggableItem id="sdgs" initialPos={positions?.sdgs} onPositionChange={updatePosition}>
              {/* Flex row ensures SDGs sit next to each other horizontally */}
              <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <SDGBlock sdgs={poster.sdgs} size={36} />
              </div>
            </DraggableItem>
          </div>

        </div>
      )}

      {/* ROW 3: Tagline */}
      {(poster.tagline || poster.reglink) && (
        <div style={{
          padding: '12px 28px',
          borderTop: `1px solid rgba(255,255,255,0.1)`,
          textAlign: 'center',
          background: 'rgba(0,0,0,0.4)' // slightly darker to ground the poster
        }}>
            <DraggableItem id="tagline" initialPos={positions?.tagline} onPositionChange={updatePosition}>
              <span style={{
              fontFamily: bf,
              fontSize: scaleFont(11, textScale.secondary),
              color: acc,
              fontStyle: 'italic',
              letterSpacing: '0.05em'
            }}>
              {poster.tagline || poster.reglink}
            </span>
            </DraggableItem>
        </div>
      )}

    </div>
  );
}

// ─────────────────────────────────────────────
// L2 — Split
// ─────────────────────────────────────────────
export function L2_Split({ poster, design, qrDataUrl }) {
  const { acc, pri, df, bf, g, textScale, speaker1, speaker2, hasSpeaker } = useLayoutProps({ poster, design, qrDataUrl });

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit' }}>
      {/* Top half */}
      <div style={{ flex: '0 0 40%', background: `linear-gradient(160deg,${g[0]},${g[1]})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 70% 30%,${acc}20,transparent 60%)` }} />
        {poster.logoImg && <DraggableItem><img src={poster.logoImg} alt="logo" style={{ height: 60, width: 60, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 6, marginBottom: 10, position: 'relative' }} /></DraggableItem>}
        
          <div style={{ position: 'relative', textAlign: 'center' }}>
          {poster.university && <DraggableItem><div style={{ fontFamily: df, fontSize: scaleFont(15, textScale.primary), fontWeight: 700, color: pri }}>{poster.university}</div></DraggableItem>}
          {poster.dept       && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(11, textScale.secondary), color: acc, marginTop: 3 }}>{poster.dept}</div></DraggableItem>}
          {poster.campus     && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(10, textScale.primary), color: `${pri}80`, marginTop: 2 }}>{poster.campus}</div></DraggableItem>}
        </div>
        
        
          <DraggableItem>
            <div style={{ marginTop: 16, background: acc, padding: '5px 18px', borderRadius: 20 }}>
              <span style={{ fontFamily: bf, fontSize: 10, fontWeight: 700, color: '#000', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{poster.category}</span>
            </div>
          </DraggableItem>
        
      </div>

      {/* Bottom half */}
      <div style={{ flex: 1, background: `linear-gradient(160deg,${g[1]},${g[2]})`, padding: '22px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          
          <DraggableItem>
            {poster.title
              ? <div style={{ fontFamily: df, fontSize: scaleFont(22, textScale.primary), fontWeight: 700, color: pri, lineHeight: 1.2, marginBottom: 8 }}>{poster.title}</div>
              : <div style={{ fontSize: scaleFont(18, textScale.primary), color: `${pri}33`, fontStyle: 'italic', fontFamily: 'Georgia' }}>Your event title</div>
            }
          </DraggableItem>
          
          {poster.subtitle && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.secondary), color: acc, fontStyle: 'italic', marginBottom: 14 }}>{poster.subtitle}</div></DraggableItem>}
          
            <div style={{ background: 'rgba(0,0,0,0.22)', borderRadius: 8, padding: 12, marginTop: 10, display: 'flex', flexDirection: 'column', gap: 7, borderLeft: `3px solid ${acc}` }}>
            {(poster.date || poster.time) && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.primary), color: pri }}>📅 {formatDate(poster.date)}{poster.date && poster.time ? ' · ' : ''}{formatTime(poster.time)}</div></DraggableItem>}
            {poster.venue    && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.primary), color: pri }}>📍 {poster.venue}</div></DraggableItem>}
            {poster.audience && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(11, textScale.primary), color: `${pri}A5` }}>👥 {poster.audience}</div></DraggableItem>}
          </div>
          
        </div>
        <div>
          {hasSpeaker && (
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(9, textScale.secondary), color: acc, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Speaker{speaker2.name ? 's' : ''}</div></DraggableItem>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <DraggableItem><SpeakerCard img={speaker1.img} name={speaker1.name} title={speaker1.title} alumni={speaker1.alumni} accent={acc} df={df} bf={bf} /></DraggableItem>
                  {speaker2.name && <DraggableItem><SpeakerCard img={speaker2.img} name={speaker2.name} title={speaker2.title} alumni={speaker2.alumni} accent={acc} df={df} bf={bf} /></DraggableItem>}
                </div>
                <DraggableItem><SDGBlock sdgs={poster.sdgs} size={30} /></DraggableItem>
              </div>
            </div>
          )}
          
            <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
          
        </div>
      </div>
      
        <TaglineBar tagline={poster.tagline} reglink={poster.reglink} accent={acc} bf={bf} primary={pri} />
      
    </div>
  );
}

// ─────────────────────────────────────────────
// L3 — Band
// ─────────────────────────────────────────────
export function L3_Band({ poster, design, qrDataUrl }) {
  const { acc, pri, df, bf, bg, textScale, hasSpeaker } = useLayoutProps({ poster, design, qrDataUrl });

  return (
    <div style={{ ...parse(bg), width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 7, background: acc }} />
      
      {/* Header Info */}
      <div style={{ padding: '22px 28px 14px', display: 'flex', alignItems: 'center', gap: 14, marginTop: 7 }}>
        {poster.logoImg && (
            <DraggableItem><img src={poster.logoImg} alt="logo" style={{ height: 52, width: 52, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 4 }} /></DraggableItem>
        )}
        
          <div>
            {poster.university && <DraggableItem><div style={{ fontFamily: df, fontSize: scaleFont(15, textScale.primary), fontWeight: 700, color: pri }}>{poster.university}</div></DraggableItem>}
            {poster.dept       && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(11, textScale.secondary), color: acc }}>{poster.dept}</div></DraggableItem>}
            {poster.campus     && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(10, textScale.primary), color: `${pri}80` }}>{poster.campus}</div></DraggableItem>}
          </div>
        
      </div>

      {/* Category Pill */}
      
        <DraggableItem>
          <div style={{ margin: '0 28px', padding: '12px 20px', background: acc, borderRadius: 8, textAlign: 'center' }}>
            <span style={{ fontFamily: bf, fontSize: 11, fontWeight: 700, color: '#000', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{poster.category}</span>
          </div>
        </DraggableItem>
      

      {/* Main Body */}
      <div style={{ padding: '22px 28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
        
        
          <DraggableItem>
            {poster.title
              ? <div style={{ fontFamily: df, fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 8 }}>{poster.title}</div>
              : <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', fontFamily: 'Georgia' }}>Event Title</div>
            }
          </DraggableItem>
        

        {poster.subtitle && (
            <DraggableItem>
              <div style={{ fontFamily: bf, fontSize: scaleFont(13, textScale.secondary), color: acc, fontStyle: 'italic', marginBottom: 14 }}>{poster.subtitle}</div>
            </DraggableItem>
        )}

        
          <div style={{ width: 60, height: 2, background: acc, margin: '12px auto' }} />
        

        
          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 8, alignItems: 'center', margin: '0 auto' }}>
            {(poster.date || poster.time) && <DraggableItem><div style={{ fontFamily: bf, fontSize: 13, color: '#fff', background: 'rgba(0,0,0,0.22)', padding: '6px 16px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)' }}>📅 {formatDate(poster.date)}{poster.date && poster.time ? ' · ' : ''}{formatTime(poster.time)}</div></DraggableItem>}
            {poster.venue    && <DraggableItem><div style={{ fontFamily: bf, fontSize: 12, color: '#fff', background: 'rgba(0,0,0,0.22)', padding: '6px 16px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)' }}>📍 {poster.venue}</div></DraggableItem>}
            {poster.audience && <DraggableItem><div style={{ fontFamily: bf, fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>For: {poster.audience}</div></DraggableItem>}
          </div>
        

        
          <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
        
      </div>

      {/* Footer */}
      <div style={{ position: 'relative' }}>
        
          <DraggableItem>
            <SpeakerFooter poster={poster} accent={acc} bf={bf} df={df} />
          </DraggableItem>
        
        
        {hasSpeaker && (
          
            <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)',zIndex: 10 }}>
              
                <div style={{ display: 'flex', gap: 8, flexWrap: 'nowrap' }}>
              <DraggableItem><SDGBlock sdgs={poster.sdgs} size={30} /></DraggableItem>
              </div>
              
            </div>
          
        )}
      </div>
      <div style={{ height: 7, background: acc }} />
    </div>
  );
}

export function L4_Overlay({ poster, design, qrDataUrl }) {
  const { acc, pri, df, bf, bg, textScale, dateTimeStr, speaker1, speaker2, hasSpeaker } = useLayoutProps({ poster, design, qrDataUrl });

  return (
    <div style={{ ...parse(bg), width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit', position: 'relative', overflow: 'hidden' }}>
      {/* Only show the darkening overlay if the background is an image */}
      {design.bgtype === 'image' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.54)' }} />
      )}
      <div style={{ position: 'absolute', bottom: -70, right: -70, width: 300, height: 300, borderRadius: '50%', border: `50px solid ${acc}14` }} />
      <div style={{ position: 'absolute', top: -50, left: -50, width: 220, height: 220, borderRadius: '50%', border: `35px solid ${acc}10` }} />

      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: 28 }}>
        
        {/* Top Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 22 }}>
          
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <DraggableItem>
                <SDGBlock sdgs={poster.sdgs} size={30} />
              </DraggableItem>
            </div>
          
          {poster.logoImg && (
            
              <div style={{ height: 64, position: 'relative', display: 'flex', alignItems: 'center' }}>
                <DraggableItem>
                <img
                  src={poster.logoImg}
                  alt="logo"
                  style={{
                    height: 56, // Keep height consistent
                    width: 'auto', // Let horizontal logos breathe!
                    maxWidth: 160, // Stop it from stretching too far
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.5))', // Makes it pop cleanly
                    
                  }}
                />
                </DraggableItem>
              </div>
              
            
            )}
        </div>

        {/* University Section */}
        
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 4, marginBottom: 24, padding: '0 24px' }}>
            {poster.university && 
            <DraggableItem>
            <div style={{ fontFamily: df, fontSize: scaleFont(24, textScale.primary), fontWeight: 800, color: pri }}>{poster.university}</div>
            </DraggableItem>
            }
            {poster.dept && 
            <DraggableItem>
            <div style={{ fontFamily: bf, fontSize: scaleFont(15, textScale.secondary), fontWeight: 700, color: acc }}>{poster.dept}</div>
            </DraggableItem>
            }
            {poster.campus && 
            <DraggableItem>
            <div style={{ fontFamily: bf, fontSize: scaleFont(13, textScale.primary), color: `${pri}cc` }}>{poster.campus}</div>
            </DraggableItem>
            }
          </div>
        

        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center', gap: 10, padding: '0 24px' }}>
          
          <DraggableItem>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${acc}`, padding: '5px 18px', borderRadius: 4, marginBottom: 12 }}>
            <span style={{ fontFamily: bf, fontSize: scaleFont(10, textScale.secondary), fontWeight: 700, color: acc, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              {poster.category}
            </span>
          </div>
          </DraggableItem>

          <DraggableItem>
            {poster.title
            ? <div style={{ fontFamily: df, fontSize: scaleFont(24, textScale.primary), fontWeight: 800, color: pri }}>{poster.title}</div>
            : <div style={{ fontFamily: 'Georgia', fontSize: scaleFont(24, textScale.primary), color: `${pri}33`, fontStyle: 'italic' }}>Event Title</div>
          }
          </DraggableItem>

          
          {poster.subtitle && (
            <DraggableItem>
              <div style={{ fontFamily: bf, fontSize: scaleFont(13, textScale.secondary), color: acc, fontStyle: 'italic', marginTop: 8 }}>
              {poster.subtitle}
            </div>
            </DraggableItem>
            
          )}

          
            
          
        </div>

    {/* ── Speakers — dedicated centered section ── */}
      {hasSpeaker && (
        <div style={{
          marginTop: 20,
          paddingTop: 16,
      
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
          flexWrap: 'wrap',
        }}>
          <DraggableItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            {speaker1.img
              ? <img src={speaker1.img} alt={speaker1.name} style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${acc}` }} />
              : <div style={{ width: 100, height: 100, borderRadius: '50%', background: `${acc}28`, border: `3px solid ${acc}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>👤</div>
            }
          </DraggableItem>
          <DraggableItem style={{ textAlign: 'center' }}>
            {speaker1.name && <div style={{ fontFamily: df, fontSize: scaleFont(16, textScale.primary), fontWeight: 700, color: pri }}>{speaker1.name}</div>}
            {speaker1.title && <div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.secondary), color: acc, marginTop: 3 }}>{speaker1.title}</div>}
            {speaker1.alumni && <div style={{ fontFamily: bf, fontSize: 11, color: `${pri}99`, marginTop: 2, fontStyle: 'italic' }}>{speaker1.alumni}</div>}
          </DraggableItem>

          {speaker2.name && (
            <>
              <DraggableItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                {speaker2.img
                  ? <img src={speaker2.img} alt={speaker2.name} style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${acc}` }} />
                  : <div style={{ width: 100, height: 100, borderRadius: '50%', background: `${acc}28`, border: `3px solid ${acc}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>👤</div>
                }
              </DraggableItem>
              <DraggableItem style={{ textAlign: 'center' }}>
                {speaker2.name && <div style={{ fontFamily: df, fontSize: scaleFont(16, textScale.primary), fontWeight: 700, color: pri }}>{speaker2.name}</div>}
                {speaker2.title && <div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.secondary), color: acc, marginTop: 3 }}>{speaker2.title}</div>}
                {speaker2.alumni && <div style={{ fontFamily: bf, fontSize: 11, color: `${pri}99`, marginTop: 2, fontStyle: 'italic' }}>{speaker2.alumni}</div>}
              </DraggableItem>
            </>
          )}
        </div>
      )}

      {/* ── Date + Venue — compact row below speakers ── */}
      {(dateTimeStr || poster.venue) && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
          {dateTimeStr && (
            <DraggableItem>
              <div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.primary), color: pri, padding: '8px 12px', background: 'rgba(255,255,255,0.08)', borderRadius: 10 }}>
                📅 {dateTimeStr}
              </div>
            </DraggableItem>
          )}
          {poster.venue && (
            <DraggableItem>
              <div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.primary), color: pri, padding: '8px 12px', background: 'rgba(255,255,255,0.08)', borderRadius: 10 }}>
                📍 {poster.venue}
              </div>
            </DraggableItem>
          )}
        </div>
      )}

        {/* QR */}
        <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
        <TaglineBar tagline={poster.tagline} reglink={poster.reglink} accent={acc} primary={pri} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// L5 — Minimal
// ─────────────────────────────────────────────
const CATEGORY_ICONS = { Workshop: '🛠', Seminar: '🎓', Hackathon: '💻', 'Competitive Exam': '🏆', Conference: '🌐', Webinar: '🖥', FDP: '📋', Symposium: '🎤', 'Skill Enhancement': '💡', 'Guest Lecture': '🎙' };

export function L5_Minimal({ poster, design, qrDataUrl }) {
  const { acc, pri, df, bf, bg, textScale, speaker1, speaker2, hasSpeaker } = useLayoutProps({ poster, design, qrDataUrl });

  return (
    <div style={{ ...parse(bg), width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit' }}>
      <div style={{ padding: '32px 36px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {poster.logoImg && <DraggableItem><img src={poster.logoImg} alt="logo" style={{ height: 42, width: 42, objectFit: 'contain', borderRadius: 4, background: '#fff', padding: 3 }} /></DraggableItem>}
            <div>
              {poster.university && <DraggableItem><div style={{ fontFamily: df, fontSize: scaleFont(13, textScale.primary), fontWeight: 700, color: pri }}>{poster.university}</div></DraggableItem>}
              {poster.dept       && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(10, textScale.secondary), color: acc }}>{poster.dept}</div></DraggableItem>}
            </div>
          </div>
          <DraggableItem>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: acc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>
              {CATEGORY_ICONS[poster.category] || '📚'}
            </div>
          </DraggableItem>
        </div>
        <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(10, textScale.secondary), color: acc, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>{poster.category}</div></DraggableItem>
        <DraggableItem>
          {poster.title
            ? <div style={{ fontFamily: df, fontSize: scaleFont(26, textScale.primary), fontWeight: 700, color: pri, lineHeight: 1.2, borderLeft: `3px solid ${acc}`, paddingLeft: 14 }}>{poster.title}</div>
            : <div style={{ fontSize: scaleFont(20, textScale.primary), color: `${pri}33`, borderLeft: '3px solid rgba(255,255,255,0.1)', paddingLeft: 14, fontStyle: 'italic', fontFamily: 'Georgia' }}>Event Title</div>
          }
        </DraggableItem>
        {poster.subtitle && <DraggableItem><div style={{ fontFamily: bf, fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 8, paddingLeft: 17, fontStyle: 'italic' }}>{poster.subtitle}</div></DraggableItem>}
      </div>

      <div style={{ flex: 1, padding: '20px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ marginBottom: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {poster.date     && <InfoCard label="Date"   value={formatDate(poster.date)} acc={acc} bf={bf} textScale={textScale} />}
          {poster.time     && <InfoCard label="Time"   value={formatTime(poster.time)} acc={acc} bf={bf} textScale={textScale} />}
          {poster.venue    && <InfoCard label="Venue"  value={poster.venue}   acc={acc} bf={bf} span={2} textScale={textScale} />}
          {poster.audience && <InfoCard label="For"    value={poster.audience} acc={acc} bf={bf} span={2} textScale={textScale} />}
        </div>
        {hasSpeaker && (
          <div style={{ paddingTop: 14, borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <DraggableItem><SpeakerCard img={speaker1.img} name={speaker1.name} title={speaker1.title} alumni={speaker1.alumni} accent={acc} df={df} bf={bf} /></DraggableItem>
                {speaker2.name && <DraggableItem><SpeakerCard img={speaker2.img} name={speaker2.name} title={speaker2.title} alumni={speaker2.alumni} accent={acc} df={df} bf={bf} /></DraggableItem>}
              </div>
              <DraggableItem><SDGBlock sdgs={poster.sdgs} size={30} /></DraggableItem>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 12 }}>
          {poster.campus ? <DraggableItem><div style={{ fontFamily: bf, fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{poster.campus}{poster.tagline ? ' · ' + poster.tagline : ''}</div></DraggableItem> : <div />}
          <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value, acc, bf, span, textScale }) {
  return (
    <div style={{ gridColumn: span ? `span ${span}` : undefined }}>
      <DraggableItem>
        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 12px' }}>
          <div style={{ fontFamily: bf, fontSize: scaleFont(9, textScale.secondary), color: acc, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
          <div style={{ fontFamily: bf, fontSize: 12, color: '#fff' }}>{value}</div>
        </div>
      </DraggableItem>
    </div>
  );
}

// ─────────────────────────────────────────────
// L6 — Diagonal
// ─────────────────────────────────────────────
export function L6_Diagonal({ poster, design, qrDataUrl }) {
  const { acc, pri, df, bf, g, textScale, speaker1, speaker2, hasSpeaker } = useLayoutProps({ poster, design, qrDataUrl });

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit', position: 'relative', overflow: 'hidden', background: g[0] }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '40%', background: `linear-gradient(135deg,${g[0]} 0%,${g[1]} 100%)`, transform: 'skewY(-6deg)', transformOrigin: 'top left' }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(170deg,transparent 45%,${g[2]} 100%)` }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '26px 28px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {poster.logoImg && <DraggableItem><img src={poster.logoImg} alt="logo" style={{ height: 50, width: 50, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 4 }} /></DraggableItem>}
            <div>
              {poster.university && <DraggableItem><div style={{ fontFamily: df, fontSize: scaleFont(14, textScale.primary), fontWeight: 700, color: pri, textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>{poster.university}</div></DraggableItem>}
              {poster.dept       && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(10, textScale.secondary), color: acc, marginTop: 2 }}>{poster.dept}</div></DraggableItem>}
            </div>
          </div>
          <DraggableItem>
            <div style={{ background: acc, padding: '4px 14px', borderRadius: 20, flexShrink: 0, marginTop: 4 }}>
              <span style={{ fontFamily: bf, fontSize: 10, fontWeight: 700, color: '#000', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{poster.category}</span>
            </div>
          </DraggableItem>
        </div>
        <DraggableItem>
          {poster.title
            ? <div style={{ fontFamily: df, fontSize: scaleFont(28, textScale.primary), fontWeight: 700, color: pri, lineHeight: 1.15, marginBottom: 8, textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>{poster.title}</div>
            : <div style={{ fontSize: scaleFont(22, textScale.primary), color: `${pri}33`, fontStyle: 'italic', fontFamily: 'Georgia' }}>Event Title</div>
          }
        </DraggableItem>
        {poster.subtitle && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(13, textScale.secondary), color: acc, fontStyle: 'italic', marginBottom: 14 }}>{poster.subtitle}</div></DraggableItem>}
      </div>

      <div style={{ position: 'relative', zIndex: 1, flex: 1, padding: '16px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(poster.date || poster.time) && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.primary), color: pri }}>📅 {formatDate(poster.date)}{poster.date && poster.time ? ' · ' : ''}{formatTime(poster.time)}</div></DraggableItem>}
            {poster.venue    && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.primary), color: pri }}>📍 {poster.venue}</div></DraggableItem>}
            {poster.audience && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(11, textScale.primary), color: `${pri}A5` }}>👥 {poster.audience}</div></DraggableItem>}
          </div>
        </div>
        {hasSpeaker && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <DraggableItem><SpeakerCard img={speaker1.img} name={speaker1.name} title={speaker1.title} alumni={speaker1.alumni} accent={acc} df={df} bf={bf} /></DraggableItem>
              {speaker2.name && <DraggableItem><SpeakerCard img={speaker2.img} name={speaker2.name} title={speaker2.title} alumni={speaker2.alumni} accent={acc} df={df} bf={bf} /></DraggableItem>}
            </div>
            <DraggableItem><SDGBlock sdgs={poster.sdgs} size={30} /></DraggableItem>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 12 }}>
          {poster.campus ? <DraggableItem><div style={{ fontFamily: bf, fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{poster.campus}</div></DraggableItem> : <div />}
          <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// L7 — Frame
// ─────────────────────────────────────────────
export function L7_Frame({ poster, design, qrDataUrl }) {
  const { acc, pri, df, bf, bg, textScale, speaker1, speaker2, hasSpeaker } = useLayoutProps({ poster, design, qrDataUrl });
  const corner = { position: 'absolute', width: 20, height: 20 };

  return (
    <div style={{ ...parse(bg), width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit', position: 'relative' }}>
      {/* Decorative frame corners */}
      <div style={{ position: 'absolute', inset: 10, border: `2px solid ${acc}55`, borderRadius: 4, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 16, border: `1px solid ${acc}22`, borderRadius: 2, pointerEvents: 'none' }} />
      {[['top:10px;left:10px', 'borderTop', 'borderLeft'], ['top:10px;right:10px', 'borderTop', 'borderRight'], ['bottom:10px;left:10px', 'borderBottom', 'borderLeft'], ['bottom:10px;right:10px', 'borderBottom', 'borderRight']].map(([pos, b1, b2], i) => {
        const [topOrBot, side] = pos.split(';');
        const [topKey, topVal] = topOrBot.split(':');
        const [sideKey, sideVal] = side.split(':');
        return <div key={i} style={{ ...corner, [topKey]: topVal, [sideKey]: sideVal, [b1]: `3px solid ${acc}`, [b2]: `3px solid ${acc}`, borderRadius: 2 }} />;
      })}

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', padding: 30 }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          {poster.logoImg && <DraggableItem><img src={poster.logoImg} alt="logo" style={{ height: 58, width: 58, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 5, marginBottom: 8, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} /></DraggableItem>}
          {poster.university && <DraggableItem><div style={{ fontFamily: df, fontSize: scaleFont(16, textScale.primary), fontWeight: 700, color: pri, letterSpacing: '0.04em' }}>{poster.university}</div></DraggableItem>}
          {poster.dept       && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(11, textScale.secondary), color: acc, marginTop: 2, letterSpacing: '0.05em' }}>{poster.dept}</div></DraggableItem>}
          {poster.campus     && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(10, textScale.primary), color: `${pri}80`, marginTop: 2 }}>{poster.campus}</div></DraggableItem>}
          <div style={{ width: 80, height: 1, background: `${acc}55`, margin: '14px auto 0' }} />
        </div>
        <DraggableItem>
          <div style={{ textAlign: 'center', background: acc, padding: '5px 20px', margin: '0 auto 18px', borderRadius: 2, display: 'inline-block' }}>
            <span style={{ fontFamily: bf, fontSize: 11, fontWeight: 700, color: '#000', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{poster.category}</span>
          </div>
        </DraggableItem>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <DraggableItem>
            {poster.title
              ? <div style={{ fontFamily: df, fontSize: scaleFont(25, textScale.primary), fontWeight: 700, color: pri, lineHeight: 1.2, marginBottom: 10 }}>{poster.title}</div>
              : <div style={{ fontSize: scaleFont(20, textScale.primary), color: `${pri}33`, fontStyle: 'italic', fontFamily: 'Georgia' }}>Event Title</div>
            }
          </DraggableItem>
          {poster.subtitle && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(13, textScale.secondary), color: acc, fontStyle: 'italic', marginBottom: 14 }}>{poster.subtitle}</div></DraggableItem>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(poster.date || poster.time) && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.primary), color: pri }}>📅 {formatDate(poster.date)}{poster.date && poster.time ? ' · ' : ''}{formatTime(poster.time)}</div></DraggableItem>}
            {poster.venue    && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.primary), color: pri }}>📍 {poster.venue}</div></DraggableItem>}
            {poster.audience && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(11, textScale.primary), color: `${pri}99` }}>👥 {poster.audience}</div></DraggableItem>}
          </div>
          <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
        </div>
        {hasSpeaker && (
          <div style={{ paddingTop: 14, borderTop: `1px solid ${acc}30` }}>
            <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(9, textScale.secondary), color: acc, letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 10 }}>Speaker{speaker2.name ? 's' : ''}</div></DraggableItem>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <DraggableItem><SpeakerCard img={speaker1.img} name={speaker1.name} title={speaker1.title} alumni={speaker1.alumni} accent={acc} df={df} bf={bf} /></DraggableItem>
                {speaker2.name && <DraggableItem><SpeakerCard img={speaker2.img} name={speaker2.name} title={speaker2.title} alumni={speaker2.alumni} accent={acc} df={df} bf={bf} /></DraggableItem>}
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <DraggableItem><SDGBlock sdgs={poster.sdgs} size={30} /></DraggableItem>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// L8 — Timeline
// ─────────────────────────────────────────────
export function L8_Timeline({ poster, design, qrDataUrl }) {
  const { acc, pri, df, bf, bg, textScale, speaker1, speaker2, hasSpeaker } = useLayoutProps({ poster, design, qrDataUrl });

  return (
    <div style={{ ...parse(bg), width: '100%', height: '100%', display: 'flex', minHeight: 'inherit' }}>
      {/* Vertical accent bar */}
      <div style={{ width: 8, background: acc, flexShrink: 0, position: 'relative' }}>
        {[30, 50, undefined].map((top, i) => (
          <div key={i} style={{ position: 'absolute', top: top !== undefined ? top : undefined, bottom: top === undefined ? 30 : undefined, left: '50%', transform: 'translateX(-50%)', width: 16, height: 16, borderRadius: '50%', background: pri, border: `3px solid ${acc}` }} />
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 22px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          {poster.logoImg && <DraggableItem><img src={poster.logoImg} alt="logo" style={{ height: 44, width: 44, objectFit: 'contain', borderRadius: 4, background: '#fff', padding: 3 }} /></DraggableItem>}
          <div>
            {poster.university && <DraggableItem><div style={{ fontFamily: df, fontSize: scaleFont(14, textScale.primary), fontWeight: 700, color: pri }}>{poster.university}</div></DraggableItem>}
            {poster.dept       && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(10, textScale.secondary), color: acc }}>{poster.dept}</div></DraggableItem>}
            {poster.campus     && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(9, textScale.primary), color: `${pri}80` }}>{poster.campus}</div></DraggableItem>}
          </div>
        </div>
        <DraggableItem>
          <div style={{ background: acc, display: 'inline-block', padding: '4px 14px', borderRadius: 20, marginBottom: 14, alignSelf: 'flex-start' }}>
            <span style={{ fontFamily: bf, fontSize: 10, fontWeight: 700, color: '#000', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{poster.category}</span>
          </div>
        </DraggableItem>
        <DraggableItem>
          {poster.title
            ? <div style={{ fontFamily: df, fontSize: scaleFont(24, textScale.primary), fontWeight: 700, color: pri, lineHeight: 1.2, marginBottom: 6 }}>{poster.title}</div>
            : <div style={{ fontSize: scaleFont(18, textScale.primary), color: `${pri}33`, fontStyle: 'italic', fontFamily: 'Georgia' }}>Event Title</div>
          }
        </DraggableItem>
        {poster.subtitle && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.secondary), color: acc, fontStyle: 'italic', marginBottom: 14 }}>{poster.subtitle}</div></DraggableItem>}

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          {(poster.date || poster.time) && <TimelineCard icon="📅" label="Date & Time" value={`${formatDate(poster.date)}${poster.date && poster.time ? ' at ' : ''}${formatTime(poster.time)}`} acc={acc} pri={pri} bf={bf} textScale={textScale} />}
          {poster.venue    && <TimelineCard icon="📍" label="Venue"    value={poster.venue}   acc={acc} pri={pri} bf={bf} textScale={textScale} />}
          {poster.audience && <TimelineCard icon="👥" label="Audience" value={poster.audience} acc={acc} pri={pri} bf={bf} textScale={textScale} />}
        </div>

        {hasSpeaker && (
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(9, textScale.secondary), color: acc, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Speaker{speaker2.name ? 's' : ''}</div></DraggableItem>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <DraggableItem><SpeakerCard img={speaker1.img} name={speaker1.name} title={speaker1.title} alumni={speaker1.alumni} accent={acc} df={df} bf={bf} size={44} /></DraggableItem>
                {speaker2.name && <DraggableItem><SpeakerCard img={speaker2.img} name={speaker2.name} title={speaker2.title} alumni={speaker2.alumni} accent={acc} df={df} bf={bf} size={44} /></DraggableItem>}
              </div>
              <DraggableItem><SDGBlock sdgs={poster.sdgs} size={30} /></DraggableItem>
            </div>
          </div>
        )}
        <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
      </div>
    </div>
  );
}

function TimelineCard({ icon, label, value, acc, pri, bf, textScale }) {
  return (
    <DraggableItem>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(255,255,255,0.07)', borderRadius: 6, borderLeft: `3px solid ${acc}` }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <div>
          <div style={{ fontFamily: bf, fontSize: scaleFont(9, textScale.secondary), color: acc, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
          <div style={{ fontFamily: bf, fontSize: scaleFont(13, textScale.primary), color: pri }}>{value}</div>
        </div>
      </div>
    </DraggableItem>
  );
}

// ─────────────────────────────────────────────
// L9 — Typographic
// ─────────────────────────────────────────────
export function L9_Typographic({ poster, design, qrDataUrl }) {
  const { acc, pri, df, bf, g, textScale, speaker1, speaker2, hasSpeaker } = useLayoutProps({ poster, design, qrDataUrl });
  const ghostLetter = poster.category?.[0] || 'E';

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit', background: g[0], position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -60, right: -40, fontFamily: df, fontSize: scaleFont(280, textScale.secondary), fontWeight: 900, color: acc, opacity: 0.06, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>{ghostLetter}</div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${acc},${acc}00)` }} />

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {poster.logoImg && <DraggableItem><img src={poster.logoImg} alt="logo" style={{ height: 42, width: 42, objectFit: 'contain', borderRadius: 4, background: '#fff', padding: 3 }} /></DraggableItem>}
            <div>
              {poster.university && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(12, textScale.primary), fontWeight: 700, color: pri, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{poster.university}</div></DraggableItem>}
              {poster.dept       && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(10, textScale.secondary), color: acc, marginTop: 1, letterSpacing: '0.04em' }}>{poster.dept}</div></DraggableItem>}
            </div>
          </div>
          <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(10, textScale.secondary), color: acc, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', border: `1px solid ${acc}55`, padding: '4px 10px', borderRadius: 2 }}>{poster.category}</div></DraggableItem>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <DraggableItem>
            {poster.title
              ? <div style={{ fontFamily: df, fontSize: scaleFont(34, textScale.primary), fontWeight: 900, color: pri, lineHeight: 1.05, marginBottom: 12, letterSpacing: '-0.01em' }}>{poster.title}</div>
              : <div style={{ fontSize: scaleFont(28, textScale.primary), fontWeight: 900, color: `${pri}26`, fontFamily: 'Georgia', lineHeight: 1.1 }}>EVENT TITLE</div>
            }
          </DraggableItem>
          {poster.subtitle && <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(14, textScale.secondary), color: acc, fontStyle: 'italic', marginBottom: 20, opacity: 0.9 }}>{poster.subtitle}</div></DraggableItem>}
          <div style={{ height: 1, background: `linear-gradient(90deg,${acc},transparent)`, marginBottom: 20, width: '60%' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(poster.date || poster.time) && <TypoRow label="When"  value={`${formatDate(poster.date)}${poster.date && poster.time ? ' — ' : ''}${formatTime(poster.time)}`} acc={acc} pri={pri} bf={bf} textScale={textScale} />}
            {poster.venue    && <TypoRow label="Where" value={poster.venue}   acc={acc} pri={pri} bf={bf} textScale={textScale} />}
            {poster.audience && <TypoRow label="For"   value={poster.audience} acc={acc} pri={pri} bf={bf} dim textScale={textScale} />}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            {hasSpeaker && (
              <div style={{ marginTop: 16 }}>
                <DraggableItem><div style={{ fontFamily: bf, fontSize: scaleFont(9, textScale.secondary), color: acc, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Speaker{speaker2.name ? 's' : ''}</div></DraggableItem>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                    <DraggableItem><SpeakerCard img={speaker1.img} name={speaker1.name} title={speaker1.title} alumni={speaker1.alumni} accent={acc} df={df} bf={bf} size={44} /></DraggableItem>
                    {speaker2.name && <DraggableItem><SpeakerCard img={speaker2.img} name={speaker2.name} title={speaker2.title} alumni={speaker2.alumni} accent={acc} df={df} bf={bf} size={44} /></DraggableItem>}
                  </div>
                  <DraggableItem><SDGBlock sdgs={poster.sdgs} size={30} /></DraggableItem>
                </div>
              </div>
            )}
            {poster.campus && <DraggableItem><div style={{ marginTop: 10, fontFamily: bf, fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{poster.campus}</div></DraggableItem>}
          </div>
          <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
        </div>
      </div>
    </div>
  );
}

function TypoRow({ label, value, acc, pri, bf, dim, textScale }) {
  return (
    <DraggableItem>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: bf, fontSize: scaleFont(10, textScale.secondary), color: acc, letterSpacing: '0.1em', textTransform: 'uppercase', width: 40, flexShrink: 0 }}>{label}</span>
        <span style={{ fontFamily: bf, fontSize: scaleFont(13, textScale.primary), color: dim ? `${pri}BF` : pri }}>{value}</span>
      </div>
    </DraggableItem>
  );
}

// ─────────────────────────────────────────────
// Helper: CSS string → React style object
// ─────────────────────────────────────────────
function parse(cssStr) {
  const style = {};
  cssStr.split(';').forEach(decl => {
    const [prop, ...vals] = decl.split(':');
    if (!prop || !vals.length) return;
    const key = prop.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    style[key] = vals.join(':').trim();
  });
  return style;
}
