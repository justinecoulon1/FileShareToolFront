import styles from './shared-files-container.module.css';
import { useEffect, useRef, useState } from 'react';
import { SerializableDirent } from '../../../../interface';
import { getFolderContent, haveFilesChanged, updateFileMap } from '../../../../utils/shared-files/shared-files';
import { UpdateSharedFileInfoDto } from '../../../../utils/api/dto/shared-file.dto';
import sharedFileService from '../../../../utils/api/services/shared-file.service';
import { SharedFileCard } from '../../../shared-files/shared-files-card/shared-files-card';

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
          byteSize: file.byteSize,
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
        <SharedFileCard key={`${file.name}-${index}`} file={file} isDownloadable={false} />
      ))}
    </div>
  );
}
