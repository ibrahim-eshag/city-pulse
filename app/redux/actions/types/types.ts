import { AppState } from "@/app/redux";
import { AuthActionsType } from "../auth";
import { LocalEventActionsType } from "../event";

export type GetState = () => AppState;

// type Action<T> = (data?: T) => any;

export type AppAction = AuthActionsType | LocalEventActionsType;
