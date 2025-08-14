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

Splash.hide();
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
    }

    await new Promise((resolve) => setTimeout(resolve, 3000)); // Example delay
    await Locale.setLocale(languageKey);
    setLanguageLoaded(true);
  };

  useEffect(() => {
    // Only initialize language once when fonts are loaded and not yet initialized
    if (!languageLoaded && fontsLoaded) {
      (async () => {
        await initLanguage();
      })();
    }
  }, [fontsLoaded, languageLoaded]);

  // Hide Expo splash right before showing main app
  useEffect(() => {
    const hideSplash = async () => {
      if (fontsLoaded && languageLoaded) {
        Splash.hideAsync();
      }
    };
    hideSplash();
  }, [fontsLoaded, languageLoaded]);

  // Show custom splash until fonts and language are loaded
  if (!fontsLoaded || !languageLoaded) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider store={Store}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="screens/LocalEvents/[eventId]"
            options={{
              title: "Event Details",
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen
            name="screens/MobileNumberScreen/index"
            options={{
              title: Locale.strings("mobileNumber"),
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen
            name="screens/OTPScreen/index"
            options={{
              title: Locale.strings("otp"),
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
