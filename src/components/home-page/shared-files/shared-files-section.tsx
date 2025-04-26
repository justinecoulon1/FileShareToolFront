import styles from './shared-files-section.module.css';
import ShareFilesFolderInput from './folder-input/folder-input';
import SharedFilesContainer from './shared-files-container/shared-files-container';

export default function SharedFilesSection() {
  return (
    <div className={styles.sharedFilesSectionContainer}>
      <div className={styles.titleDiv}>
        <h3>MY SHARED FILES</h3>
      </div>
      <div className={styles.sharedFilesSectionContentContainer}>
        <ShareFilesFolderInput />
        <SharedFilesContainer />
      </div>
    </div>
  );
}


