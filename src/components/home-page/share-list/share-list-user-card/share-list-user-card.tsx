import { UserDto } from '../../../../utils/api/dto/user.dto';
import styles from './share-list-user-card.module.css';

export default function ShareListUserCard({ user }: { user: UserDto }) {
  return (
    <div className={styles.shareListUserCard}>
      <p className={styles.shareListUserName}>{user.name}</p>
    </div>
  );
}