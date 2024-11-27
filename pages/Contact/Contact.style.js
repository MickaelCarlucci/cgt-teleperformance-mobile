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
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  filters: {
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
    marginVertical: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
  },
  electedCard: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 1,
  },
  electedName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginVertical: 8,
  },
  accessDenied: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
  link: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});

export { s };
