import { Dispatch } from "@reduxjs/toolkit";

import { ApiEndPoint } from "@/app/constants/api-endpoints";
import { doNothing } from "@/app/models/utils/helpers/DoNothing";
import { ApiClient } from "@/app/services/api/api-client";
import { Internet } from "@/app/services/network";
import { AppAction, GetState } from "../types";
import { LocalEventActionType } from "./types";

export class LocalEventActions {
  static listAllEvents =
    (cb = doNothing) =>
    async (dispatch: Dispatch<AppAction>, getState: GetState) => {
      try {
        await Internet.checkStatus();
        dispatch({ type: LocalEventActionType.LIST_ATTEMPT });

        const response = await ApiClient.get(
          ApiEndPoint.localEvent.listLocalEvents
        );
        if (response.status !== 200 && response.data.message) {
          dispatch({
            type: LocalEventActionType.LIST_FAILED,
            error: response.data.message,
          });
        } else {
          dispatch({
            type: LocalEventActionType.LIST_SUCCESS,
            appCategories: response.data,
          });
          cb(true);
        }
      } catch (error: any) {
        console.log(
          "🚀  LocalEventActions ~ listAllEvents ~ error:",
          error.message
        );
        dispatch({ type: LocalEventActionType.LIST_FAILED, error });
      }
    };
}
