import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LANDING_POSTER_PRESETS,
  LAYOUT_NAMES,
  POSTER_SIZES,
} from '../../constants';
import { getPosterMetrics } from '../../utils';
import { PosterPreview } from '../poster/PosterPreview';
import { Button } from '../UI';
import styles from './LandingPage.module.css';

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[styles.reveal, isVisible && styles.revealVisible, className]
        .filter(Boolean)
        .join(' ')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function useCompactGallery() {
  const [isCompact, setIsCompact] = useState(() =>
    typeof window === 'undefined' ? false : window.innerWidth <= 900
  );

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia('(max-width: 900px)');
    const updateMatch = (event) => setIsCompact(event.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMatch);
      return () => mediaQuery.removeEventListener('change', updateMatch);
    }

    mediaQuery.addListener(updateMatch);
    return () => mediaQuery.removeListener(updateMatch);
  }, []);

  return isCompact;
}

function IconSpark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 14.7 8.3 21 11l-6.3 2.7L12 20l-2.7-6.3L3 11l6.3-2.7Z" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 3 8l9 5 9-5-9-5Zm0 8.5L3 7v4.5L12 16l9-4.5V7l-9 4.5Zm0 5L3 12v4.5L12 21l9-4.5V12l-9 4.5Z" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 3a3 3 0 1 0 2.82 4H20l-8 4.1a3 3 0 0 0-1.9-.68 3 3 0 1 0 1.89 5.32L20 19.9h-.18A3 3 0 1 0 17 17a3 3 0 0 0 .08.67l-8.05-4.05A3.1 3.1 0 0 0 9.1 12c0-.57-.16-1.1-.43-1.56l8.08-4.06A3 3 0 0 0 17 7a3 3 0 0 0 0-4Z" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.29 1.4 1.4-4.7 4.7-4.7-4.7 1.4-1.4L11 12.59V4a1 1 0 0 1 1-1Zm-7 14h14v3H5v-3Z" />
    </svg>
  );
}

function IconWand() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m14.7 4.3 5 5-1.4 1.4-5-5 1.4-1.4ZM3 21l6.9-1.6L20.1 9.2l-5.3-5.3L4.6 14.1 3 21Zm11.1-8.7 1.4 1.4" />
    </svg>
  );
}

const FEATURE_CARDS = [
  {
    title: 'Instant poster composition',
    description: 'Jump from a blank canvas to a polished event layout in a few edits.',
    accent: '#8B5CF6',
    wash: 'rgba(139, 92, 246, 0.16)',
    Icon: IconSpark,
  },
  {
    title: 'Template range built in',
    description: 'Switch between editorial, minimal, timeline, diagonal, and more without starting over.',
    accent: '#F97316',
    wash: 'rgba(249, 115, 22, 0.14)',
    Icon: IconLayers,
  },
  {
    title: 'Export-ready outputs',
    description: 'Download clean PNG, JPEG, or PDF versions for screens, print boards, and messaging.',
    accent: '#14B8A6',
    wash: 'rgba(20, 184, 166, 0.16)',
    Icon: IconDownload,
  },
  {
    title: 'Sharing flows included',
    description: 'Print, share files, and keep cloud save available whenever the user chooses to sign in.',
    accent: '#0EA5E9',
    wash: 'rgba(14, 165, 233, 0.16)',
    Icon: IconShare,
  },
  {
    title: 'Friendly editing controls',
    description: 'The editor is tuned for quick academic poster work, not a heavyweight design workflow.',
    accent: '#EC4899',
    wash: 'rgba(236, 72, 153, 0.16)',
    Icon: IconWand,
  },
  {
    title: 'Built for campus events',
    description: 'Workshop, webinar, symposium, and hackathon flows already map to the current templates.',
    accent: '#22C55E',
    wash: 'rgba(34, 197, 94, 0.16)',
    Icon: IconSpark,
  },
];

function PosterFrame({ poster, design, maxWidth, maxHeight }) {
  const { w, h } = getPosterMetrics(design.size);
  const scale = Math.min(maxWidth / w, maxHeight / h, 1);

  return (
    <div
      className={styles.posterViewport}
      style={{
        width: Math.round(w * scale),
        height: Math.round(h * scale),
      }}
    >
      <div
        className={styles.posterCanvas}
        style={{
          width: w,
          height: h,
          transform: `scale(${scale})`,
        }}
      >
        <PosterPreview poster={poster} design={design} />
      </div>
    </div>
  );
}

function FeatureCard({ feature, delay }) {
  const { Icon } = feature;

  return (
    <Reveal delay={delay}>
      <article className={styles.featureCard}>
        <div
          className={styles.featureIcon}
          style={{
            color: feature.accent,
            background: feature.wash,
          }}
        >
          <Icon />
        </div>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </article>
    </Reveal>
  );
}

function GalleryModal({ preset, onClose, onLaunch }) {
  const sizeLabel = POSTER_SIZES[preset.design.size]?.label || 'Custom size';

  return (
    <div className={styles.lightboxBackdrop} onClick={onClose}>
      <div className={styles.lightboxCard} onClick={(event) => event.stopPropagation()}>
        <button className={styles.lightboxClose} onClick={onClose} aria-label="Close poster preview">
          ×
        </button>
        <div className={styles.lightboxPreview}>
          <PosterFrame
            poster={preset.poster}
            design={preset.design}
            maxWidth={880}
            maxHeight={700}
          />
        </div>
        <div className={styles.lightboxMeta}>
          <div>
            <span className={styles.sectionTag}>{preset.kicker}</span>
            <h3>{preset.poster.title}</h3>
            <p>{preset.description}</p>
          </div>
          <div className={styles.lightboxFacts}>
            <span>{LAYOUT_NAMES[preset.design.layout]} layout</span>
            <span>{sizeLabel}</span>
            <span>{preset.poster.venue}</span>
          </div>
          <Button
            variant="primary"
            className={styles.primaryAction}
            onClick={() => onLaunch()}
          >
            Open Editor
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const isCompact = useCompactGallery();
  const [activePosterId, setActivePosterId] = useState(null);

  const activePreset =
    LANDING_POSTER_PRESETS.find((preset) => preset.id === activePosterId) || null;

  const launchEditor = () => navigate('/editor');
  const jumpToGallery = () =>
    document.getElementById('sample-posters')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroGlowA} />
          <div className={styles.heroGlowB} />

          <div className={styles.heroInner}>
            <Reveal className={styles.heroIntro}>
              <div className={styles.brandRow}>
                <div className={styles.brandMark}>PS</div>
                <div>
                  <div className={styles.brandName}>Poster Studio</div>
                  <div className={styles.brandSubhead}>Academic event posters with less setup and more momentum.</div>
                </div>
              </div>

              <span className={styles.heroBadge}>Built for teachers, clubs, and student teams</span>
              <h1 className={styles.heroTitle}>
                Launch polished event posters without a sign-in wall.
              </h1>
              <p className={styles.heroCopy}>
                Use the platform immediately, explore template directions, and save to the cloud only when you actually need an account.
              </p>

              <div className={styles.heroActions}>
                <Button variant="primary" className={styles.primaryAction} onClick={launchEditor}>
                  Get Started
                </Button>
                <Button variant="ghost" className={styles.secondaryAction} onClick={jumpToGallery}>
                  View sample posters
                </Button>
              </div>

              <div className={styles.heroStats}>
                <div>
                  <strong>10</strong>
                  <span>layout directions</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>export formats</span>
                </div>
                <div>
                  <strong>0</strong>
                  <span>login prompts on entry</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className={styles.heroPanel}>
              <div className={styles.heroPanelCard}>
                <div className={styles.heroPanelHeader}>
                  <span className={styles.sectionTag}>Direct access</span>
                  <span className={styles.heroPanelNote}>Route: /editor</span>
                </div>
                <div className={styles.heroChecklist}>
                  <div>Open the editor instantly</div>
                  <div>Customize templates live</div>
                  <div>Sign in only for cloud save and load</div>
                </div>
                <div className={styles.heroPreviewRail}>
                  {LANDING_POSTER_PRESETS.slice(0, 3).map((preset) => (
                    <div key={preset.id} className={styles.heroMiniPoster}>
                      <PosterFrame
                        poster={preset.poster}
                        design={preset.design}
                        maxWidth={140}
                        maxHeight={180}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <Reveal>
              <span className={styles.sectionTag}>Why it works</span>
              <h2>Everything needed for fast campus poster production</h2>
              <p>
                The landing experience stays lightweight, while the editor keeps the current remix, export, and account-aware save flow intact.
              </p>
            </Reveal>
          </div>

          <div className={styles.featuresGrid}>
            {FEATURE_CARDS.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} delay={index * 70} />
            ))}
          </div>
        </section>

        <section className={styles.gallerySection} id="sample-posters">
          <div className={styles.sectionHeader}>
            <Reveal>
              <span className={styles.sectionTag}>Generated on the platform</span>
              <h2>Sample posters pulled from the actual renderer</h2>
              <p>
                These are curated presets built from the same poster state and layout system the editor uses today.
              </p>
            </Reveal>
          </div>

          {isCompact ? (
            <div className={styles.galleryRow}>
              {LANDING_POSTER_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={styles.posterCard}
                  onClick={() => setActivePosterId(preset.id)}
                >
                  <div className={styles.posterCardPreview}>
                    <PosterFrame
                      poster={preset.poster}
                      design={preset.design}
                      maxWidth={260}
                      maxHeight={330}
                    />
                  </div>
                  <div className={styles.posterCardMeta}>
                    <span>{preset.kicker}</span>
                    <strong>{preset.poster.title}</strong>
                    <small>{LAYOUT_NAMES[preset.design.layout]} layout</small>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className={styles.galleryDeck}>
              {LANDING_POSTER_PRESETS.map((preset, index, presets) => {
                const spread = index - (presets.length - 1) / 2;
                const rotate = spread * 8;
                const translateX = spread * 154;
                const translateY = Math.abs(spread) * 18;
                const zIndex = presets.length - Math.abs(Math.round(spread));

                return (
                  <button
                    key={preset.id}
                    type="button"
                    className={styles.posterStack}
                    style={{
                      '--stack-transform': `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
                      zIndex,
                    }}
                    onClick={() => setActivePosterId(preset.id)}
                  >
                    <div className={styles.posterCardPreview}>
                      <PosterFrame
                        poster={preset.poster}
                        design={preset.design}
                        maxWidth={250}
                        maxHeight={320}
                      />
                    </div>
                    <div className={styles.posterCardMeta}>
                      <span>{preset.kicker}</span>
                      <strong>{preset.poster.title}</strong>
                      <small>{LAYOUT_NAMES[preset.design.layout]} layout</small>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <Reveal delay={160}>
            <div className={styles.galleryFootnote}>
              Click any sample to inspect it larger, then jump straight into the editor.
            </div>
          </Reveal>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaGlow} />
          <Reveal className={styles.ctaCard}>
            <span className={styles.sectionTag}>Start immediately</span>
            <h2>Open the platform first. Sign in later if you want cloud save.</h2>
            <p>
              The landing flow removes the auth detour and keeps the editor available from the first click.
            </p>
            <Button variant="primary" className={styles.primaryAction} onClick={launchEditor}>
              Get Started
            </Button>
          </Reveal>
        </section>
      </main>

      {activePreset && (
        <GalleryModal
          preset={activePreset}
          onClose={() => setActivePosterId(null)}
          onLaunch={launchEditor}
        />
      )}
    </>
  );
}
