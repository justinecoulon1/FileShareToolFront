import { fstAxios } from './FileToolShareAxios';
import { SharedFileInfoDto, UpdateSharedFileInfoRequestDto } from '../dto/shared-file.dto';

class SharedFileService {
  async updateUserSharedFileInfo(updateSharedFileInfoRequestDto: UpdateSharedFileInfoRequestDto) {
    const response = await fstAxios.post<SharedFileInfoDto[]>(`/shared-files`, updateSharedFileInfoRequestDto);
    return response.data;
  }

  async getCurrentUserSharedFileInfo() {
    const response = await fstAxios.get<SharedFileInfoDto[]>(`/shared-files`);
    return response.data;
  }
}

export default new SharedFileService();
