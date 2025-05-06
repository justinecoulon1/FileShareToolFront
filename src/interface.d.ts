import * as fs from 'node:fs';
import { SocketMessage, SocketMessageTypes } from './utils/api/dto/socket.dto';

export type SerializableDirent = Pick<fs.Dirent, 'name' | 'path' | 'parentPath'> & {
  isFile: boolean;
  isDirectory: boolean;
  byteSize: number;
};

export interface IElectronAPI {
  readdir: (path: string) => SerializableDirent[];
  connectSocket: () => void;
  sendSocketMessage: (message: SocketMessage<SocketMessageTypes, unknown>) => void;
  closeSocket: () => void;
  isSocketConnected: () => boolean;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
