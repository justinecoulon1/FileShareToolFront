// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from 'electron';
import * as fs from 'node:fs';
import { getLocalStorageItem } from './utils/local-storage/local-storage.utils';
import WebSocket from 'ws';

let socket: WebSocket | null = null;
contextBridge.exposeInMainWorld('electronAPI', {
  readdir: (path: string) => fs.readdirSync(path, { withFileTypes: true }).map(dirent => {
    const { size } = fs.statSync(`${dirent.parentPath}\\${dirent.name}`);
    return {
      ...dirent,
      isFile: dirent.isFile(),
      isDirectory: dirent.isDirectory(),
      fileSize: size,
    };
  }),
  connectWebSocket: () => {
    const userToken = getLocalStorageItem('accessToken');
    if (!userToken) {
      throw new Error('Must be logged in');
    }
    socket = new WebSocket('ws://localhost:8080/api/hello', {
      headers: { accessToken: userToken },

    });
    socket.on('open', () => {
      console.log('WebSocket connection opened');
      // socket?.send(JSON.stringify({ message: 'Hello Server!' }));
      window.dispatchEvent(new CustomEvent('ws-open'));
    });

    socket.on('message', (data: WebSocket.Data) => {
      console.log('Received:', data);
      window.dispatchEvent(new CustomEvent('ws-message', { detail: data.toString() }));
      return false;
    });

    socket.on('error', (err: Error) => {
      console.error('WebSocket error:', err);
      window.dispatchEvent(new CustomEvent('ws-error', { detail: err.message }));
    });

    socket.on('close', () => {
      console.log('WebSocket connection closed');
      window.dispatchEvent(new CustomEvent('ws-close'));
    });
  },
  sendWebSocketMessage: (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.warn('WebSocket not open');
    }
  },
  closeWebSocket: () => {
    socket?.close();
  },
});