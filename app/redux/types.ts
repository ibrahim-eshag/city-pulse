import { reducer } from "./Store";

export type AppState = ReturnType<typeof reducer>;

// general types
export type Pagination = {
  page_size: number;
  page_number: number;
};
