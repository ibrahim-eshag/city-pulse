import { Storage } from "@/app/services/storage/storage";

import { ApiEndPoint } from "@/app/constants/api-endpoints";
import { doNothing } from "@/app/models/utils/helpers/DoNothing";
import { ApiClient } from "@/app/services/api/api-client";
import { Internet } from "@/app/services/network";
import { Dispatch } from "@reduxjs/toolkit";
import { AppAction, GetState } from "../types";
import { LocalEventActionType } from "./types";

export class LocalEventActions {
  /**
   * Update favorites in store and persist to local storage
   */
  static updateFavorites =
    (favorites: string[]) => async (dispatch: Dispatch<AppAction>) => {
      await new Storage().save("favorites", favorites);
      dispatch({ type: LocalEventActionType.FAVORITES_UPDATE, favorites });
    };
  /**
   * Fetch events from Ticketmaster API with optional city, keyword, paging
   * @param params { cityName?: string, keyword?: string, page?: number, pageSize?: number }
   * @param cb Callback
   */
  static listAllEvents =
    (
      params: {
        cityName?: string;
        keyword?: string;
        page?: number;
        pageSize?: number;
      } = {},
      cb = doNothing
    ) =>
    async (dispatch: Dispatch<AppAction>, getState: GetState) => {
      try {
        await Internet.checkStatus();
        dispatch({ type: LocalEventActionType.LIST_ATTEMPT });

        // Build Ticketmaster Discovery API query
        const { cityName = "", keyword = "", page = 0, pageSize = 10 } = params;

        // Example endpoint: /discovery/v2/events?city=Dubai&keyword=music&page=0&size=10
        const query: Record<string, string | number> = {
          page,
          size: pageSize,
        };
        query.apikey = process.env.EXPO_PUBLIC_TICKETMASTER_API_KEY || "";
        if (cityName) query.city = cityName;
        if (keyword) query.keyword = keyword;

        const endpoint = ApiEndPoint.localEvent.listLocalEvents;
        const response = await ApiClient.get(endpoint, { params: query });

        // Ticketmaster error response: { fault: { ... } }
        if (!response || response.status !== 200) {
          const errorMsg =
            response?.data?.fault?.faultstring ||
            response?.data?.message ||
            "Unknown error";
          dispatch({
            type: LocalEventActionType.LIST_FAILED,
            error: errorMsg,
          });
          cb(false);
          return;
        }

        // Ticketmaster success: { _embedded: { events: [...] }, page: {...} }
        const events = response.data?._embedded?.events || [];
        console.log(
          "🚀  LocalEventActions[0] ~ listAllEvents ~ events:",
          events[0]
        );
        if (events.length > 0) {
          // If page > 0, append; else, replace
          dispatch({
            type: LocalEventActionType.LIST_SUCCESS,
            localEvents: events,
            append: params.page && params.page > 0 ? true : false,
          });
          cb(true);
        } else {
          dispatch({
            type: LocalEventActionType.LIST_FAILED,
            error: "No events found",
          });
          cb(false);
        }
      } catch (error: any) {
        console.log("🚀  LocalEventActions ~ listAllEvents ~ error:", error);
        dispatch({
          type: LocalEventActionType.LIST_FAILED,
          error: error?.message || error,
        });
        cb(false);
      }
    };
}
