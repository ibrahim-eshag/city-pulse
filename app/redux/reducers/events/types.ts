import { LocalEvent } from "@/app/models/event/Event";

export type CatalogState = {
  localEvents: LocalEvent[];
  loading: boolean;
  error?: string;
  favorites: LocalEvent[];
};
