import { UserDto } from '../../../../utils/api/dto/user.dto';
import styles from './share-list-user-card.module.css';
import { useNavigate } from '@tanstack/react-router';
import classNames from 'classnames';

export default function ShareListUserCard({ user, isSelected }: { user: UserDto; isSelected: boolean }) {
  const navigate = useNavigate();
  return (
    <div
      className={classNames(styles.shareListUserCard, isSelected && styles.selectedCard)}
      onClick={async () => {
        await navigate({ to: `/user/${user.id}` });
      }}
    >
      <p className={styles.shareListUserName}>{user.name}</p>
    </div>
  );
}
