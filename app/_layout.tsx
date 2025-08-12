import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as Splash from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { I18nManager } from "react-native";
import "react-native-reanimated";
import RNRestart from "react-native-restart";
import { Provider } from "react-redux";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect, useState } from "react";
import { Locale, LocalizationList, LocalizationType } from "./locale";
import Store from "./redux";
import { AuthStorage } from "./services/storage/auth";
import { LanguageStorage } from "./services/storage/language";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [token, setToken] = useState<string | null>(null);
  const [languageLoaded, setLanguageLoaded] = useState(false); // Track language initialization

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const initLanguage = async (): Promise<void> => {
    const languageStorage = new LanguageStorage();
    const languageKey =
      (await languageStorage.getLanguageKey()) as LocalizationType;
    const isRTL = LocalizationList[languageKey]?.RTL || false;

    if (I18nManager.isRTL !== isRTL) {
      // Update RTL direction
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);

      // Restart the app to apply the changes for Android, I had to
      // TODO: to fix this issue, without reloading the app
      RNRestart.Restart();
    }

    await Locale.setLocale(languageKey);
    setLanguageLoaded(true);
  };

  useEffect(() => {
    // Initialize language on mount
    const initializeApp = async () => {
      await initLanguage();
      const authStorage = new AuthStorage();
      const foundToken = await authStorage.getToken();
      setToken(foundToken);

      // Only hide the splash screen when everything is set up
      if (fontsLoaded && languageLoaded) {
        await Splash.hideAsync();
      }
    };

    initializeApp();
  }, [fontsLoaded, languageLoaded]);

  if (!fontsLoaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider store={Store}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </Provider>
    </ThemeProvider>
  );
}
