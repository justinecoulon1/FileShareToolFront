import styles from './shared-files-container.module.css';

export default function SharedFilesContainer() {
  const files = window.electronAPI.readdir('c:/dev').filter(dirent => dirent.isFile);
  return (
    <div className={styles.sharedFilesContainer}>
      {files.map((file, index) => <p key={`${file.name}-${index}`}>{file.name}</p>)}
    </div>
  );
}