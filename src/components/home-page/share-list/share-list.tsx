import styles from './share-list.module.css';
import { Power, RefreshCcw } from 'lucide-react';
import userService from '../../../utils/api/services/user.service';
import { useRouter } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import ShareListUserCard from './share-list-user-card/share-list-user-card';
import { useEffect } from 'react';
import { getLocalStorageItem } from '../../../utils/local-storage/local-storage.utils';

const POLL_INTERVAL_MS = 0.5 * 60 * 1000;

export default function ShareList({ selectedUserId }: { selectedUserId?: number }) {
  const router = useRouter();
  const currentUser = getLocalStorageItem('user');
  const {
    data: users,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['user-data'],
    queryFn: () => userService.getAllConnectedUsers(),
    refetchInterval: POLL_INTERVAL_MS,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (!window.electronAPI.isSocketConnected()) {
      window.electronAPI.connectWebSocket();
      window.addEventListener('ws-open', () => {
        refetch();
      });
    }
  }, []);

  return (
    <div className={styles.sharedListContainer}>
      <div className={styles.titleDiv}>
        <h3>USERS</h3>
        <div className={styles.buttonsDiv}>
          <button
            onClick={() => {
              refetch();
            }}
          >
            <RefreshCcw />
          </button>
          <button
            onClick={() => {
              userService.logout();
              router.navigate({ to: '/auth' });
            }}
          >
            <Power color={'#ff4b4b'} />
          </button>
        </div>
      </div>
      <div className={styles.usersListDiv}>
        {!isLoading &&
          users &&
          users
            .filter((user) => user.id !== currentUser?.id)
            .map((user) => (
              <ShareListUserCard key={`userListCard-${user.id}`} user={user} isSelected={selectedUserId === user.id} />
            ))}
      </div>
    </div>
  );
}
