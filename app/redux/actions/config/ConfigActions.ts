import { Dispatch } from "@reduxjs/toolkit";

import { Locale, LocalizationType } from "@/app/locale";
import { LanguageStorage } from "@/app/services/storage/language/LanguageStorage";
import RNRestart from "react-native-restart";
import { AppAction } from "../types";

export class ConfigActions {
  static setLanguage =
    (language: LocalizationType) => async (_dispatch: Dispatch<AppAction>) => {
      const languageStorage = new LanguageStorage();
      await languageStorage.saveLanguageKey(language);
      await Locale.setLocale(language);

      // restart the app
      RNRestart.restart();
    };
}
