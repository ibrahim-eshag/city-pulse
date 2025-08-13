import {
  LocalEventActionsType,
  LocalEventActionType,
} from "@/app/redux/actions/event";
import { CatalogState } from "@/app/redux/reducers/events/types";

const initialState: CatalogState = {
  localEvents: [],
  loading: false,
  error: undefined,
  favorites: [],
};

export const EventsReducer = (
  state = initialState,
  action: LocalEventActionsType
): CatalogState => {
  switch (action.type) {
    case LocalEventActionType.LIST_ATTEMPT:
      // Do not clear localEvents on paging, only on reset
      return { ...state, loading: true, error: undefined };

    case LocalEventActionType.LIST_SUCCESS:
      // If paging, append; if reset, replace
      return {
        ...state,
        localEvents:
          action.append && Array.isArray(state.localEvents)
            ? [...state.localEvents, ...action.localEvents]
            : action.localEvents,
        loading: false,
        error: undefined,
      };

    case LocalEventActionType.LIST_FAILED:
      return { ...state, loading: false, error: action.error };

    case LocalEventActionType.FAVORITES_UPDATE:
      return { ...state, favorites: action.favorites };
    default:
      return state;
  }
};
