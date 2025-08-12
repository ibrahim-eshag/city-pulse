import {IError} from '@/app/models/errors';
import {Gender} from '@/app/models/genders';

export enum AuthActionType {
    ATTEMPT = 'AUTH/ATTEMPT',
    SUCCESS = 'AUTH/SUCCESS',
    FAILED = 'AUTH/FAILED',
    LOGOUT_ATTEMPT = 'AUTH/LOGOUT_ATTEMPT',
    LOGOUT_SUCCESS = 'AUTH/LOGOUT_SUCCESS',
    LOGOUT_FAILED = 'AUTH/LOGOUT_FAILED',
    REQUEST_OTP_ATTEMPT = 'AUTH/REQUEST_OTP_ATTEMPT',
    REQUEST_OTP_SUCCESS = 'AUTH/REQUEST_OTP_SUCCESS',
    REQUEST_OTP_FAILED = 'AUTH/REQUEST_OTP_FAILED',
    VERIFY_OTP_ATTEMPT = 'AUTH/VERIFY_OTP_ATTEMPT',
    VERIFY_OTP_SUCCESS = 'AUTH/VERIFY_OTP_SUCCESS',
    VERIFY_OTP_FAILED = 'AUTH/VERIFY_OTP_FAILED',
    LOGIN_ATTEMPT = 'AUTH/LOGIN_ATTEMPT',
    LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS',
    LOGIN_FAILED = 'AUTH/LOGIN_FAILED',
    GET_PROFILE_ATTEMPT = 'AUTH/GET_PROFILE_ATTEMPT',
    GET_PROFILE_SUCCESS = 'AUTH/GET_PROFILE_SUCCESS',
    GET_PROFILE_FAILED = 'AUTH/GET_PROFILE_FAILED',
    UPDATE_PROFILE_ATTEMPT = 'AUTH/UPDATE_PROFILE_ATTEMPT',
    UPDATE_PROFILE_SUCCESS = 'AUTH/UPDATE_PROFILE_SUCCESS',
    UPDATE_PROFILE_FAILED = 'AUTH/UPDATE_PROFILE_FAILED',
}

interface AuthActionAttemptType {
    type: typeof AuthActionType.ATTEMPT;
}

interface AuthActionSuccessType {
    type: typeof AuthActionType.SUCCESS;
    token?: string;
    loggedIn: boolean;
}

interface AuthActionFailedType {
    type: typeof AuthActionType.FAILED;
    error: IError;
}


interface AuthActionGetProfileAttemptType {
    type: typeof AuthActionType.GET_PROFILE_ATTEMPT;
}

interface AuthActionGetProfileSuccessType {
    type: typeof AuthActionType.GET_PROFILE_SUCCESS;
    profile: any;
}

interface AuthActionGetProfileFailedType {
    type: typeof AuthActionType.GET_PROFILE_FAILED;
    error: IError;
}

interface AuthActionUpdateProfileAttemptType {
    type: typeof AuthActionType.UPDATE_PROFILE_ATTEMPT;
}

interface AuthActionUpdateProfileSuccessType {
    type: typeof AuthActionType.UPDATE_PROFILE_SUCCESS;
    profile: any;
}

interface AuthActionUpdateProfileFailedType {
    type: typeof AuthActionType.UPDATE_PROFILE_FAILED;
    error: IError;
}


export type SignUpActionData = {
    firstName: string;
    lastName: string;
    birthdate: string;
    gender: Gender;
    email: string;
    phone: string;
    code: string;
};

export type LoginActionData = {
    phone: string;
    code: string;
};

export type RequestOtpActionData = {
    phone: string;
};

export type AuthActionsType = AuthActionAttemptType | AuthActionSuccessType | AuthActionFailedType |
    AuthActionGetProfileAttemptType | AuthActionGetProfileSuccessType | AuthActionGetProfileFailedType
    | AuthActionUpdateProfileAttemptType | AuthActionUpdateProfileSuccessType | AuthActionUpdateProfileFailedType;
