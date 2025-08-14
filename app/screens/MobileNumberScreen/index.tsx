import { ThunkDispatch } from "@reduxjs/toolkit";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { Locale } from "@/app/locale";
import { AppState } from "@/app/redux";
import { AuthActions } from "@/app/redux/actions/auth";
import { AppAction } from "@/app/redux/actions/types";
import ActionButton from "@/components/buttons/ActionButton";
import Loader from "@/components/ui/Loader";
import { useRouter } from "expo-router";
import styles from "./styles";

const validationSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^\d{9}$/, "Mobile number must be 9 digits"),
});

const MobileNumberScreen = (props) => {
  const router = useRouter();
  const [lang, setLang] = useState(Locale.currentLocale);

  const dispatch: ThunkDispatch<AppState, void, AppAction> = useDispatch();
  const { loading, error: loginErr } = useSelector((state) => state.auth);

  useEffect(() => {
    // If Locale.currentLocale can change, update lang accordingly
    setLang(Locale.currentLocale);
  }, [Locale.currentLocale]);

  const handleFormSubmit = async (values) => {
    const moveToOTP = () => {
      router.push({ pathname: "/screens/OTPScreen" });
    };

    await dispatch(
      AuthActions.requestOtp({ phone: values.mobileNumber }, moveToOTP)
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

              { flexDirection: lang == "ar" ? "row-reverse" : "row" },
            ]}
          >
            <Text style={styles.tip}>{Locale.strings("mobile.tip")}</Text>
          </View>

          <Formik
            initialValues={{ mobileNumber: "" }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              isSubmitting,
              errors,
              touched,
              handleChange,
              handleBlur,
              isValid,
              handleSubmit,
            }) => (
              <>
                <View
                  style={[
                    styles.mobileContainer,
                    {
                      borderWidth: 1,
                      flexDirection: lang == "ar" ? "row-reverse" : "row",
                      borderColor:
                        (touched.mobileNumber && errors.mobileNumber) ||
                        loginErr
                          ? "red"
                          : "black",
                    },
                  ]}
                >
                  {lang == "en" && <Text style={styles.countryCode}>+966</Text>}
                  <TextInput
                    style={styles.mobileNumber}
                    placeholder={Locale.strings("mobile.mobilePlaceholder")}
                    keyboardType="numeric"
                    onChangeText={handleChange("mobileNumber")}
                    onBlur={handleBlur("mobileNumber")}
                    value={values.mobileNumber}
                  />
                  {lang == "ar" && <Text style={styles.countryCode}>+966</Text>}
                </View>
                {/* Error Message */}
                {touched.mobileNumber && errors.mobileNumber && (
                  <Text style={styles.errorText}>{errors.mobileNumber}</Text>
                )}
                {loginErr && (
                  <View style={styles.centeredTextContainer}>
                    <Text style={styles.centeredText}>
                      {loginErr?.message || loginErr}
                    </Text>
                  </View>
                )}

                {/* Submit Button */}
                <View style={styles.buttonContainer}>
                  <ActionButton
                    title={Locale.strings("mobile.getCode")}
                    disabled={!isValid || isSubmitting || loading}
                    onPress={handleSubmit}
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

export default MobileNumberScreen;
