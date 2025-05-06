export enum SocketMessageTypes {
  REQUEST_FILE = 'REQUEST_FILE',
  SEND_FILE = 'SEND_FILE',
}

export type SocketMessage<TYPE extends SocketMessageTypes, CONTENT> = {
  type: TYPE;
  messageContent: CONTENT;
};

export type ClientRequestDownloadFileDto = {
  sharedFileId: number;
  userId: number;
};
export type ClientRequestDownloadFileSocketMessage = SocketMessage<
  SocketMessageTypes.REQUEST_FILE,
  ClientRequestDownloadFileDto
>;

export type ClientRequestUploadFileDto = {
  sharedFileName: string;
  transactionId: number;
  fileContent: Buffer;
};
export type ClientRequestUploadFileSocketMessage = SocketMessage<
  SocketMessageTypes.SEND_FILE,
  ClientRequestUploadFileDto
>;

export type ServerRequestDownloadFileDto = {
  sharedFileName: string;
  fileContent: { data: string };
};
export type ServerRequestDownloadFileSocketMessage = SocketMessage<
  SocketMessageTypes.REQUEST_FILE,
  ServerRequestDownloadFileDto
>;

export type ServerRequestUploadFileDto = {
  sharedFileName: string;
  transactionId: number;
};
export type ServerRequestUploadFileSocketMessage = SocketMessage<
  SocketMessageTypes.SEND_FILE,
  ServerRequestUploadFileDto
>;
