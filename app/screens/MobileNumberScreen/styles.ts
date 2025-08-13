import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  countryCode: {
    fontWeight: "400",
  },
  enterYourMobileLabelContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
  tip: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  mobileContainer: {
    backgroundColor: "#F0F1F4",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
  },
  mobileNumber: {
    flex: 1,
    fontSize: 14,
    fontFamily: "400",
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
  errorText: {
    marginTop: 5,
    color: "red",
    fontSize: 12,
    marginLeft: 10,
  },
  centeredText: {
    fontSize: 12,
    color: "red",
    textAlign: "center",
  },
});

export default styles;

// MobileNumberStyles;
