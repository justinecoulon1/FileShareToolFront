import type { SerializableDirent } from '../../../interface.d.ts';
import styles from './shared-files-card.module.css';
import { formatFileSize } from '../../../utils/shared-files/shared-files';
import { SharedFileInfoDto } from '../../../utils/api/dto/shared-file.dto';
import { Download } from 'lucide-react';

export function SharedFileCard({
  file,
  isDownloadable,
  onDownloadButtonClicked = () => {},
}: {
  file: SerializableDirent | SharedFileInfoDto;
  isDownloadable: boolean;
  onDownloadButtonClicked?: () => void;
}) {
  return (
    <div className={styles.sharedFileCards}>
      <p className={styles.sharedFileCardName}>{file.name}</p>
      <div className={styles.sharedFileCardInfo}>
        <p className={styles.sharedFileCardSize}>{formatFileSize(file.byteSize)}</p>
        {isDownloadable && (
          <button className={styles.sharedFileCardDownload} onClick={onDownloadButtonClicked}>
            <Download />
          </button>
        )}
      </div>
    </div>
  );
}
