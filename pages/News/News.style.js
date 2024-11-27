import { StyleSheet } from "react-native";

const s = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#f9f9f9",
    },
    error: {
      color: "red",
      marginBottom: 16,
      textAlign: "center",
    },
    splitContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    newsListContainer: {
      flex: 1,
      margin: 8,
    },
    newsListTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 8,
    },
    newsItem: {
      marginBottom: 16,
      padding: 8,
      backgroundColor: "#fff",
      borderRadius: 8,
      elevation: 2,
    },
    newsTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    iconsContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 8,
    },
    newsContent: {
      marginTop: 8,
    },
    newsImage: {
      width: "100%",
      height: 200,
      marginTop: 8,
      borderRadius: 8,
    },
    accessDenied: {
      fontSize: 16,
      textAlign: "center",
      marginTop: 16,
    },
  });

  export {s};