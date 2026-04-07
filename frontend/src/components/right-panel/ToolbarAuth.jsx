import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { Button } from '../UI';
import styles from '../RightPanel.module.css';

export default function ToolbarAuth() {
  const { user } = useUser();
  const displayName = user?.firstName || user?.username || user?.primaryEmailAddress?.emailAddress || 'Signed in';

  return (
    <div className={styles.authDock}>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="primary" className={styles.authActionButton}>
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <div className={styles.authSignedIn}>
          <div className={styles.authIdentity}>
            <div className={styles.authCaption}>Connected</div>
            <div className={styles.authName}>{displayName}</div>
          </div>
          <UserButton afterSignOutUrl="/" />
          <SignOutButton>
            <Button variant="ghost" className={styles.signOutButton}>
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </SignedIn>
    </div>
  );
}
