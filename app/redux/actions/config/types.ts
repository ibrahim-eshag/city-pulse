import {IAppConfig} from '@/app/models/config/types';
import {IError} from '@/app/models/errors';

export enum ConfigActionType {
    ATTEMPT = 'CONFIG/ATTEMPT',
    SUCCESS = 'CONFIG/SUCCESS',
    FAILED = 'CONFIG/FAILED',
}

interface ConfigActionAttemptType {
    type: typeof ConfigActionType.ATTEMPT;
}

interface ConfigActionSuccessType {
    type: typeof ConfigActionType.SUCCESS;
    remoteConfig: IAppConfig;
}

interface ConfigActionFailedType {
    type: typeof ConfigActionType.FAILED;
    error: IError;
}

export type ConfigActionsType =
    | ConfigActionAttemptType
    | ConfigActionSuccessType
    | ConfigActionFailedType;
