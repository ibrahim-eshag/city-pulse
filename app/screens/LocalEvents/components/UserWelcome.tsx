import { Locale } from "@/app/locale";
import { AppState } from "@/app/redux";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const UserWelcome = () => {
  const { profile } = useSelector((state: AppState) => state.auth);
  const lang = Locale.currentLocale;

  return (
    <View>
      {profile?.full_name && (
        <Text
          style={[
            styles.welcomeText,
            { textAlign: lang === "ar" ? "right" : "left" },
          ]}
        >
          {Locale.strings("welcome")} {profile?.full_name}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 10,
    color: "#333",
    marginVertical: 8,
  },
});

export default UserWelcome;
