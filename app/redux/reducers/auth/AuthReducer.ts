import {AuthActionsType} from '../../actions/auth';
import {AuthActionType} from '../../actions/auth/types';
import {AuthState} from './types';
import {IError} from "@/app/models/errors";

const initialState: AuthState = {
    token: '',
    loading: false,
    loggedIn: false,
    error: undefined,
    loadingGetProfile: false,
    errorGetProfile: undefined,
    profile: {},
    loadingLogout: false,
    errorLogout: undefined,
    loadingUpdateProfile: false,
    errorUpdateProfile: undefined,
};

export const AuthReducer = (
    state = initialState,
    action: AuthActionsType,
): AuthState => {
    switch (action.type) {
        case AuthActionType.ATTEMPT:
            return {...state, loading: true, error: undefined};

        case AuthActionType.SUCCESS:
            return {
                ...state,
                token: action?.token!,
                loading: false,
                error: undefined,
                loggedIn: action?.loggedIn,
            };

        case AuthActionType.FAILED:
            return {...state, loading: false, error: action.error};

        case AuthActionType.GET_PROFILE_ATTEMPT:
            return {...state, loadingGetProfile: true, errorGetProfile: undefined};

        case AuthActionType.GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.profile,
                loadingGetProfile: false, errorGetProfile: undefined
            }

        case AuthActionType.GET_PROFILE_FAILED:
            return {
                ...state,
                profile: {},
                loadingGetProfile: false, errorGetProfile: action.error
            }

        case AuthActionType.UPDATE_PROFILE_ATTEMPT:
            return {...state, loadingUpdateProfile: true, errorUpdateProfile: undefined};

        case AuthActionType.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.profile,
                loadingUpdateProfile: false, errorUpdateProfile: undefined
            }

        case AuthActionType.UPDATE_PROFILE_FAILED:
            return {
                ...state,
                profile: {},
                loadingUpdateProfile: false, errorUpdateProfile: action.error
            }


        default:
            return state;
    }
};
