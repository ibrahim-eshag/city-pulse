import {
  LocalEventActionsType,
  LocalEventActionType,
} from "@/app/redux/actions/event";
import { CatalogState } from "@/app/redux/reducers/events/types";

const initialState: CatalogState = {
  events: [],
  loading: false,
  error: undefined,
};

export const EventsReducer = (
  state = initialState,
  action: LocalEventActionsType
): CatalogState => {
  switch (action.type) {
    case LocalEventActionType.LIST_ATTEMPT:
      return { ...state, loading: true, error: undefined, events: [] };

    case LocalEventActionType.LIST_SUCCESS:
      return {
        ...state,
        events: action.appCategories,
        loading: false,
        error: undefined,
      };

    case LocalEventActionType.LIST_FAILED:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};
