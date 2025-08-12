import { Dispatch } from "@reduxjs/toolkit";

import { ApiEndPoint } from "@/app/constants/api-endpoints";
import { doNothing } from "@/app/models/utils/helpers/DoNothing";
import { ApiClient } from "@/app/services/api/api-client";
import { AuthApi } from "@/app/services/api/auth/Auth.api";
import {
  LoginPayload,
  LoginSuccessResponse,
  RequestOTPPayload,
  UpdateProfilePayload,
} from "@/app/services/api/auth/types";
import { Internet } from "@/app/services/network";
import { AuthStorage } from "@/app/services/storage/auth";
import { Account } from "@/app/services/storage/auth/types";
import { Storage } from "@/app/services/storage/storage";
import RNRestart from "react-native-restart";
import { AppAction, GetState } from "../types";
import { AuthActionType, LoginActionData, RequestOtpActionData } from "./types";

export class AuthActions {
  static requestOtp =
    (data: RequestOtpActionData, cb = doNothing) =>
    async (dispatch: Dispatch<AppAction>, getState: GetState) => {
      try {
        await Internet.checkStatus();
        dispatch({ type: AuthActionType.ATTEMPT });

        // UAE mobiles: 5 followed by one of 0,2,4,5,6,8 then 7 digits (e.g., 50/52/54/55/56/58)
        const reg = /^(?:5[024568]\d{7})$/;
        const isValidPhone = reg.test(data.phone);
        if (!isValidPhone) {
          throw new Error("invalid mobile number");
        }

        const requestData: RequestOTPPayload = {
          mobile_number: "+971" + data.phone,
        };

        const requestOtp = await ApiClient.post(
          ApiEndPoint.auth.requestOtp,
          requestData
        );
        console.log("RequestOtp: ", requestOtp);
        if (requestOtp.status !== 200 && requestOtp.data.message) {
          dispatch({
            type: AuthActionType.FAILED,
            error: requestOtp.data.message,
          });
        } else {
          const storage = new Storage();
          await storage.save("mobile_number", requestData.mobile_number);
          dispatch({
            type: AuthActionType.SUCCESS,
            token: undefined,
            loggedIn: false,
          });
          cb(true);
        }
      } catch (error: any) {
        console.log("🚀  AuthActions ~ requestOtp ~ error:", error.message);
        dispatch({ type: AuthActionType.FAILED, error });
      }
    };

  static login =
    (data: LoginActionData, cb = doNothing) =>
    async (dispatch: Dispatch<AppAction>, getState: GetState) => {
      try {
        // check the internet connection
        await Internet.checkStatus();
        dispatch({ type: AuthActionType.ATTEMPT });
        const requestData: LoginPayload = {
          mobile_number: data.phone,
          code: data.code,
        };
        const response = await ApiClient.post(
          ApiEndPoint.auth.login,
          requestData
        );
        if (response.status !== 200 && response.data.message) {
          dispatch({
            type: AuthActionType.FAILED,
            error: response.data.message,
          });
        } else {
          const data: LoginSuccessResponse = response.data;
          const token = data.access_token;

          const authStorage = new AuthStorage();
          // save token
          await authStorage.saveToken(token);

          // save account
          await authStorage.saveAccount(data.account);

          dispatch({
            type: AuthActionType.SUCCESS,
            token,
            loggedIn: true,
          });

          cb(true);

          // const updateNotificationToken =
          //     NotificationsActions.updateTokenRemotely();
          // await updateNotificationToken(dispatch, getState);

          // const getSubscriptions = SubscriptionsActions.getSubscriptions();
          // await getSubscriptions(dispatch, getState);
          //
          // const getCustomerSubscription =
          //     SubscriptionsActions.getCustomerSubscription();
          // await getCustomerSubscription(dispatch, getState);
        }
      } catch (error: any) {
        console.log("🚀 AuthActions ~ login ~ error:", error);
        dispatch({ type: AuthActionType.FAILED, error });
      }
    };

  static logout = () => async (dispatch: Dispatch<AppAction>) => {
    try {
      dispatch({ type: AuthActionType.ATTEMPT });
      const response = await ApiClient.delete(ApiEndPoint.auth.logout);

      if (response.status !== 200 && response.data.message) {
        dispatch({ type: AuthActionType.FAILED, error: response.data.message });
      } else {
        const storage = new Storage();
        await storage.clearStorage();
        RNRestart.restart();
        // Updates.reloadAsync();
      }
    } catch (error: any) {
      console.log("🚀 ~ AuthActions ~ logout= ~ error:", error);
      dispatch({ type: AuthActionType.FAILED, error });
    }
  };

  static getProfile =
    (cb = doNothing) =>
    async (dispatch: Dispatch<AppAction>) => {
      try {
        // check the internet connection
        await Internet.checkStatus();

        dispatch({ type: AuthActionType.GET_PROFILE_ATTEMPT });
        const response = await ApiClient.get(ApiEndPoint.profile.profile);

        if (response.status !== 200 && response.data.message) {
          dispatch({
            type: AuthActionType.FAILED,
            error: response.data.message,
          });
        } else {
          dispatch({
            type: AuthActionType.GET_PROFILE_SUCCESS,
            profile: response.data,
          });
          cb(true);
        }
      } catch (error: any) {
        console.log("🚀 AuthActions ~ login ~ error:", error);
        dispatch({ type: AuthActionType.GET_PROFILE_FAILED, error });
      }
    };
  static updateProfile =
    (data: UpdateProfilePayload, cb = doNothing) =>
    async (dispatch: Dispatch<AppAction>) => {
      try {
        await Internet.checkStatus();

        dispatch({ type: AuthActionType.UPDATE_PROFILE_ATTEMPT });
        const requestData: UpdateProfilePayload = {
          gender: data.gender,
          email: data.email,
          date_of_birth: data.date_of_birth,
          full_name: data.full_name,
        };

        const response = await ApiClient.put(
          ApiEndPoint.profile.profile,
          requestData
        );
        if (response.status !== 200 && response.data.message) {
          dispatch({
            type: AuthActionType.FAILED,
            error: response.data.message,
          });
        } else {
          const data: Account = response.data;
          const authStorage = new AuthStorage();
          // save account
          await authStorage.saveAccount(data);
          dispatch({
            type: AuthActionType.UPDATE_PROFILE_SUCCESS,
            profile: response.data,
          });
          cb(true);
          RNRestart.restart();
        }
      } catch (error: any) {
        console.log("🚀 AuthActions ~ update profile ~ error:", error);
        dispatch({ type: AuthActionType.UPDATE_PROFILE_FAILED, error });
      }
    };

  static deleteAccount = () => async (dispatch: Dispatch<AppAction>) => {
    try {
      await Internet.checkStatus();
      dispatch({ type: AuthActionType.ATTEMPT });
      const authApi = new AuthApi();
      await authApi.deleteAccount();
      const logout = this.logout();
      logout(dispatch);
    } catch (error: any) {
      console.log("🚀 ~ AuthActions ~ deleteAccount ~ error:", error);
      dispatch({ type: AuthActionType.FAILED, error });
    }
  };
}
