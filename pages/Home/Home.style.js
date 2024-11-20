import { StyleSheet } from "react-native";

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: 1000, // Contenu long pour scroller
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  informationContainer: {
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  imageWrapper: {
    alignItems: "center",
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 200,
  },
  pdfContainer: {
    height: 400,
    marginVertical: 16,
  },
  webView: {
    flex: 1,
    width: "100%",
  },
  downloadButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export { s };
