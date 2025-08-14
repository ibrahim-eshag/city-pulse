import { I18n } from "i18n-js";
import { I18nManager } from "react-native";

import { TimeFormatter } from "@/app/models/utils/time";
import ar from "./ar.json";
import en from "./en.json";
import { LocalizationList, LocalizationType } from "./types";

const i18n = new I18n(
  {
    ar,
    en,
  },
  { defaultLocale: "ar" }
);

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

export class Locale {
  static currentLocale: LocalizationType = "ar";

  static setLocale = async (locale: LocalizationType): Promise<void> => {
    const localization = LocalizationList[locale] || LocalizationList.ar;
    i18n.locale = localization.id;
    this.currentLocale = localization.id;
    I18nManager.allowRTL(localization.RTL);
    I18nManager.forceRTL(localization.RTL);
    TimeFormatter.setLocale(localization.id);
  };

  static strings = (name: string, param = {}): string => {
    return i18n.t(name, param);
  };
}

export default i18n;
