import styles from './shared-files.module.css';
import ShareFilesFolderInput from './folder-input/folder-input';

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


