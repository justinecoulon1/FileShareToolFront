import { useState } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../../../../utils/local-storage/local-storage.utils';
import styles from './folder-input.module.css';
import { Check, Edit } from 'lucide-react';

export default function ShareFilesFolderInput() {
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

    setEditMode(!editMode);
  };

  return (
    <div className={styles.sharedFilesFolderInput}>
      {!editMode ? (
        <EditButton onEditMode={handleSetEditMode} />
      ) : (
        <ValidateButton savePath={savePath} />
      )}
      <label htmlFor="folderPath">Folder Path:</label>
      {!editMode ? (
        <p className={styles.folderText}>{path}</p>
      ) : (
        <input name={'folderPath'} id={'folderPath'}
               type="text"
               placeholder={'Path to the folder you want to share'}
               value={path}
               onChange={(e) => setPath(e.target.value)} onKeyDown={e => {
          if (e.key === 'Enter') {
            savePath();
          }
        }} />
      )}
    </div>
  );
}


function EditButton({ onEditMode }: { onEditMode: () => void }) {
  return (
    <button>
      <Edit
        className={styles.editButtonImage}
        onClick={onEditMode}
      />
    </button>
  );
}


function ValidateButton({ savePath }: { savePath: () => void }) {
  return (
    <button>
      <Check
        className={styles.editButtonImage}
        onClick={savePath}
      />
    </button>
  );
}