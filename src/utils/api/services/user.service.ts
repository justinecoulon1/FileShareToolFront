import {fstAxios} from "./FileToolShareAxios";
import {LoginRequestDto, LoginResponseDto} from "../dto/user.dto";

class UserService {
    async login(email: string, password: string) {
        const body: LoginRequestDto = {
            email,
            password,
        };

        const response = await fstAxios.post<LoginResponseDto>(`/users/login`, body);
        return response.data;
    }
}

export default new UserService();