import styles from './home-page.module.css';
import ShareList from './share-list/share-list';
import SharedFilesSection from './shared-files/shared-files-section';

export default function HomePageContainer() {
  return (
    <div className={styles.homePageContainer}>
      <ShareList />
      <SharedFilesSection />
    </div>
  );
}
