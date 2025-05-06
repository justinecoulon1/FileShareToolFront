import styles from './user-page.module.css';
import ShareList from '../home-page/share-list/share-list';
import { UserInfoDto } from '../../utils/api/dto/user.dto';
import UserSharedFilesSection from './user-shared-files-section/user-shared-files-section';

export default function UserPageContainer({
  userInfo,
  onRefresh = () => {},
}: {
  userInfo: UserInfoDto | undefined;
  onRefresh: () => void;
}) {
  return (
    <div className={styles.userPageContainer}>
      <ShareList selectedUserId={userInfo?.user.id} />
      <UserSharedFilesSection onRefresh={onRefresh} userInfo={userInfo} />
    </div>
  );
}
