import {Gender} from '@/app/models/genders';
import {Account} from "@/app/services/storage/auth/types";

export type GuestLoginPayload = {};

export type ErrorResponse = {
    code: number;
    message: string;
};

export type GuestLoginResponse = {
    token: string;
};

export type LoginPayload = {
    mobile_number: string;
    code: string;
};

export type UpdateProfilePayload = {
    gender: 1 | 2;
    full_name: string;
    email: string;
    date_of_birth: string;
};

export type LoginSuccessResponse = {
    access_token: string;
    account: Account;
    expiration_date: string;
};


type LoginResponse = ErrorResponse | LoginSuccessResponse;


export type RequestOTPPayload = {
    mobile_number: string;
};

export type OtpVerificationResponse = {
    userExistBurgerizzr: boolean;
};

export type ValidateOtpPayLoad = {};

export type ValidateOtpResponse = {
    status: boolean;
    message: string;
    error_code: number;
};

export type SignUpPayLoad = {
    phone: string;
    code: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    birthdate: string;
    gender: Gender;
};

export type SignUpResponse = {
    token: string;
};

export type DeleteAccountResponse = any;

export type RefreshTokenResponse = {
    token: string;
};
