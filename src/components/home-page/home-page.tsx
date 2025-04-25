import styles from './home-page.module.css';
import ShareList from './share-list/share-list';
import SharedFiles from './shared-files/shared-files';

export default function HomePageContainer() {
  return (
    <div className={styles.homePageContainer}>
      <ShareList />
      <SharedFiles />
    </div>
  );
}
