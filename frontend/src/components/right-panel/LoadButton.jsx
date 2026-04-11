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
  
  // Existing Store Selectors
  const savedPosters = usePosterStore((state) => state.savedPosters);
  const isFetchingPosters = usePosterStore((state) => state.isFetchingPosters);
  const isLoadingPoster = usePosterStore((state) => state.isLoadingPoster);
  const savedPostersError = usePosterStore((state) => state.savedPostersError);
  const hasUnsavedChanges = usePosterStore((state) => state.hasUnsavedChanges);
  const fetchSavedPosters = usePosterStore((state) => state.fetchSavedPosters);
  const loadPosterById = usePosterStore((state) => state.loadPosterById);
  
  // New Store Selectors
  const renameSavedPoster = usePosterStore((state) => state.renameSavedPoster);
  const deleteSavedPoster = usePosterStore((state) => state.deleteSavedPoster);

  // Local UI State
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitleText, setEditTitleText] = useState('');

  useEffect(() => {
    if (!isOpen || !isSignedIn || !isLoaded) return;

    (async () => {
      const token = await getToken();
      if (!token) {
        console.log("Token not ready yet");
        return;
      }
      await fetchSavedPosters(token);
    })();
  }, [isOpen, isSignedIn, isLoaded, getToken, fetchSavedPosters]);

  const handleLoad = async (posterId) => {
    // Prevent loading if they are currently trying to edit this item
    if (editingId === posterId) return;

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

  const startEditing = (poster) => {
    setEditingId(poster._id);
    setEditTitleText(poster.title);
  };

  const handleSaveTitle = async (posterId) => {
    if (!editTitleText.trim()) return;
    const token = await getToken();
    if (!token) return;

    const success = await renameSavedPoster(posterId, editTitleText, token);
    if (success) {
      setEditingId(null);
    }
  };

  const handleDelete = async (posterId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this poster? This cannot be undone.');
    if (!confirmDelete) return;

    const token = await getToken();
    if (!token) return;

    await deleteSavedPoster(posterId, token);
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
                  // Changed from <button> to <div> to allow nested inputs/buttons
                  <div
                    key={poster._id}
                    className={styles.savedPosterItem}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'default' }}
                  >
                    
                    {/* LEFT SIDE: Info or Edit Input */}
                    <div 
                       style={{ flex: 1, cursor: 'pointer' }} 
                       onClick={() => handleLoad(poster._id)}
                    >
                      {editingId === poster._id ? (
                        <div onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="text"
                            value={editTitleText}
                            onChange={(e) => setEditTitleText(e.target.value)}
                            autoFocus
                            className={styles.editInputStyle}
                          />
                        </div>
                      ) : (
                        <>
                          <div className={styles.savedPosterName}>{poster.title}</div>
                          <div className={styles.savedPosterMeta}>
                            {poster.category || 'General'} · Updated {formatTimestamp(poster.updatedAt)}
                          </div>
                        </>
                      )}
                    </div>

                    {/* RIGHT SIDE: Action Buttons */}
                    <div style={{ display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
                      {editingId === poster._id ? (
                        <>
                          <Button variant="ghost" onClick={() => handleSaveTitle(poster._id)}>Save</Button>
                          <Button variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                        </>
                      ) : (
                        <>
                          <Button variant="ghost" onClick={() => startEditing(poster)}>Edit</Button>
                          <Button variant="ghost" style={{ color: '#ff4d4f' }} onClick={() => handleDelete(poster._id)}>Delete</Button>
                        </>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}