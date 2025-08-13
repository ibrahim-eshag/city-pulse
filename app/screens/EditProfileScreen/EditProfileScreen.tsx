import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Locale } from "@/app/locale";
import { AppState } from "@/app/redux";
import { AuthActions } from "@/app/redux/actions/auth";
import { AppAction } from "@/app/redux/actions/types";
import HappyFace from "@/app/res/icons/HappyFace";
import { Account } from "@/app/services/storage/auth/types";
import ActionButton from "@/components/buttons/ActionButton";
import DateOfBirthPicker from "@/components/ui/DateOfBirthPicker";
import GenderSelection from "@/components/ui/GenderSelection";
import Loader from "@/components/ui/Loader";
import { useRouter } from "expo-router";

const EditProfileScreen = () => {
  // const navigation = useNavigation();
  const { colors } = useTheme();
  const lang = Locale.currentLocale;
  const router = useRouter();

  const dispatch: ThunkDispatch<AppState, void, AppAction> = useDispatch();
  const {
    loadingUpdateProfile,
    errorUpdateProfile,
    loadingGetProfile,
    errorGetProfile,
    profile,
  } = useSelector((state: AppState) => state.auth);

  const [account, setAccount] = useState<Account>({});
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<number>(0);
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Load the initial profile data when the component loads
  useEffect(() => {
    const loadProfile = async () => {
      await dispatch(AuthActions.getProfile());
    };
    loadProfile();
  }, [dispatch]);

  // Update state when `profile` changes
  useEffect(() => {
    if (profile) {
      setAccount(profile);
      setName(profile?.full_name || "");
      setGender(profile?.gender || 0);
      setBirthDate(new Date(profile?.date_of_birth || new Date()));
    }
  }, [profile]);

  // Handle gender change
  const handleGenderChange = (genderValue: number) => {
    setGender(genderValue);
  };

  // Handle birth date change
  const handleBirthDateChange = (birthDateVal: Date) => {
    setBirthDate(birthDateVal);
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    const updatedAccount = {
      email: account?.email,
      full_name: name,
      gender,
      date_of_birth: birthDate,
    };

    // Dispatch updateProfile action to update the store
    dispatch(AuthActions.updateProfile(updatedAccount));
  };

  // Show success or error feedback based on Redux state
  useEffect(() => {
    if (updatingProfile) {
      if (loadingUpdateProfile === false) {
        if (errorUpdateProfile) {
          Alert.alert(
            Locale.strings("error"),
            Locale.strings("profile.updateFailed")
          );
        } else {
          Alert.alert(
            Locale.strings("success"),
            Locale.strings("profile.updatedSuccess")
          );
        }
      }
      updatingProfile = false;
    }
  }, [loadingUpdateProfile, errorUpdateProfile]);
  const goToHome = () => {
    // Navigate to home screen
    router.replace("/");
  };
  const handleLogout = async () => {
    await dispatch(AuthActions.logout(goToHome));
  };

  const logoutPressed = async () => {
    Alert.alert(
      Locale.strings("logout"),
      Locale.strings("profile.logoutConfirm"),
      [
        {
          text: Locale.strings("no"),
          style: "cancel",
        },
        {
          text: Locale.strings("yes"),
          onPress: handleLogout,
        },
      ]
    );
  };
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <StatusBar style="auto" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollView,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        {loadingGetProfile && <Loader />}
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          {/* <Header title={Locale.strings("profile.editProfile")} /> */}

          <View style={styles.profileContainer}>
            <HappyFace />
            <MaterialCommunityIcons
              name="pencil-outline"
              style={styles.editProfile}
              size={18}
              color={"#0011FF"}
            />
          </View>

          {/* Name Input */}
          <Text
            style={[
              styles.smallTip,
              {
                textAlign: lang === "ar" ? "right" : "left",
              },
            ]}
          >
            {Locale.strings("username")}
          </Text>
          <View style={[styles.mobileContainer]}>
            <TextInput
              style={[
                styles.mobileNumber,
                {
                  color: colors.text,
                  textAlign: lang === "ar" ? "right" : "left",
                },
              ]}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder={Locale.strings("username")}
            />
          </View>

          {/* Email Input */}
          <View style={{ marginVertical: 15 }} />
          <Text
            style={[
              styles.smallTip,
              {
                textAlign: lang === "ar" ? "right" : "left",
              },
            ]}
          >
            {Locale.strings("email")}
          </Text>
          <View
            style={[
              styles.mobileContainer,
              {
                justifyContent: "flex-start",
                backgroundColor: colors.inputs,
              },
            ]}
          >
            <TextInput
              style={[
                styles.mobileNumber,
                {
                  color: colors.text,
                  textAlign: lang === "ar" ? "right" : "left",
                },
              ]}
              value={account?.email}
              editable={false}
            />
          </View>

          {/* Mobile Input */}
          <View style={{ marginVertical: 15 }} />
          <Text
            style={[
              styles.smallTip,
              {
                textAlign: lang === "ar" ? "right" : "left",
              },
            ]}
          >
            {Locale.strings("mobileNumber")}
          </Text>
          <View
            style={[
              styles.mobileContainer,
              {
                // backgroundColor: colors.inputs,
                flexDirection: lang === "ar" ? "row-reverse" : "row",
              },
            ]}
          >
            {/* {lang == "en" && (
              <Text style={[styles.countryCode, { color: colors.text }]}>
                +966
              </Text>
            )} */}
            <TextInput
              editable={false}
              style={[
                styles.mobileNumber,
                {
                  color: colors.text,
                  textAlign: lang === "ar" ? "right" : "left",
                },
              ]}
              value={account?.mobile}
            />
            {/* {lang == "ar" && (
              <Text style={[styles.countryCode, { color: colors.text }]}>
                +966
              </Text>
            )} */}
          </View>

          {/* Birth Date Picker */}
          <View style={{ marginVertical: 15 }} />
          <Text
            style={[
              styles.smallTip,
              { textAlign: lang == "ar" ? "right" : "left" },
            ]}
          >
            {Locale.strings("birthDate")}
          </Text>
          <DateOfBirthPicker
            date={birthDate}
            onDateChange={handleBirthDateChange}
            placeholder={Locale.strings("birthDate")}
          />

          {/* Gender Selection */}
          <View style={{ marginVertical: 15 }} />
          <Text
            style={[
              styles.smallTip,
              { textAlign: lang == "ar" ? "right" : "left" },
            ]}
          >
            {Locale.strings("gender")}
          </Text>
          <GenderSelection
            selectedGender={gender}
            onGenderChange={handleGenderChange}
          />

          {/* Save Button */}
          <View style={styles.buttonContainer}>
            <ActionButton
              title={Locale.strings("save")}
              onPress={handleUpdateProfile}
            />
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutButtonContainer}>
          <ActionButton
            style={{ backgroundColor: "#0011FF30" }}
            titleStyle={{ color: "#5446FF" }}
            title={Locale.strings("logout")}
            onPress={logoutPressed}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    marginVertical: 70,
  },
  countryCode: {
    color: "#A9A9A9",
  },
  enterYourMobileLabelContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    marginBottom: 20,
  },
  tip: {
    fontSize: 18,
    fontFamily: "bold",
    color: "#000000",
  },
  mobileContainer: {
    flexDirection: "row",
    backgroundColor: "#F0F1F4",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
  },
  mobileNumber: {
    flex: 1,
    fontSize: 14,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  buttonContainer: {
    alignSelf: "center",
    width: "100%",
    height: 50,
    bottom: 0,
    marginTop: 60,
  },

  smallTip: {
    fontSize: 10,
    color: "grey",
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 30,
    width: 120,
  },
  editProfile: {
    position: "absolute",
    right: 8,
    bottom: 8,
    backgroundColor: "#0011FF30",
    padding: 5,
    borderRadius: 20,
  },
  logoutButtonContainer: {
    alignSelf: "center",
    width: "100%",
    marginTop: 0,
    marginBottom: 100,
    height: 50,
  },
});

export default EditProfileScreen;
