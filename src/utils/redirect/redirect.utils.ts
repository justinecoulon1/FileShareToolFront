import { redirect } from '@tanstack/react-router';
import { getLocalStorageItem } from '../local-storage/local-storage.utils';

export const redirectToLoginIfNeeded = () => {
  if (!getLocalStorageItem('user')) {
    console.log('supposed to redirect');
    return redirectTo('/auth');
  }
};

const redirectTo = (path: string): never => {
  throw redirect({ to: path });
};
