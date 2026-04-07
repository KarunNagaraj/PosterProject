import { usePosterEffects } from './hooks/usePosterEffects';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import styles from './App.module.css';

export default function App() {
  usePosterEffects();

  return (
    <div className={styles.app}>
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
