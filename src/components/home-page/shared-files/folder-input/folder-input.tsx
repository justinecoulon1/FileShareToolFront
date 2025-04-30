import styles from './folder-input.module.css';
import { Check, Edit } from 'lucide-react';

export default function ShareFilesFolderInput({ editMode, changeEditMode, savePath, setPath, path }: {
  editMode: boolean,
  changeEditMode: () => void,
  savePath: () => void,
  setPath: (value: string) => void,
  path: string
}) {


  return (
    <div className={styles.sharedFilesFolderInput}>
      {!editMode ? (
        <EditButton onEditMode={changeEditMode} />
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
               onChange={(e) => setPath(e.target.value)}
               onKeyDown={e => {
                 if (e.key === 'Enter') {
                   savePath();
                 }
               }}
        />
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