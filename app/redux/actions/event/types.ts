import { IError } from "@/app/models/errors";
import { LocalEvent } from "@/app/models/event/Event";

export enum LocalEventActionType {
  LIST_ATTEMPT = "EVENT_LIST_ATTEMPT",
  LIST_SUCCESS = "EVENT_LIST_SUCCESS",
  LIST_FAILED = "EVENT_LIST_FAILED",
}

interface LocalEventAttemptType {
  type: typeof LocalEventActionType.LIST_ATTEMPT;
}

interface LocalEventSuccessType {
  type: typeof LocalEventActionType.LIST_SUCCESS;
  appCategories: LocalEvent[];
}

interface LocalEventFailedType {
  type: typeof LocalEventActionType.LIST_FAILED;
  error: IError;
}

export type LocalEventActionsType =
  | LocalEventAttemptType
  | LocalEventSuccessType
  | LocalEventFailedType;
