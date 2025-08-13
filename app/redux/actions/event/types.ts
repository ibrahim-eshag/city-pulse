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
  localEvents: LocalEvent[];
  append?: boolean;
}

interface LocalEventFailedType {
  type: typeof LocalEventActionType.LIST_FAILED;
  error: string;
}

export type LocalEventActionsType =
  | LocalEventAttemptType
  | LocalEventSuccessType
  | LocalEventFailedType;
