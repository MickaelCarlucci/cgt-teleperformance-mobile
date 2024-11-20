import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./pages/Home/Home.jsx";
import { Contact } from "./pages/Contact/Contact.jsx"; // Exemple d'autre page
import { MainLayout } from "./components/MainLayout/MainLayout.jsx"; // Nouveau layout

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false, // Pas de header natif
          }}
        >
          <Stack.Screen name="Home">
            {() => (
              <MainLayout>
                <Home />
              </MainLayout>
            )}
          </Stack.Screen>
          <Stack.Screen name="Contact">
            {() => (
              <MainLayout>
                <Contact />
              </MainLayout>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
