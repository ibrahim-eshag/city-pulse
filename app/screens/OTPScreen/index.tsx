import { Storage } from "@/app/services/storage/storage";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import RNRestart from "react-native-restart";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { Locale } from "@/app/locale";
import { AppState } from "@/app/redux";
import { AuthActions } from "@/app/redux/actions/auth";
import { AppAction } from "@/app/redux/actions/types";
import { OTPType } from "@/app/screens/OTPScreen/types";
import { AuthStorage } from "@/app/services/storage/auth";
import ActionButton from "@/components/buttons/ActionButton";
import Loader from "@/components/ui/Loader";
import { useRouter } from "expo-router";

const storage = new Storage();
const authStorage = new AuthStorage();
const OTPScreen = (props) => {
  const dispatch: ThunkDispatch<AppState, void, AppAction> = useDispatch();
  const [mobileNumber, setMobileNumber] = useState("");
  const { loading, error: loginErr } = useSelector((state) => state.auth);
  const lang = Locale.currentLocale;
  const router = useRouter();
  useEffect(() => {
    const getMobileNumber = async () => {
      const mobile: string = await storage.get("mobile_number");
      setMobileNumber(mobile);
    };
    getMobileNumber();
  }, []);
  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d{4}$|^\d{6}$/, "OTP should be a 4 or 6-digit number")
      .required("OTP is required"),
  });

  const handleFormSubmit = async (values: OTPType) => {
    const moveToMain = async () => {
      const account = await authStorage.getAccount();
      if (account && account?.full_name?.length > 0) {
        console.log("should restart...");
        router.replace({
          pathname: "/",
        });
        if (RNRestart && typeof RNRestart.Restart === "function") {
          RNRestart.Restart();
        } else {
          console.warn("RNRestart is not available on this platform.");
          Updates.reloadAsync();
        }
      }
    };

    await dispatch(
      AuthActions.login({ code: values.otp, phone: mobileNumber }, moveToMain)
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {loading && <Loader />}
        <View style={styles.container}>
          <View
            style={[
              styles.enterYourMobileLabelContainer,
              {
                alignItems: "flex-start",
              },
            ]}
          >
            <Text
              style={[
                styles.tip,
                {
                  textAlign: lang == "ar" ? "right" : "left",
                },
              ]}
            >
              {Locale.strings("otpSentToNumber")}
            </Text>
            <Text
              style={[
                styles.tip,
                {
                  textAlign: lang == "ar" ? "right" : "left",
                },
              ]}
            >
              {mobileNumber}
            </Text>
          </View>
          <Text
            style={[
              styles.smallTip,
              {
                textAlign: lang == "ar" ? "right" : "left",
              },
            ]}
          >
            {Locale.strings("enterYourCode")}
          </Text>
          <Formik
            initialValues={{ otp: "" }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              isValid,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              handleSubmit,
            }) => (
              <>
                <View
                  style={[
                    styles.mobileContainer,
                    {
                      borderWidth: 1,
                      borderColor:
                        (touched.otp && errors.otp) || loginErr
                          ? "red"
                          : "black",
                    },
                  ]}
                >
                  <TextInput
                    style={styles.otp}
                    placeholder={"0000"}
                    keyboardType="numeric"
                    onChangeText={handleChange("otp")}
                    onBlur={handleBlur("otp")}
                    value={values.otp}
                  />
                </View>
                {touched.otp && errors.otp ? (
                  <Text style={styles.errorText}>{errors.otp}</Text>
                ) : null}

                {loginErr && (
                  <View style={styles.centeredTextContainer}>
                    <Text style={styles.centeredText}>
                      {loginErr?.message || loginErr}
                    </Text>
                  </View>
                )}

                <View style={styles.buttonContainer}>
                  <ActionButton
                    title={Locale.strings("continue")}
                    onPress={handleSubmit}
                    disabled={!isValid || isSubmitting || loading}
                  />
                </View>
              </>
            )}
          </Formik>
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
    height: "100%",
  },
  enterYourMobileLabelContainer: {
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  tip: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    width: "100%",
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
    width: "90%",
    height: 50,
    bottom: 30,
    position: "absolute",
  },
  smallTip: {
    fontSize: 10,
    color: "grey",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
  centeredTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    margin: "auto",
    width: "100%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredText: {
    fontSize: 12,
    color: "red",
    textAlign: "center",
  },
  otp: {
    flex: 1,
    fontSize: 14,
  },
});

export default OTPScreen;
