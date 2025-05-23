// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from 'electron';
import * as fs from 'node:fs';
import { SocketMessage, SocketMessageTypes } from './utils/api/dto/socket.dto';
import SocketHandler from './utils/socket/socket.handler';

contextBridge.exposeInMainWorld('electronAPI', {
  readdir: (path: string) =>
    fs.readdirSync(path, { withFileTypes: true }).map((dirent) => {
      const { size } = fs.statSync(`${dirent.parentPath}\\${dirent.name}`);
      return {
        ...dirent,
        isFile: dirent.isFile(),
        isDirectory: dirent.isDirectory(),
        byteSize: size,
      };
    }),
  isSocketConnected: () => {
    return SocketHandler.isSocketConnected();
  },
  connectSocket: () => {
    return SocketHandler.connectSocket();
  },
  sendSocketMessage: (message: SocketMessage<SocketMessageTypes, unknown>) => {
    return SocketHandler.sendSocketMessage(message);
  },
  closeSocket: () => {
    return SocketHandler.closeSocket();
  },
});
