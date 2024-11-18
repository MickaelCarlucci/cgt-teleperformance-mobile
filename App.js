import { Home } from "./pages/Home/Home";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { s } from "./App.style";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.container}>
        <Home />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
