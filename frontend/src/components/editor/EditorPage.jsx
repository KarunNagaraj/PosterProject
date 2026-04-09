import LeftPanel from '../LeftPanel';
import RightPanel from '../RightPanel';
import styles from './EditorPage.module.css';

export default function EditorPage() {
  return (
    <div className={styles.app}>
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
