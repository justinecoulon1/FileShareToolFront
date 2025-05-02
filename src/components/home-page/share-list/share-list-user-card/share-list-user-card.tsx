import { UserDto } from '../../../../utils/api/dto/user.dto';
import styles from './share-list-user-card.module.css';
import { useNavigate } from '@tanstack/react-router';

export default function ShareListUserCard({ user }: { user: UserDto }) {
  const navigate = useNavigate();
  return (
    <div className={styles.shareListUserCard} onClick={async () => {
      await navigate({ to: `/user/${user.id}` });
    }}>
      <p className={styles.shareListUserName}>{user.name}</p>
    </div>
  );
}