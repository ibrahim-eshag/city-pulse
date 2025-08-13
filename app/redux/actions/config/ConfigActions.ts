import { Dispatch } from "@reduxjs/toolkit";
import * as Updates from "expo-updates";

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
      if (RNRestart && typeof RNRestart.Restart === "function") {
        RNRestart.Restart();
      } else {
        // it's running in environment that doesn't support RNRestart
        console.warn("RNRestart is not available on this platform.");
        if (Updates.reloadAsync) {
          Updates.reloadAsync();
        }
      } //
    };
}
