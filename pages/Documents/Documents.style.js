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
      textAlign: "center",
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 16,
      color: "#555",
    },
    error: {
      color: "red",
      marginBottom: 16,
      textAlign: "center",
    },
    accessDenied: {
      fontSize: 16,
      textAlign: "center",
      marginTop: 16,
    },
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#007BFF",
      marginBottom: 8,
    },
    documentItem: {
      padding: 8,
      backgroundColor: "#E0E0E0",
      borderRadius: 8,
      marginBottom: 8,
    },
    documentText: {
      fontSize: 16,
    },
  });

  export {s};