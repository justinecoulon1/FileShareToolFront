import styles from '../../home-page/shared-files/shared-files-section.module.css';
import { ArrowBigLeft, RefreshCcw } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import UserSharedFilesContainer from '../user-shared-files-container/user-shared-files-container';
import { UserInfoDto } from '../../../utils/api/dto/user.dto';

export default function UserSharedFilesSection({
  userInfo,
  onRefresh,
}: {
  userInfo: UserInfoDto | undefined;
  onRefresh: () => void;
}) {
  const navigate = useNavigate();

  return (
    <div className={styles.sharedFilesSectionContainer}>
      <div className={styles.titleDiv}>
        <button
          onClick={async () => {
            await navigate({ to: `/` });
          }}
        >
          <ArrowBigLeft />
        </button>
        <h3>{userInfo?.user.name}</h3>
        <button onClick={() => onRefresh()}>
          <RefreshCcw />
        </button>
      </div>
      <div className={styles.sharedFilesSectionContentContainer}>
        <UserSharedFilesContainer userInfo={userInfo} />
      </div>
    </div>
  );
}
