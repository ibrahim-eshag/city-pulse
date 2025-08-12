import {IError} from '@/app/models/errors';
import {Account} from "@/app/services/storage/auth/types";

export type AuthState = {
    token: string;
    loading: boolean;
    error?: IError;
    loggedIn: boolean;

    loadingGetProfile: boolean,
    errorGetProfile?: IError,
    profile: Account | {}

    loadingLogout: boolean,
    errorLogout?: IError,

    loadingUpdateProfile: boolean,
    errorUpdateProfile?: IError,

};
