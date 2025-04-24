import styles from "./shared-files.module.css"

export default function SharedFiles() {
    return <div className={styles.sharedFilesContainer}>
        <div className={styles.titleDiv}>
            <h3>SHARED FILES</h3>
        </div>
        <div className={styles.sharedFilesContentContainer}>
            <div className={styles.sharedFilesFolderInput}>
                <label htmlFor="folderPath">
                    Folder Path:
                </label>
                <input name={"folderPath"} id={"folderPath"} type="text"
                       placeholder={"Path to the folder you want to share"}/>
            </div>
        </div>
    </div>
}