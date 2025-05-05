import { createFileRoute } from '@tanstack/react-router';
import LoginBox from '../components/login-box/login-box';
import styles from '../pages-styles/auth.module.css';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={styles.authPage}>
      <img className={styles.logo} src="/grey-frog-banner-blue-eyes.png" alt="logo" />
      <LoginBox />
    </div>
  );
}
