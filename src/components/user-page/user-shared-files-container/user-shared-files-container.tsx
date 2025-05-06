import styles from './user-shared-files-container.module.css';
import { UserInfoDto } from '../../../utils/api/dto/user.dto';
import { SharedFileCard } from '../../shared-files/shared-files-card/shared-files-card';
import { ClientRequestDownloadFileSocketMessage, SocketMessageTypes } from '../../../utils/api/dto/socket.dto';

export default function UserSharedFilesContainer({ userInfo }: { userInfo: UserInfoDto | undefined }) {
  return (
    <div className={styles.sharedFilesContainer}>
      {userInfo?.sharedFileInfos.map((file, index) => (
        <SharedFileCard
          key={`${file.name}-${index}`}
          file={file}
          isDownloadable={true}
          onDownloadButtonClicked={() => {
            const message: ClientRequestDownloadFileSocketMessage = {
              type: SocketMessageTypes.REQUEST_FILE,
              messageContent: {
                sharedFileId: file.id,
                userId: userInfo?.user.id,
              },
            };
            window.electronAPI.sendSocketMessage(message);
          }}
        />
      ))}
    </div>
  );
}
