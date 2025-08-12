import {AxiosError} from 'axios';
import {ServerError} from '@/app/models/errors/general/GeneralErrors';

// import * as Sentry from '@sentry/react-native';

export class AuthErrorHandler {
    static guestLoginSeverError = (error: AxiosError<any>) => {
        switch (error.status) {
            case 200:
                break;

            default:
                throw new ServerError(
                    error.status!,
                    error.code!,
                    error.response?.data?.message,
                );
        }
    };

    static loginSeverError = (error: AxiosError<any>) => {
        switch (error.status) {
            case 200:
                break;

            default:
                throw new ServerError(
                    error.status!,
                    error.code!,
                    error.message,
                );
        }
    };

    static requestOTPSeverError = (error: AxiosError<any>) => {
        switch (error.status) {
            case 200:
                break;

            default:
                throw new ServerError(
                    error.status!,
                    error.code!,
                    error.response?.data?.message,
                );
        }
    };

    static validateOtpSeverError = (error: AxiosError<any>) => {
        switch (error.status) {
            case 200:
                break;

            default:
                throw new ServerError(
                    error.status!,
                    error.code!,
                    error.response?.data?.message,
                );
        }
    };

    static signUpSeverError = (error: AxiosError<any>) => {
        switch (error.status) {
            case 200:
                break;

            case 400:
            case 401:
            case 409:
                throw new ServerError(
                    error.status,
                    error.code,
                    error.response?.data?.message,
                );

            default:
                // Sentry.captureException(error);
                throw new ServerError(
                    error.status!,
                    error.code!,
                    error.response?.data?.message,
                );
        }
    };

    static deleteAccountSeverError = (error: AxiosError<any>) => {
        switch (error.status) {
            case 200:
                break;

            case 400:
            case 401:
                throw new ServerError(
                    error.status,
                    error.code,
                    error.response?.data?.message,
                );

            default:
                // Sentry.captureException(error);
                throw new ServerError(
                    error.status!,
                    error.code!,
                    error.response?.data?.message,
                );
        }
    };

    static refreshTokenSeverError(error: AxiosError<any>) {
        switch (error.status) {
            case 200:
                break;
            default:
                // Sentry.captureException(error);
                throw new ServerError(
                    error.status!,
                    error.code!,
                    error.response?.data?.message,
                );
        }
    }
}
