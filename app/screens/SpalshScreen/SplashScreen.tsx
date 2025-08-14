import * as Splash from "expo-splash-screen";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";

import { Dimensions, StyleSheet, View } from "react-native";
const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  useEffect(() => {
    Splash.hideAsync();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("@/assets/lottie/tech-futuristic.json")}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a23",
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: width * 0.8,
    height: height * 0.8,
  },
});
