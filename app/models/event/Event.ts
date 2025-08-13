// instead of using Event Type, it's named LocalEvent to avoid confusion with the global Event type in JavaScript
export type LocalEvent = {
  id: string;
  name: string;
  type: string;
  url: string;
  locale: string;
  test?: boolean;
  images?: {
    ratio: string;
    url: string;
    width: number;
    height: number;
    fallback: boolean;
    attribution?: string;
  }[];
  sales?: {
    public?: {
      startDateTime?: string;
      endDateTime?: string;
      startTBD?: boolean;
      startTBA?: boolean;
    };
    presales?: {
      startDateTime?: string;
      endDateTime?: string;
      name?: string;
    }[];
  };
  dates?: {
    start?: {
      localDate?: string;
      localTime?: string;
      dateTime?: string;
      dateTBD?: boolean;
      dateTBA?: boolean;
      timeTBA?: boolean;
      noSpecificTime?: boolean;
    };
    timezone?: string;
    status?: {
      code?: string;
    };
    spanMultipleDays?: boolean;
  };
  classifications?: {
    primary?: boolean;
    segment?: { id: string; name: string };
    genre?: { id: string; name: string };
    subGenre?: { id: string; name: string };
    type?: { id: string; name: string };
    subType?: { id: string; name: string };
    family?: boolean;
  }[];
  promoter?: {
    id?: string;
    name?: string;
    description?: string;
  };
  promoters?: {
    id?: string;
    name?: string;
    description?: string;
  }[];
  info?: string;
  pleaseNote?: string;
  seatmap?: {
    staticUrl?: string;
    id?: string;
  };
  accessibility?: {
    info?: string;
    ticketLimit?: number;
    id?: string;
  };
  ticketLimit?: {
    info?: string;
    id?: string;
  };
  ageRestrictions?: {
    legalAgeEnforced?: boolean;
    id?: string;
  };
  ticketing?: {
    safeTix?: { enabled?: boolean };
    allInclusivePricing?: { enabled?: boolean };
    id?: string;
  };
  _links?: any;
  _embedded?: any;
};
