import EventsReducer from "@/app/redux/reducers/events";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/auth";

export const reducer = combineReducers({
  auth: AuthReducer,
  localEvents: EventsReducer,
});

export const Store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
});
