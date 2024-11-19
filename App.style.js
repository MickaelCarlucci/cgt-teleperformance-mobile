import { StyleSheet } from "react-native";

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  animatedOverlay: {
    position: "absolute",
    top: 90, // Directement sous la Navbar
    left: 0,
    right: 0,
    height: 10, // Hauteur de la zone grisée
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    zIndex: 1, // Position au-dessus du contenu défilable
  },
});

export { s };
