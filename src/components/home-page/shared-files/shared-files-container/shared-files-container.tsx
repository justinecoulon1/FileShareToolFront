import styles from './shared-files-container.module.css';
import { useEffect, useRef, useState } from 'react';
import { SerializableDirent } from '../../../../interface';
import { getFolderContent, haveFilesChanged, updateFileMap } from '../../../../utils/shared-files/shared-files';
import { UpdateSharedFileInfoDto } from '../../../../utils/api/dto/shared-file.dto';
import sharedFileService from '../../../../utils/api/services/shared-file.service';

export default function SharedFilesContainer() {
  const fileMapRef = useRef(new Map<string, SerializableDirent>());
  const [files, setFiles] = useState<SerializableDirent[]>([]);

  useEffect(() => {
    const checkFiles = async () => {
      const newFiles = getFolderContent();
      const currentMap = fileMapRef.current;

      if (haveFilesChanged(currentMap, newFiles)) {
        const updatedSharedFileInfoDto: UpdateSharedFileInfoDto[] = newFiles.map(file => ({
          name: file.name,
          byteSize: file.fileSize,
        }));
        await sharedFileService.updateUserSharedFileInfo({ updatedSharedFileInfoDto });
        updateFileMap(currentMap, newFiles);
        setFiles(Array.from(currentMap.values()));
      }
    };

    checkFiles();

    const intervalId = setInterval(checkFiles, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.sharedFilesContainer}>
      {files.map((file, index) => <p
        key={`${file.name}-${index}`}>{file.name} - {((file.fileSize) / (1024 * 1000)).toFixed(3)}</p>)}
    </div>
  );
}