import styles from './shared-files-container.module.css';
import { useEffect, useRef, useState } from 'react';
import { SerializableDirent } from '../../../../interface';
import { getFolderContent, haveFilesChanged, updateFileMap } from '../../../../utils/shared-files/shared-files';
import { UpdateSharedFileInfoDto } from '../../../../utils/api/dto/shared-file.dto';
import sharedFileService from '../../../../utils/api/services/shared-file.service';

export default function SharedFilesContainer({ refreshFlag }: { refreshFlag: boolean }) {
  const fileMapRef = useRef(new Map<string, SerializableDirent>());
  const [files, setFiles] = useState<SerializableDirent[]>([]);

  useEffect(() => {
    const checkFiles = async () => {
      const newFiles = getFolderContent();
      const currentMap = fileMapRef.current;

      if (haveFilesChanged(currentMap, newFiles)) {
        const updatedSharedFileInfoDto: UpdateSharedFileInfoDto[] = newFiles.map((file) => ({
          name: file.name,
          byteSize: file.fileSize,
        }));
        await sharedFileService.updateUserSharedFileInfo({ updatedSharedFileInfoDto });
        updateFileMap(currentMap, newFiles);
        setFiles(Array.from(currentMap.values()));
      }
    };

    checkFiles();

    const intervalId = setInterval(checkFiles, 300_000);
    return () => clearInterval(intervalId);
  }, [refreshFlag]);

  return (
    <div className={styles.sharedFilesContainer}>
      {files.map((file, index) => (
        <SharedFileCards key={`${file.name}-${index}`} file={file} />
      ))}
    </div>
  );
}

function SharedFileCards({ file }: { file: SerializableDirent }) {
  return (
    <div className={styles.sharedFileCards}>
      <p className={styles.sharedFileCardName}>{file.name}</p>
      <div className={styles.sharedFileCardInfo}>
        <p className={styles.sharedFileCardSize}>{(file.fileSize / (1024 * 1000)).toFixed(3)}</p>
      </div>
    </div>
  );
}
