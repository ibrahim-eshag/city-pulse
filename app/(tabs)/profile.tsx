import { Pressable, Text, View } from "react-native";

import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Locale } from "../locale";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";
import { AuthStorage } from "../services/storage/auth";

export default function Profile() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      console.log("Profile screen focused");
      const checkLoginStatus = async () => {
        const authStorage = new AuthStorage();
        const foundToken = await authStorage.getToken();
        setToken(foundToken);
      };
      checkLoginStatus();
    }, [])
  );
  const navigateToLogin = () => {
    router.push({ pathname: "/screens/MobileNumberScreen" });
  };
  return (
    <>
      {token ? (
        <EditProfileScreen />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Pressable
            onPress={navigateToLogin}
            style={{
              padding: 10,
              backgroundColor: "blue",
              width: 150,
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>
              {Locale.strings("profile.login")}
            </Text>
          </Pressable>
          <Text>{Locale.strings("profile.loginPrompt")}</Text>
        </View>
      )}
    </>
  );
}
