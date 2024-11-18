import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Text } from "react-native";
import { Home } from "./pages/Home/Home";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import { s } from "./App.style";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.container}>
        <Navbar />
        <Home />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
