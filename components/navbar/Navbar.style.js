import { StyleSheet } from "react-native";

const s = StyleSheet.create({
  navView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 10,
  },

  navButton: {
    padding: 2,
    margin: 2,
  },

  activeNavButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
});

export { s };
