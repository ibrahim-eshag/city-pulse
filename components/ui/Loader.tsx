import { Locale } from "@/app/locale";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { Text, View } from "react-native";

const Loader = () => {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    animation?.current?.play();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 500,
        width: "100%",
        // backgroundColor: "red",
        height: "100%",
      }}
    >
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 50,
          height: 50,
        }}
        source={require("../../assets/lottie/loading-indicator.json")}
        loop={true}
        resizeMode="cover"
      />
      <Text>{Locale.strings("loading")}</Text>
    </View>
  );
};

export default Loader;
