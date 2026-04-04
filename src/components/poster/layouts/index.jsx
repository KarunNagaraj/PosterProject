import { GRADIENTS } from '../../../constants';
import { buildBackground, formatDate, formatTime, getDisplayFont, getBodyFont } from '../../../utils';
import { SpeakerCard, SpeakerFooter, InfoRow, QRBlock, TaglineBar } from '../PosterParts';

// ── Shared props shape ────────────────────────
// Each layout receives: { poster, design, qrDataUrl }

function useLayoutProps({ poster, design, qrDataUrl }) {
  const acc = design.accent;
  const al  = design.align;
  const df  = getDisplayFont(design.font);
  const bf  = getBodyFont(design.font);
  const bg  = buildBackground(design);
  const g   = GRADIENTS[design.gradient];
  const dateTimeStr = [formatDate(poster.date), formatTime(poster.time)].filter(Boolean).join(' · ');
  const showQR = poster.showQR && !!qrDataUrl;

  return { acc, al, df, bf, bg, g, dateTimeStr, showQR };
}

// ─────────────────────────────────────────────
// L0 — Classic
// ─────────────────────────────────────────────
export function L0_Classic({ poster, design, qrDataUrl }) {
  const { acc, al, df, bf, bg } = useLayoutProps({ poster, design, qrDataUrl });
  const alignStyle = { textAlign: al };
  const logoMargin = al === 'left' ? '0 auto 8px 0' : al === 'right' ? '0 0 8px auto' : '0 auto 8px';

  return (
    <div style={{ ...parse(bg), width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit' }}>
      {/* Header */}
      <div style={{ background: 'rgba(0,0,0,0.38)', padding: '22px 24px', ...alignStyle, borderBottom: `3px solid ${acc}` }}>
        {poster.logoImg && <img src={poster.logoImg} alt="logo" style={{ height: 56, width: 56, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 4, marginBottom: 8, display: 'block', margin: logoMargin }} />}
        {poster.university && <div style={{ fontFamily: df, fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>{poster.university}</div>}
        {poster.dept       && <div style={{ fontFamily: bf, fontSize: 12, color: acc, marginTop: 2, fontWeight: 600, letterSpacing: '0.05em' }}>{poster.dept}</div>}
        {poster.campus     && <div style={{ fontFamily: bf, fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{poster.campus}</div>}
      </div>

      {/* Category band */}
      <div style={{ padding: '5px 24px', background: acc, textAlign: 'center' }}>
        <span style={{ fontFamily: bf, fontSize: 11, fontWeight: 700, color: '#000', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{poster.category}</span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '26px 24px', ...alignStyle, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {poster.title
          ? <div style={{ fontFamily: df, fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 10, textShadow: '0 2px 14px rgba(0,0,0,0.4)' }}>{poster.title}</div>
          : <div style={{ fontFamily: 'Georgia', fontSize: 20, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>Event Title</div>
        }
        {poster.subtitle && <div style={{ fontFamily: bf, fontSize: 13, color: acc, marginBottom: 18, fontStyle: 'italic' }}>{poster.subtitle}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
          <InfoRow icon="📅" text={[formatDate(poster.date), formatTime(poster.time)].filter(Boolean).join(' · ')} accent={acc} bf={bf} align={al} />
          <InfoRow icon="📍" text={poster.venue}    accent={acc} bf={bf} align={al} />
          <InfoRow icon="👥" text={poster.audience} accent={acc} bf={bf} align={al} />
        </div>
        <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
      </div>

      <SpeakerFooter poster={poster} accent={acc} bf={bf} df={df} />
      <TaglineBar tagline={poster.tagline} reglink={poster.reglink} accent={acc} bf={bf} />
    </div>
  );
}

// ─────────────────────────────────────────────
// L1 — Editorial
// ─────────────────────────────────────────────
export function L1_Editorial({ poster, design, qrDataUrl }) {
  const { acc, df, bf, bg } = useLayoutProps({ poster, design, qrDataUrl });

  return (
    <div style={{ ...parse(bg), width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 4, height: '100%', background: acc }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '55%', height: 4, background: acc }} />

      <div style={{ padding: '28px 36px 0 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Institution row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
          {poster.logoImg && <img src={poster.logoImg} alt="logo" style={{ height: 48, width: 48, objectFit: 'contain', borderRadius: 4, background: 'rgba(255,255,255,0.12)', padding: 3, flexShrink: 0 }} />}
          <div>
            {poster.university && <div style={{ fontFamily: df, fontSize: 14, fontWeight: 700, color: '#fff' }}>{poster.university}</div>}
            {poster.dept       && <div style={{ fontFamily: bf, fontSize: 11, color: acc, marginTop: 2 }}>{poster.dept}</div>}
            {poster.campus     && <div style={{ fontFamily: bf, fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>{poster.campus}</div>}
          </div>
        </div>

        {/* Category pill */}
        <div style={{ display: 'inline-block', background: acc, padding: '4px 14px', borderRadius: 2, marginBottom: 16, alignSelf: 'flex-start' }}>
          <span style={{ fontFamily: bf, fontSize: 10, fontWeight: 700, color: '#000', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{poster.category}</span>
        </div>

        {poster.title
          ? <div style={{ fontFamily: df, fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 8, paddingRight: 20 }}>{poster.title}</div>
          : <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', fontFamily: 'Georgia' }}>Event title appears here</div>
        }
        {poster.subtitle && <div style={{ fontFamily: bf, fontSize: 13, color: acc, fontStyle: 'italic', marginBottom: 12 }}>{poster.subtitle}</div>}

        <div style={{ width: 48, height: 2, background: acc, margin: '14px 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {(poster.date || poster.time) && <div style={{ fontFamily: bf, fontSize: 12, color: '#fff' }}><span style={{ color: acc }}>▸</span> {formatDate(poster.date)}{poster.date && poster.time ? ' at ' : ''}{formatTime(poster.time)}</div>}
          {poster.venue    && <div style={{ fontFamily: bf, fontSize: 12, color: '#fff' }}><span style={{ color: acc }}>▸</span> {poster.venue}</div>}
          {poster.audience && <div style={{ fontFamily: bf, fontSize: 11, color: 'rgba(255,255,255,0.6)' }}><span style={{ color: acc }}>▸</span> {poster.audience}</div>}
        </div>
        <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
        <div style={{ flex: 1 }} />
      </div>

      {(poster.sp1name || poster.sp1img) && (
        <div style={{ padding: '18px 28px', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontFamily: bf, fontSize: 9, color: acc, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>Speaker{poster.sp2name ? 's' : ''}</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <SpeakerCard img={poster.sp1img} name={poster.sp1name} title={poster.sp1title} alumni={poster.sp1alumni} accent={acc} df={df} bf={bf} />
            {poster.sp2name && <SpeakerCard img={poster.sp2img} name={poster.sp2name} title={poster.sp2title} alumni={poster.sp2alumni} accent={acc} df={df} bf={bf} />}
          </div>
        </div>
      )}
      {(poster.tagline || poster.reglink) && (
        <div style={{ padding: '7px 28px', borderTop: `2px solid ${acc}`, textAlign: 'right', background: 'rgba(0,0,0,0.2)' }}>
          <span style={{ fontFamily: bf, fontSize: 10, color: acc, fontStyle: 'italic' }}>{poster.tagline || poster.reglink}</span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// L2 — Split
// ─────────────────────────────────────────────
export function L2_Split({ poster, design, qrDataUrl }) {
  const { acc, df, bf, g } = useLayoutProps({ poster, design, qrDataUrl });

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit' }}>
      {/* Top half */}
      <div style={{ flex: '0 0 40%', background: `linear-gradient(160deg,${g[0]},${g[1]})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 70% 30%,${acc}20,transparent 60%)` }} />
        {poster.logoImg && <img src={poster.logoImg} alt="logo" style={{ height: 60, width: 60, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 6, marginBottom: 10, position: 'relative' }} />}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          {poster.university && <div style={{ fontFamily: df, fontSize: 15, fontWeight: 700, color: '#fff' }}>{poster.university}</div>}
          {poster.dept       && <div style={{ fontFamily: bf, fontSize: 11, color: acc, marginTop: 3 }}>{poster.dept}</div>}
          {poster.campus     && <div style={{ fontFamily: bf, fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{poster.campus}</div>}
        </div>
        <div style={{ marginTop: 16, background: acc, padding: '5px 18px', borderRadius: 20 }}>
          <span style={{ fontFamily: bf, fontSize: 10, fontWeight: 700, color: '#000', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{poster.category}</span>
        </div>
      </div>

      {/* Bottom half */}
      <div style={{ flex: 1, background: `linear-gradient(160deg,${g[1]},${g[2]})`, padding: '22px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {poster.title
            ? <div style={{ fontFamily: df, fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 8 }}>{poster.title}</div>
            : <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', fontFamily: 'Georgia' }}>Your event title</div>
          }
          {poster.subtitle && <div style={{ fontFamily: bf, fontSize: 12, color: acc, fontStyle: 'italic', marginBottom: 14 }}>{poster.subtitle}</div>}
          <div style={{ background: 'rgba(0,0,0,0.22)', borderRadius: 8, padding: 12, marginTop: 10, display: 'flex', flexDirection: 'column', gap: 7, borderLeft: `3px solid ${acc}` }}>
            {(poster.date || poster.time) && <div style={{ fontFamily: bf, fontSize: 12, color: '#fff' }}>📅 {formatDate(poster.date)}{poster.date && poster.time ? ' · ' : ''}{formatTime(poster.time)}</div>}
            {poster.venue    && <div style={{ fontFamily: bf, fontSize: 12, color: '#fff' }}>📍 {poster.venue}</div>}
            {poster.audience && <div style={{ fontFamily: bf, fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>👥 {poster.audience}</div>}
          </div>
        </div>
        <div>
          {(poster.sp1name || poster.sp1img) && (
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ fontFamily: bf, fontSize: 9, color: acc, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Speaker{poster.sp2name ? 's' : ''}</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <SpeakerCard img={poster.sp1img} name={poster.sp1name} title={poster.sp1title} alumni={poster.sp1alumni} accent={acc} df={df} bf={bf} />
                {poster.sp2name && <SpeakerCard img={poster.sp2img} name={poster.sp2name} title={poster.sp2title} alumni={poster.sp2alumni} accent={acc} df={df} bf={bf} />}
              </div>
            </div>
          )}
          <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
        </div>
      </div>
      <TaglineBar tagline={poster.tagline} reglink={poster.reglink} accent={acc} bf={bf} />
    </div>
  );
}

// ─────────────────────────────────────────────
// L3 — Band
// ─────────────────────────────────────────────
export function L3_Band({ poster, design, qrDataUrl }) {
  const { acc, df, bf, bg } = useLayoutProps({ poster, design, qrDataUrl });

  return (
    <div style={{ ...parse(bg), width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 7, background: acc }} />
      <div style={{ padding: '22px 28px 14px', display: 'flex', alignItems: 'center', gap: 14, marginTop: 7 }}>
        {poster.logoImg && <img src={poster.logoImg} alt="logo" style={{ height: 52, width: 52, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 4 }} />}
        <div>
          {poster.university && <div style={{ fontFamily: df, fontSize: 15, fontWeight: 700, color: '#fff' }}>{poster.university}</div>}
          {poster.dept       && <div style={{ fontFamily: bf, fontSize: 11, color: acc }}>{poster.dept}</div>}
          {poster.campus     && <div style={{ fontFamily: bf, fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{poster.campus}</div>}
        </div>
      </div>
      <div style={{ margin: '0 28px', padding: '12px 20px', background: acc, borderRadius: 8, textAlign: 'center' }}>
        <span style={{ fontFamily: bf, fontSize: 11, fontWeight: 700, color: '#000', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{poster.category}</span>
      </div>
      <div style={{ padding: '22px 28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
        {poster.title
          ? <div style={{ fontFamily: df, fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 8 }}>{poster.title}</div>
          : <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', fontFamily: 'Georgia' }}>Event Title</div>
        }
        {poster.subtitle && <div style={{ fontFamily: bf, fontSize: 13, color: acc, fontStyle: 'italic', marginBottom: 14 }}>{poster.subtitle}</div>}
        <div style={{ width: 60, height: 2, background: acc, margin: '12px auto' }} />
        <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 8, alignItems: 'center', margin: '0 auto' }}>
          {(poster.date || poster.time) && <div style={{ fontFamily: bf, fontSize: 13, color: '#fff', background: 'rgba(0,0,0,0.22)', padding: '6px 16px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)' }}>📅 {formatDate(poster.date)}{poster.date && poster.time ? ' · ' : ''}{formatTime(poster.time)}</div>}
          {poster.venue    && <div style={{ fontFamily: bf, fontSize: 12, color: '#fff', background: 'rgba(0,0,0,0.22)', padding: '6px 16px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)' }}>📍 {poster.venue}</div>}
          {poster.audience && <div style={{ fontFamily: bf, fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>For: {poster.audience}</div>}
        </div>
        <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
      </div>
      <SpeakerFooter poster={poster} accent={acc} bf={bf} df={df} />
      <div style={{ height: 7, background: acc }} />
    </div>
  );
}

// ─────────────────────────────────────────────
// L4 — Overlay
// ─────────────────────────────────────────────
export function L4_Overlay({ poster, design, qrDataUrl }) {
  const { acc, df, bf, bg } = useLayoutProps({ poster, design, qrDataUrl });

  return (
    <div style={{ ...parse(bg), width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      <div style={{ position: 'absolute', bottom: -70, right: -70, width: 300, height: 300, borderRadius: '50%', border: `50px solid ${acc}14` }} />
      <div style={{ position: 'absolute', top: -50, left: -50, width: 220, height: 220, borderRadius: '50%', border: `35px solid ${acc}10` }} />

      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
          {poster.logoImg && <img src={poster.logoImg} alt="logo" style={{ height: 48, width: 48, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 4 }} />}
          <div>
            {poster.university && <div style={{ fontFamily: df, fontSize: 14, fontWeight: 700, color: '#fff' }}>{poster.university}</div>}
            {poster.dept       && <div style={{ fontFamily: bf, fontSize: 10, color: acc }}>{poster.dept}</div>}
            {poster.campus     && <div style={{ fontFamily: bf, fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>{poster.campus}</div>}
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', margin: '0 auto 14px', border: `1.5px solid ${acc}`, padding: '4px 18px', borderRadius: 2 }}>
            <span style={{ fontFamily: bf, fontSize: 10, color: acc, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>{poster.category}</span>
          </div>
          {poster.title
            ? <div style={{ fontFamily: df, fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1.15, textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>{poster.title}</div>
            : <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', fontFamily: 'Georgia' }}>Event Title</div>
          }
          {poster.subtitle && <div style={{ fontFamily: bf, fontSize: 13, color: acc, fontStyle: 'italic', marginTop: 8 }}>{poster.subtitle}</div>}
          <div style={{ width: 50, height: 2, background: acc, margin: '16px auto' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, alignItems: 'center' }}>
            {(poster.date || poster.time) && <div style={{ fontFamily: bf, fontSize: 12, color: '#fff' }}>📅 {formatDate(poster.date)}{poster.date && poster.time ? ' · ' : ''}{formatTime(poster.time)}</div>}
            {poster.venue    && <div style={{ fontFamily: bf, fontSize: 12, color: '#fff' }}>📍 {poster.venue}</div>}
            {poster.audience && <div style={{ fontFamily: bf, fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>👥 {poster.audience}</div>}
          </div>
          <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
        </div>
        {(poster.sp1name || poster.sp1img) && (
          <div style={{ paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontFamily: bf, fontSize: 9, color: acc, letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 10 }}>Speaker{poster.sp2name ? 's' : ''}</div>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <SpeakerCard img={poster.sp1img} name={poster.sp1name} title={poster.sp1title} alumni={poster.sp1alumni} accent={acc} df={df} bf={bf} />
              {poster.sp2name && <SpeakerCard img={poster.sp2img} name={poster.sp2name} title={poster.sp2title} alumni={poster.sp2alumni} accent={acc} df={df} bf={bf} />}
            </div>
          </div>
        )}
        {poster.tagline && <div style={{ marginTop: 14, textAlign: 'center', fontFamily: bf, fontSize: 10, color: acc, fontStyle: 'italic' }}>{poster.tagline}</div>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// L5 — Minimal
// ─────────────────────────────────────────────
const CATEGORY_ICONS = { Workshop: '🛠', Seminar: '🎓', Hackathon: '💻', 'Competitive Exam': '🏆', Conference: '🌐', Webinar: '🖥', FDP: '📋', Symposium: '🎤', 'Skill Enhancement': '💡', 'Guest Lecture': '🎙' };

export function L5_Minimal({ poster, design, qrDataUrl }) {
  const { acc, df, bf, bg } = useLayoutProps({ poster, design, qrDataUrl });

  return (
    <div style={{ ...parse(bg), width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit' }}>
      <div style={{ padding: '32px 36px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {poster.logoImg && <img src={poster.logoImg} alt="logo" style={{ height: 42, width: 42, objectFit: 'contain', borderRadius: 4, background: '#fff', padding: 3 }} />}
            <div>
              {poster.university && <div style={{ fontFamily: df, fontSize: 13, fontWeight: 700, color: '#fff' }}>{poster.university}</div>}
              {poster.dept       && <div style={{ fontFamily: bf, fontSize: 10, color: acc }}>{poster.dept}</div>}
            </div>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: acc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>
            {CATEGORY_ICONS[poster.category] || '📚'}
          </div>
        </div>
        <div style={{ fontFamily: bf, fontSize: 10, color: acc, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>{poster.category}</div>
        {poster.title
          ? <div style={{ fontFamily: df, fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, borderLeft: `3px solid ${acc}`, paddingLeft: 14 }}>{poster.title}</div>
          : <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.2)', borderLeft: '3px solid rgba(255,255,255,0.1)', paddingLeft: 14, fontStyle: 'italic', fontFamily: 'Georgia' }}>Event Title</div>
        }
        {poster.subtitle && <div style={{ fontFamily: bf, fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 8, paddingLeft: 17, fontStyle: 'italic' }}>{poster.subtitle}</div>}
      </div>

      <div style={{ flex: 1, padding: '20px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ marginBottom: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {poster.date     && <InfoCard label="Date"   value={formatDate(poster.date)} acc={acc} bf={bf} />}
          {poster.time     && <InfoCard label="Time"   value={formatTime(poster.time)} acc={acc} bf={bf} />}
          {poster.venue    && <InfoCard label="Venue"  value={poster.venue}   acc={acc} bf={bf} span={2} />}
          {poster.audience && <InfoCard label="For"    value={poster.audience} acc={acc} bf={bf} span={2} />}
        </div>
        {(poster.sp1name || poster.sp1img) && (
          <div style={{ paddingTop: 14, borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <SpeakerCard img={poster.sp1img} name={poster.sp1name} title={poster.sp1title} alumni={poster.sp1alumni} accent={acc} df={df} bf={bf} />
              {poster.sp2name && <SpeakerCard img={poster.sp2img} name={poster.sp2name} title={poster.sp2title} alumni={poster.sp2alumni} accent={acc} df={df} bf={bf} />}
            </div>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 12 }}>
          {poster.campus ? <div style={{ fontFamily: bf, fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{poster.campus}{poster.tagline ? ' · ' + poster.tagline : ''}</div> : <div />}
          <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value, acc, bf, span }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 12px', gridColumn: span ? `span ${span}` : undefined }}>
      <div style={{ fontFamily: bf, fontSize: 9, color: acc, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
      <div style={{ fontFamily: bf, fontSize: 12, color: '#fff' }}>{value}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// L6 — Diagonal
// ─────────────────────────────────────────────
export function L6_Diagonal({ poster, design, qrDataUrl }) {
  const { acc, df, bf, g } = useLayoutProps({ poster, design, qrDataUrl });

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit', position: 'relative', overflow: 'hidden', background: g[0] }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '40%', background: `linear-gradient(135deg,${g[0]} 0%,${g[1]} 100%)`, transform: 'skewY(-6deg)', transformOrigin: 'top left' }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(170deg,transparent 45%,${g[2]} 100%)` }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '26px 28px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {poster.logoImg && <img src={poster.logoImg} alt="logo" style={{ height: 50, width: 50, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 4 }} />}
            <div>
              {poster.university && <div style={{ fontFamily: df, fontSize: 14, fontWeight: 700, color: '#fff', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>{poster.university}</div>}
              {poster.dept       && <div style={{ fontFamily: bf, fontSize: 10, color: acc, marginTop: 2 }}>{poster.dept}</div>}
            </div>
          </div>
          <div style={{ background: acc, padding: '4px 14px', borderRadius: 20, flexShrink: 0, marginTop: 4 }}>
            <span style={{ fontFamily: bf, fontSize: 10, fontWeight: 700, color: '#000', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{poster.category}</span>
          </div>
        </div>
        {poster.title
          ? <div style={{ fontFamily: df, fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 8, textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>{poster.title}</div>
          : <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', fontFamily: 'Georgia' }}>Event Title</div>
        }
        {poster.subtitle && <div style={{ fontFamily: bf, fontSize: 13, color: acc, fontStyle: 'italic', marginBottom: 14 }}>{poster.subtitle}</div>}
      </div>

      <div style={{ position: 'relative', zIndex: 1, flex: 1, padding: '16px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(poster.date || poster.time) && <div style={{ fontFamily: bf, fontSize: 12, color: '#fff' }}>📅 {formatDate(poster.date)}{poster.date && poster.time ? ' · ' : ''}{formatTime(poster.time)}</div>}
            {poster.venue    && <div style={{ fontFamily: bf, fontSize: 12, color: '#fff' }}>📍 {poster.venue}</div>}
            {poster.audience && <div style={{ fontFamily: bf, fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>👥 {poster.audience}</div>}
          </div>
        </div>
        {(poster.sp1name || poster.sp1img) && (
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            <SpeakerCard img={poster.sp1img} name={poster.sp1name} title={poster.sp1title} alumni={poster.sp1alumni} accent={acc} df={df} bf={bf} />
            {poster.sp2name && <SpeakerCard img={poster.sp2img} name={poster.sp2name} title={poster.sp2title} alumni={poster.sp2alumni} accent={acc} df={df} bf={bf} />}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 12 }}>
          {poster.campus ? <div style={{ fontFamily: bf, fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{poster.campus}</div> : <div />}
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
  const { acc, df, bf, bg } = useLayoutProps({ poster, design, qrDataUrl });
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
          {poster.logoImg && <img src={poster.logoImg} alt="logo" style={{ height: 58, width: 58, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 5, marginBottom: 8, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />}
          {poster.university && <div style={{ fontFamily: df, fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>{poster.university}</div>}
          {poster.dept       && <div style={{ fontFamily: bf, fontSize: 11, color: acc, marginTop: 2, letterSpacing: '0.05em' }}>{poster.dept}</div>}
          {poster.campus     && <div style={{ fontFamily: bf, fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{poster.campus}</div>}
          <div style={{ width: 80, height: 1, background: `${acc}55`, margin: '14px auto 0' }} />
        </div>
        <div style={{ textAlign: 'center', background: acc, padding: '5px 20px', margin: '0 auto 18px', borderRadius: 2, display: 'inline-block' }}>
          <span style={{ fontFamily: bf, fontSize: 11, fontWeight: 700, color: '#000', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{poster.category}</span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          {poster.title
            ? <div style={{ fontFamily: df, fontSize: 25, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 10 }}>{poster.title}</div>
            : <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', fontFamily: 'Georgia' }}>Event Title</div>
          }
          {poster.subtitle && <div style={{ fontFamily: bf, fontSize: 13, color: acc, fontStyle: 'italic', marginBottom: 14 }}>{poster.subtitle}</div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(poster.date || poster.time) && <div style={{ fontFamily: bf, fontSize: 12, color: '#fff' }}>📅 {formatDate(poster.date)}{poster.date && poster.time ? ' · ' : ''}{formatTime(poster.time)}</div>}
            {poster.venue    && <div style={{ fontFamily: bf, fontSize: 12, color: '#fff' }}>📍 {poster.venue}</div>}
            {poster.audience && <div style={{ fontFamily: bf, fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>👥 {poster.audience}</div>}
          </div>
          <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
        </div>
        {(poster.sp1name || poster.sp1img) && (
          <div style={{ paddingTop: 14, borderTop: `1px solid ${acc}30` }}>
            <div style={{ fontFamily: bf, fontSize: 9, color: acc, letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 10 }}>Speaker{poster.sp2name ? 's' : ''}</div>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <SpeakerCard img={poster.sp1img} name={poster.sp1name} title={poster.sp1title} alumni={poster.sp1alumni} accent={acc} df={df} bf={bf} />
              {poster.sp2name && <SpeakerCard img={poster.sp2img} name={poster.sp2name} title={poster.sp2title} alumni={poster.sp2alumni} accent={acc} df={df} bf={bf} />}
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
  const { acc, df, bf, bg } = useLayoutProps({ poster, design, qrDataUrl });

  return (
    <div style={{ ...parse(bg), width: '100%', height: '100%', display: 'flex', minHeight: 'inherit' }}>
      {/* Vertical accent bar */}
      <div style={{ width: 8, background: acc, flexShrink: 0, position: 'relative' }}>
        {[30, 50, undefined].map((top, i) => (
          <div key={i} style={{ position: 'absolute', top: top !== undefined ? top : undefined, bottom: top === undefined ? 30 : undefined, left: '50%', transform: 'translateX(-50%)', width: 16, height: 16, borderRadius: '50%', background: '#fff', border: `3px solid ${acc}` }} />
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 22px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          {poster.logoImg && <img src={poster.logoImg} alt="logo" style={{ height: 44, width: 44, objectFit: 'contain', borderRadius: 4, background: '#fff', padding: 3 }} />}
          <div>
            {poster.university && <div style={{ fontFamily: df, fontSize: 14, fontWeight: 700, color: '#fff' }}>{poster.university}</div>}
            {poster.dept       && <div style={{ fontFamily: bf, fontSize: 10, color: acc }}>{poster.dept}</div>}
            {poster.campus     && <div style={{ fontFamily: bf, fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>{poster.campus}</div>}
          </div>
        </div>
        <div style={{ background: acc, display: 'inline-block', padding: '4px 14px', borderRadius: 20, marginBottom: 14, alignSelf: 'flex-start' }}>
          <span style={{ fontFamily: bf, fontSize: 10, fontWeight: 700, color: '#000', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{poster.category}</span>
        </div>
        {poster.title
          ? <div style={{ fontFamily: df, fontSize: 24, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 6 }}>{poster.title}</div>
          : <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', fontFamily: 'Georgia' }}>Event Title</div>
        }
        {poster.subtitle && <div style={{ fontFamily: bf, fontSize: 12, color: acc, fontStyle: 'italic', marginBottom: 14 }}>{poster.subtitle}</div>}

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          {(poster.date || poster.time) && <TimelineCard icon="📅" label="Date & Time" value={`${formatDate(poster.date)}${poster.date && poster.time ? ' at ' : ''}${formatTime(poster.time)}`} acc={acc} bf={bf} />}
          {poster.venue    && <TimelineCard icon="📍" label="Venue"    value={poster.venue}   acc={acc} bf={bf} />}
          {poster.audience && <TimelineCard icon="👥" label="Audience" value={poster.audience} acc={acc} bf={bf} />}
        </div>

        {(poster.sp1name || poster.sp1img) && (
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontFamily: bf, fontSize: 9, color: acc, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Speaker{poster.sp2name ? 's' : ''}</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <SpeakerCard img={poster.sp1img} name={poster.sp1name} title={poster.sp1title} alumni={poster.sp1alumni} accent={acc} df={df} bf={bf} size={44} />
              {poster.sp2name && <SpeakerCard img={poster.sp2img} name={poster.sp2name} title={poster.sp2title} alumni={poster.sp2alumni} accent={acc} df={df} bf={bf} size={44} />}
            </div>
          </div>
        )}
        <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
      </div>
    </div>
  );
}

function TimelineCard({ icon, label, value, acc, bf }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(255,255,255,0.07)', borderRadius: 6, borderLeft: `3px solid ${acc}` }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <div>
        <div style={{ fontFamily: bf, fontSize: 9, color: acc, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
        <div style={{ fontFamily: bf, fontSize: 13, color: '#fff' }}>{value}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// L9 — Typographic
// ─────────────────────────────────────────────
export function L9_Typographic({ poster, design, qrDataUrl }) {
  const { acc, df, bf, g } = useLayoutProps({ poster, design, qrDataUrl });
  const ghostLetter = poster.category?.[0] || 'E';

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 'inherit', background: g[0], position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -60, right: -40, fontFamily: df, fontSize: 280, fontWeight: 900, color: acc, opacity: 0.06, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>{ghostLetter}</div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${acc},${acc}00)` }} />

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {poster.logoImg && <img src={poster.logoImg} alt="logo" style={{ height: 42, width: 42, objectFit: 'contain', borderRadius: 4, background: '#fff', padding: 3 }} />}
            <div>
              {poster.university && <div style={{ fontFamily: bf, fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{poster.university}</div>}
              {poster.dept       && <div style={{ fontFamily: bf, fontSize: 10, color: acc, marginTop: 1, letterSpacing: '0.04em' }}>{poster.dept}</div>}
            </div>
          </div>
          <div style={{ fontFamily: bf, fontSize: 10, color: acc, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', border: `1px solid ${acc}55`, padding: '4px 10px', borderRadius: 2 }}>{poster.category}</div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {poster.title
            ? <div style={{ fontFamily: df, fontSize: 34, fontWeight: 900, color: '#fff', lineHeight: 1.05, marginBottom: 12, letterSpacing: '-0.01em' }}>{poster.title}</div>
            : <div style={{ fontSize: 28, fontWeight: 900, color: 'rgba(255,255,255,0.15)', fontFamily: 'Georgia', lineHeight: 1.1 }}>EVENT TITLE</div>
          }
          {poster.subtitle && <div style={{ fontFamily: bf, fontSize: 14, color: acc, fontStyle: 'italic', marginBottom: 20, opacity: 0.9 }}>{poster.subtitle}</div>}
          <div style={{ height: 1, background: `linear-gradient(90deg,${acc},transparent)`, marginBottom: 20, width: '60%' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(poster.date || poster.time) && <TypoRow label="When"  value={`${formatDate(poster.date)}${poster.date && poster.time ? ' — ' : ''}${formatTime(poster.time)}`} acc={acc} bf={bf} />}
            {poster.venue    && <TypoRow label="Where" value={poster.venue}   acc={acc} bf={bf} />}
            {poster.audience && <TypoRow label="For"   value={poster.audience} acc={acc} bf={bf} dim />}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            {(poster.sp1name || poster.sp1img) && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontFamily: bf, fontSize: 9, color: acc, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Speaker{poster.sp2name ? 's' : ''}</div>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <SpeakerCard img={poster.sp1img} name={poster.sp1name} title={poster.sp1title} alumni={poster.sp1alumni} accent={acc} df={df} bf={bf} size={44} />
                  {poster.sp2name && <SpeakerCard img={poster.sp2img} name={poster.sp2name} title={poster.sp2title} alumni={poster.sp2alumni} accent={acc} df={df} bf={bf} size={44} />}
                </div>
              </div>
            )}
            {poster.campus && <div style={{ marginTop: 10, fontFamily: bf, fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{poster.campus}</div>}
          </div>
          <QRBlock showQR={poster.showQR} qrDataUrl={qrDataUrl} bf={bf} />
        </div>
      </div>
    </div>
  );
}

function TypoRow({ label, value, acc, bf, dim }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontFamily: bf, fontSize: 10, color: acc, letterSpacing: '0.1em', textTransform: 'uppercase', width: 40, flexShrink: 0 }}>{label}</span>
      <span style={{ fontFamily: bf, fontSize: 13, color: dim ? 'rgba(255,255,255,0.75)' : '#fff' }}>{value}</span>
    </div>
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
