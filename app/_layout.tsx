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
import { Provider } from "react-redux";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect, useState } from "react";
import { Locale, LocalizationList, LocalizationType } from "./locale";
import Store from "./redux";
import SplashScreen from "./screens/SplashScreen";
import { LanguageStorage } from "./services/storage/language";

Splash.preventAutoHideAsync();
export default function RootLayout() {
  const colorScheme = useColorScheme();
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
      // RNRestart.Restart();
    }

    await Locale.setLocale(languageKey);
    setLanguageLoaded(true);
  };

  useEffect(() => {
    // Initialize language on mount
    const initializeApp = async () => {
      await initLanguage();
    };
    initializeApp();
  }, [fontsLoaded, languageLoaded]);

  // Hide Expo splash right before showing main app
  useEffect(() => {
    if (fontsLoaded && languageLoaded) {
      Splash.hideAsync();
    }
  }, [fontsLoaded, languageLoaded]);

  // Show custom splash until fonts and language are loaded
  if (!fontsLoaded || !languageLoaded) {
    console.log("Fonts or language not loaded yet");
    return <SplashScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider store={Store}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="LocalEvents/[eventId]"
            options={{
              title: "Event Details",
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Provider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
