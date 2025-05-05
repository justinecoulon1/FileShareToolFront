import * as fs from 'node:fs';

export type SerializableDirent = Pick<fs.Dirent, 'name' | 'path' | 'parentPath'> & {
  isFile: boolean;
  isDirectory: boolean;
  fileSize: number;
};

export interface IElectronAPI {
  readdir: (path: string) => SerializableDirent[];
  connectWebSocket: () => void;
  sendWebSocketMessage: () => void;
  closeWebSocket: () => void;
  isSocketConnected: () => boolean;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
