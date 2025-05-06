import styles from './user-shared-files-container.module.css';
import { UserInfoDto } from '../../../utils/api/dto/user.dto';
import { SharedFileCard } from '../../shared-files/shared-files-card/shared-files-card';

export default function UserSharedFilesContainer({ userInfo }: { userInfo: UserInfoDto | undefined }) {
  return (
    <div className={styles.sharedFilesContainer}>
      {userInfo?.sharedFileInfos.map((file, index) => (
        <SharedFileCard key={`${file.name}-${index}`} file={file} isDownloadable={true} />
      ))}
    </div>
  );
}
