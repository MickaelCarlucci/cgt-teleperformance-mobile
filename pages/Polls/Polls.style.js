import { StyleSheet } from "react-native";

const s = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#f9f9f9",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
    },
    error: {
      color: "red",
      marginBottom: 16,
      textAlign: "center",
    },
    pollContainer: {
      marginBottom: 16,
      padding: 16,
      backgroundColor: "#fff",
      borderRadius: 8,
      elevation: 3,
    },
    pollQuestion: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
    },
    accessDenied: {
      fontSize: 16,
      textAlign: "center",
      marginTop: 16,
    },
  });

  export {s};