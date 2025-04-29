export type SharedFileInfoDto = {
  id: number;
  name: string;
  byteSize: number;
};

export type UpdateSharedFileInfoDto = {
  name: string;
  byteSize: number;
}
export type UpdateSharedFileInfoRequestDto = {
  updatedSharedFileInfoDto: UpdateSharedFileInfoDto[];
};