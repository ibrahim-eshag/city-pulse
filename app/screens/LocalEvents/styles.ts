import { StyleSheet } from "react-native";

const LocalEventsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  input: {
    flex: 2,
    marginHorizontal: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "flex-start",
  },
  langBtn: {
    padding: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginLeft: 8,
  },
  noEventsText: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
    marginTop: 100,
    height: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default LocalEventsStyles;
