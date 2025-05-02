import { SharedFileInfoDto } from './shared-file.dto';

export type UserDto = {
  id: number;
  name: string;
};

export type LoginRequestDto = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
};

export type CreateUserRequestDto = {
  name: string;
  email: string;
  password: string;
};

export type UserInfoDto = {
  user: UserDto;
  sharedFileInfos: SharedFileInfoDto[]
};
