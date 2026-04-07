import { useEffect, useState } from 'react';
import { SignInButton, useAuth } from '@clerk/clerk-react';
import { usePosterStore } from '../../store/usePosterStore';
import { Button } from '../UI';
import styles from '../RightPanel.module.css';

function formatTimestamp(value) {
  if (!value) return 'Unknown update';
  return new Date(value).toLocaleString();
}

export default function LoadButton() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const savedPosters = usePosterStore((state) => state.savedPosters);
  const isFetchingPosters = usePosterStore((state) => state.isFetchingPosters);
  const isLoadingPoster = usePosterStore((state) => state.isLoadingPoster);
  const savedPostersError = usePosterStore((state) => state.savedPostersError);
  const hasUnsavedChanges = usePosterStore((state) => state.hasUnsavedChanges);
  const fetchSavedPosters = usePosterStore((state) => state.fetchSavedPosters);
  const loadPosterById = usePosterStore((state) => state.loadPosterById);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen || !isSignedIn) return;

    (async () => {
      const token = await getToken();
      if (token) {
        await fetchSavedPosters(token);
      }
    })();
  }, [isOpen, isSignedIn, getToken, fetchSavedPosters]);

  const handleLoad = async (posterId) => {
    if (hasUnsavedChanges) {
      const shouldReplace = window.confirm(
        'Loading a saved poster will replace your current unsaved changes. Continue?'
      );

      if (!shouldReplace) return;
    }

    const token = await getToken();
    if (!token) return;

    const loaded = await loadPosterById(posterId, token);
    if (loaded) {
      setIsOpen(false);
    }
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
        <Button variant="ghost" className={styles.actionButton}>
          Load
        </Button>
      </SignInButton>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        className={[styles.actionButton, styles.loadButton].join(' ')}
        onClick={() => setIsOpen(true)}
      >
        Load
      </Button>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modalCard} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <div className={styles.modalTitle}>Saved Posters</div>
                <div className={styles.previewHint}>
                  Choose a poster to load into the editor.
                </div>
              </div>
              <Button
                variant="ghost"
                className={styles.actionButton}
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>

            {isFetchingPosters && (
              <div className={styles.emptyState}>Loading your saved posters...</div>
            )}

            {!isFetchingPosters && savedPostersError && (
              <div className={styles.errorState}>{savedPostersError}</div>
            )}

            {!isFetchingPosters && !savedPostersError && savedPosters.length === 0 && (
              <div className={styles.emptyState}>You have no saved posters yet.</div>
            )}

            {!isFetchingPosters && !savedPostersError && savedPosters.length > 0 && (
              <div className={styles.savedPosterList}>
                {savedPosters.map((poster) => (
                  <button
                    key={poster._id}
                    className={styles.savedPosterItem}
                    onClick={() => handleLoad(poster._id)}
                    disabled={isLoadingPoster}
                  >
                    <div className={styles.savedPosterName}>{poster.title}</div>
                    <div className={styles.savedPosterMeta}>
                      {poster.category || 'General'} · Updated {formatTimestamp(poster.updatedAt)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
