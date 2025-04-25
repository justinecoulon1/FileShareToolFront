import styles from './shared-files.module.css';
import { Check, Edit } from 'lucide-react';
import { useState } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../../../utils/local-storage/local-storage.utils';

export default function SharedFiles() {
  return (
    <div className={styles.sharedFilesContainer}>
      <div className={styles.titleDiv}>
        <h3>MY SHARED FILES</h3>
      </div>
      <div className={styles.sharedFilesContentContainer}>
        <ShareFilesFolderInput />
      </div>
    </div>
  );
}

function ShareFilesFolderInput() {
  const user = getLocalStorageItem('user');
  if (!user) {
    throw new Error('Authentication is required');
  }
  const pathByUserId = getLocalStorageItem('pathByUserId') ?? {};

  const [path, setPath] = useState(pathByUserId[user.id] ?? '');

  const [editMode, setEditMode] = useState(false);

  return (
    <div className={styles.sharedFilesFolderInput}>
      {!editMode ? (
        <button>
          <Edit
            className={styles.editButtonImage}
            onClick={() => {
              setEditMode(!editMode);
            }}
          />
        </button>
      ) : (
        <button>
          <Check
            className={styles.editButtonImage}
            onClick={() => {
              pathByUserId[user.id] = path;
              setLocalStorageItem('pathByUserId', pathByUserId);

              setEditMode(!editMode);
            }}
          />
        </button>
      )}
      <label htmlFor="folderPath">Folder Path:</label>
      {!editMode ? (
        <p>{path}</p>
      ) : (
        <input name={'folderPath'} id={'folderPath'} type="text" placeholder={'Path to the folder you want to share'}
               value={path} onChange={(e) => setPath(e.target.value)} />
      )}
    </div>
  );
}
