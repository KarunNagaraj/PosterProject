import { SignInButton, useAuth } from '@clerk/clerk-react';
import { usePosterStore } from '../../store/usePosterStore';
import { Button } from '../UI';
import styles from '../RightPanel.module.css';

export default function SaveButton() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const savePosterToCloud = usePosterStore((state) => state.savePosterToCloud);
  const isSaving = usePosterStore((state) => state.isSaving);

  const handleSave = async () => {
    if (!isSignedIn) {
      alert("Please sign in to save your designs.");
      return;
    }
    
    // Grab the active session token from Clerk
    const token = await getToken();
    
    // Fire off the Zustand action with the token
    await savePosterToCloud(token);
  };

  if (!isLoaded) {
    return (
      <Button variant="ghost" className={styles.actionButton} disabled>
        Loading...
      </Button>
    );
  }

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <Button variant="primary" className={styles.actionButton}>
          Save to Cloud
        </Button>
      </SignInButton>
    );
  }

  return (
    <Button
      onClick={handleSave} 
      disabled={isSaving}
      variant="primary"
      className={[styles.actionButton, styles.saveButton].join(' ')}
    >
      {isSaving ? 'Saving...' : 'Save to Cloud'}
    </Button>
  );
}
