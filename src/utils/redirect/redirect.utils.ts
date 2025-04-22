import {redirect} from "@tanstack/react-router";
import {getLocalStorageItem} from "../local-storage/local-storage.utils";

export const redirectToLoginIfNeeded = () => {
    if (!getLocalStorageItem('user')) {
        return redirectTo('/auth')
    }
}

const redirectTo = (path: string): never => {
    throw redirect({to: path})
}