import {fstAxios} from "./FileToolShareAxios";
import {LoginRequestDto, LoginResponseDto} from "../dto/user.dto";
import {clearLocalStorage} from "../../local-storage/local-storage.utils";

class UserService {
    async login(email: string, password: string) {
        const body: LoginRequestDto = {
            email,
            password,
        };

        const response = await fstAxios.post<LoginResponseDto>(`/users/login`, body);
        return response.data;
    }


    logout() {
        clearLocalStorage();
    }
}

export default new UserService();