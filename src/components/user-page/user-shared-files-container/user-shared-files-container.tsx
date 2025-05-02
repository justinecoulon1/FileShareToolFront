import styles from './user-shared-files-container.module.css';
import { Download } from 'lucide-react';
import { UserInfoDto } from '../../../utils/api/dto/user.dto';
import { SharedFileInfoDto } from '../../../utils/api/dto/shared-file.dto';

export default function UserSharedFilesContainer({ userInfo }: { userInfo: UserInfoDto | undefined }) {
  return (
    <div className={styles.sharedFilesContainer}>
      {userInfo?.sharedFileInfos.map((file, index) => <SharedFileCards key={`${file.name}-${index}`} file={file} />)}
    </div>
  );
}

function SharedFileCards({ file }: { file: SharedFileInfoDto }) {
  return (
    <div className={styles.sharedFileCards}>
      <p className={styles.sharedFileCardName}>{file.name}</p>
      <div className={styles.sharedFileCardInfo}>
        <p className={styles.sharedFileCardSize}>{((file.byteSize) / (1024 * 1000)).toFixed(3)}</p>
        <button className={styles.sharedFileCardDownload}><Download /></button>
      </div>
    </div>
  );
}