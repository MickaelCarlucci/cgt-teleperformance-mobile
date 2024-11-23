import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store"; // Assurez-vous que votre store est correctement importé
import AuthWrapper from "./utils/AuthWrapper";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthWrapper />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
