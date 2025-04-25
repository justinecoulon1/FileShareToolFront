import { createFileRoute } from '@tanstack/react-router';
import { redirectToLoginIfNeeded } from '../utils/redirect/redirect.utils';
import HomePageContainer from '../components/home-page/home-page';

export const Route = createFileRoute('/')({
  component: App,
  beforeLoad: redirectToLoginIfNeeded,
});

function App() {
  return <HomePageContainer />;
}
