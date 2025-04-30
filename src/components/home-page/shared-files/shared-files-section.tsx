import styles from './shared-files-section.module.css';
import ShareFilesFolderInput from './folder-input/folder-input';
import SharedFilesContainer from './shared-files-container/shared-files-container';
import { RefreshCcw } from 'lucide-react';
import { getLocalStorageItem, setLocalStorageItem } from '../../../utils/local-storage/local-storage.utils';
import { useState } from 'react';

export default function SharedFilesSection() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const user = getLocalStorageItem('user');
  if (!user) {
    throw new Error('Authentication is required');
  }

  const [editMode, setEditMode] = useState(false);
  const handleSetEditMode = () => {
    setEditMode(prev => !prev);
  };

  const pathByUserId = getLocalStorageItem('pathByUserId') ?? {};
  const [path, setPath] = useState(pathByUserId[user.id] ?? '');
  const savePath = () => {
    pathByUserId[user.id] = path;
    setLocalStorageItem('pathByUserId', pathByUserId);

    handleSetEditMode();
    setRefreshFlag(prev => !prev);
  };
  
  return (
    <div className={styles.sharedFilesSectionContainer}>
      <div className={styles.titleDiv}>
        <h3>MY SHARED FILES</h3>
        <button onClick={() => setRefreshFlag(prev => !prev)}><RefreshCcw /></button>
      </div>
      <div className={styles.sharedFilesSectionContentContainer}>
        <ShareFilesFolderInput
          editMode={editMode}
          path={path}
          setPath={(value) => setPath(value)}
          savePath={savePath}
          changeEditMode={handleSetEditMode}
        />
        <SharedFilesContainer refreshFlag={refreshFlag} />
      </div>
    </div>
  );
}


