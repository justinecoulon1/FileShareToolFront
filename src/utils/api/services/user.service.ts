import { fstAxios } from './FileToolShareAxios';
import { CreateUserRequestDto, LoginRequestDto, LoginResponseDto, UserDto } from '../dto/user.dto';
import { removeLocalStorageItem } from '../../local-storage/local-storage.utils';

class UserService {
  async login(email: string, password: string) {
    const body: LoginRequestDto = {
      email,
      password,
    };

    const response = await fstAxios.post<LoginResponseDto>(`/users/login`, body);
    return response.data;
  }

  async getAllConnectedUsers() {
    const response = await fstAxios.get<UserDto[]>(`/users/connected`);
    return response.data;
  }

  async register(name: string, email: string, password: string) {
    const body: CreateUserRequestDto = {
      name,
      email,
      password,
    };

    const response = await fstAxios.post<UserDto>(`/users`, body);
    return response.data;
  }

  logout() {
    removeLocalStorageItem('user');
    removeLocalStorageItem('accessToken');
  }
}

export default new UserService();
