import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { usePosterStore } from '../store/usePosterStore';
import HeaderTab from './tabs/HeaderTab';
import EventTab from './tabs/EventTab';
import SpeakerTab from './tabs/SpeakerTab';
import DesignTab from './tabs/DesignTab';
import styles from './LeftPanel.module.css';

const TABS = ['Header', 'Event', 'Speaker', 'Design'];

export default function LeftPanel() {
  const [activeTab, setActiveTab] = useState('Header');
  const { isDark, toggleTheme } = usePosterStore(
    useShallow((state) => ({
      isDark: state.isDark,
      toggleTheme: state.toggleTheme,
    }))
  );

  return (
    <aside className={styles.panel}>
      {/* ── Top bar ── */}
      <div className={styles.topBar}>
        <div className={styles.appLogo}>
          Poster<span className={styles.accent}>Studio</span>
        </div>
        <button className={styles.themeToggle} onClick={toggleTheme}>
          {isDark ? '☀ Light' : '🌙 Dark'}
        </button>
      </div>

      {/* ── Tab bar ── */}
      <div className={styles.tabBar}>
        {TABS.map(t => (
          <button
            key={t}
            className={[styles.tab, activeTab === t && styles.tabActive].filter(Boolean).join(' ')}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab body ── */}
      <div className={styles.body}>
        {activeTab === 'Header' && <HeaderTab />}
        {activeTab === 'Event' && <EventTab />}
        {activeTab === 'Speaker' && <SpeakerTab />}
        {activeTab === 'Design' && <DesignTab />}
      </div>
    </aside>
  );
}
