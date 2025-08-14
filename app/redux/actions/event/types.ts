import { LocalEvent } from "@/app/models/event/Event";

export enum LocalEventActionType {
  LIST_ATTEMPT = "EVENT_LIST_ATTEMPT",
  LIST_SUCCESS = "EVENT_LIST_SUCCESS",
  LIST_FAILED = "EVENT_LIST_FAILED",
  FAVORITES_UPDATE = "EVENT_FAVORITES_UPDATE",
}

export interface LocalEventAttemptType {
  type: LocalEventActionType.LIST_ATTEMPT;
}

export interface LocalEventSuccessType {
  type: LocalEventActionType.LIST_SUCCESS;
  localEvents: LocalEvent[];
  append?: boolean;
}

export interface LocalEventFailedType {
  type: LocalEventActionType.LIST_FAILED;
  error: string;
}

export interface LocalEventFavoritesUpdateType {
  type: LocalEventActionType.FAVORITES_UPDATE;
  favorites: LocalEvent[];
}

export type LocalEventActionsType =
  | LocalEventAttemptType
  | LocalEventSuccessType
  | LocalEventFailedType
  | LocalEventFavoritesUpdateType;
