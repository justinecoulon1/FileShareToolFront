import { SerializableDirent } from '../../../interface';
import styles from './shared-files-card.module.css';
import { formatFileSize } from '../../../utils/shared-files/shared-files';
import { SharedFileInfoDto } from '../../../utils/api/dto/shared-file.dto';
import { Download } from 'lucide-react';

export function SharedFileCard({
  file,
  isDownloadable,
}: {
  file: SerializableDirent | SharedFileInfoDto;
  isDownloadable: boolean;
}) {
  return (
    <div className={styles.sharedFileCards}>
      <p className={styles.sharedFileCardName}>{file.name}</p>
      <div className={styles.sharedFileCardInfo}>
        <p className={styles.sharedFileCardSize}>{formatFileSize(file.byteSize)}</p>
        {isDownloadable && (
          <button className={styles.sharedFileCardDownload}>
            <Download />
          </button>
        )}
      </div>
    </div>
  );
}
