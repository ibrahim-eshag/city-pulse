import { IError } from "@/app/models/errors";
import { LocalEvent } from "@/app/models/event/Event";

export type CatalogState = {
  events: LocalEvent[];
  loading: boolean;
  error?: IError;
};
