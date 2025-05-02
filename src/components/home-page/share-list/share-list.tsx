import styles from './share-list.module.css';
import { Unplug } from 'lucide-react';
import userService from '../../../utils/api/services/user.service';
import { useRouter } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import ShareListUserCard from './share-list-user-card/share-list-user-card';

const POLL_INTERVAL_MS = 0.5 * 60 * 1000;

export default function ShareList() {
  const router = useRouter();
  const { data, error, isLoading } = useQuery({
    queryKey: ['user-data'],
    queryFn: () => userService.getAllConnectedUsers(),
    refetchInterval: POLL_INTERVAL_MS,
    refetchIntervalInBackground: true,
  });
  return (
    <div className={styles.sharedListContainer}>
      <div className={styles.titleDiv}>
        <h3>USERS</h3>
        <button
          onClick={() => {
            userService.logout();
            router.navigate({ to: '/auth' });
          }}
        >
          <Unplug />
        </button>
      </div>
      <div className={styles.usersListDiv}>
        {!isLoading && data && data.map(d => <ShareListUserCard key={`userListCard-${d.id}`} user={d} />)}
      </div>
    </div>
  );
}
