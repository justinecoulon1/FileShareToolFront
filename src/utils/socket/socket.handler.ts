import WebSocket from 'ws';
import { getLocalStorageItem } from '../local-storage/local-storage.utils';
import {
  ClientRequestUploadFileSocketMessage,
  ServerRequestDownloadFileDto,
  ServerRequestUploadFileDto,
  SocketMessage,
  SocketMessageTypes,
} from '../api/dto/socket.dto';
import * as fs from 'node:fs';
import path from 'node:path';

class SocketHandler {
  private socket: WebSocket | null = null;

  isSocketConnected() {
    return this.socket && this.socket.readyState === WebSocket.OPEN;
  }

  connectSocket() {
    const userToken = getLocalStorageItem('accessToken');
    if (!userToken) {
      throw new Error('Must be logged in');
    }
    this.socket = new WebSocket('ws://localhost:8080/api/socket', {
      headers: { accessToken: userToken },
    });

    this.socket.on('open', () => {
      console.log('WebSocket connection opened');
      window.dispatchEvent(new CustomEvent('ws-open'));
    });

    this.socket.on('message', (data: WebSocket.Data) => {
      console.log('Received:', data);
      const message = JSON.parse(data.toString()) as SocketMessage<SocketMessageTypes, unknown>;
      this.handleServerSocketMessage(message);
      window.dispatchEvent(new CustomEvent('ws-message', { detail: data.toString() }));
      return false;
    });

    this.socket.on('error', (err: Error) => {
      console.error('WebSocket error:', err);
      window.dispatchEvent(new CustomEvent('ws-error', { detail: err.message }));
    });

    this.socket.on('close', (code, reason) => {
      console.log('WebSocket connection closed', { code, reason });
      window.dispatchEvent(new CustomEvent('ws-close'));
    });
  }

  private handleServerSocketMessage(message: SocketMessage<SocketMessageTypes, unknown>) {
    switch (message.type) {
      case SocketMessageTypes.REQUEST_FILE:
        return this.handleRequestFileSocketMessage(message.messageContent as ServerRequestDownloadFileDto);
      case SocketMessageTypes.SEND_FILE:
        return this.handleSendFileSocketMessage(message.messageContent as ServerRequestUploadFileDto);
    }
  }

  private handleRequestFileSocketMessage(message: ServerRequestDownloadFileDto) {
    fs.writeFileSync(
      path.join(this.getUserPath(), message.sharedFileName),
      Buffer.from(message.fileContent.data, 'base64'),
    );
  }

  private handleSendFileSocketMessage(message: ServerRequestUploadFileDto) {
    const fileContent = fs.readFileSync(path.join(this.getUserPath(), message.sharedFileName));
    const responseMessage: ClientRequestUploadFileSocketMessage = {
      type: SocketMessageTypes.SEND_FILE,
      messageContent: { fileContent, sharedFileName: message.sharedFileName, transactionId: message.transactionId },
    };
    this.sendSocketMessage(responseMessage);
  }

  private getUserPath(): string {
    const user = getLocalStorageItem('user');
    if (!user) {
      throw new Error('No user found');
    }
    const pathByUserId = getLocalStorageItem('pathByUserId');
    const path = pathByUserId?.[user.id];
    if (!path) {
      throw new Error('No path found');
    }
    return path;
  }

  sendSocketMessage(message: SocketMessage<SocketMessageTypes, unknown>) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not open');
    }
  }

  closeSocket() {
    this.socket?.close();
  }
}

export default new SocketHandler();
