import { StyleSheet } from "react-native";

const s = StyleSheet.create({
  navView: {
    marginTop: 30,
    height: 60, // Hauteur de la barre
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#d30013",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  navButton: {
    padding: 2,
    margin: 2,
  },

  activeNavButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#d30013",
  },
});

export { s };
