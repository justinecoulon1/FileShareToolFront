import { SerializableDirent } from '../../interface';
import { getLocalStorageItem } from '../local-storage/local-storage.utils';

export function haveFilesChanged(currentMap: Map<string, SerializableDirent>, newFiles: SerializableDirent[]): boolean {
  if (currentMap.size !== newFiles.length) {
    return true;
  }

  for (const file of newFiles) {
    const existing = currentMap.get(file.name);
    if (!existing || existing.byteSize !== file.byteSize) {
      return true;
    }
  }

  return false;
}

export function updateFileMap(currentMap: Map<string, SerializableDirent>, newFiles: SerializableDirent[]): void {
  currentMap.clear();
  for (const file of newFiles) {
    currentMap.set(file.name, file);
  }
}

export function getFolderContent(): SerializableDirent[] {
  const user = getLocalStorageItem('user');
  if (!user) {
    throw new Error('Authentication is required');
  }

  const pathByUserId = getLocalStorageItem('pathByUserId') ?? {};
  const userPath = pathByUserId[user.id];
  return userPath ? window.electronAPI.readdir(userPath).filter((dirent) => dirent.isFile) : [];
}

export function formatFileSize(byteSize: number): string {
  if (isNaN(byteSize) || byteSize < 0) {
    throw new Error('Invalid byte size provided');
  }

  const kilobytes = byteSize / 1024;
  if (kilobytes < 1024) {
    return `${Math.round(kilobytes)} Ko`;
  }

  const megabytes = kilobytes / 1024;
  return `${megabytes.toFixed(2)} Mo`;
}
