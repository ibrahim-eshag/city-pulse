// instead of using Event Type, it's named LocalEvent to avoid confusion with the global Event type in JavaScript
export type LocalEvent = {
  app_category_id: number;
  app_category_name_ar: string;
  app_category_name_en: string;
  enabled: boolean;
  sort_id: number;
  app_category_name: string;
  icon_url: string;
};
