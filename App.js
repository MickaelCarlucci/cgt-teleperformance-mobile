import React, { useRef } from "react";
import { Animated, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Home } from "./pages/Home/Home.jsx";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import { s } from "./App.style";

export default function App() {
  // Valeur animée pour le scroll
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.container}>
        {/* Navbar avec la prop scrollY */}
        <Navbar />
        <Animated.View
          style={[
            s.animatedOverlay,
            {
              opacity: scrollY.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 0.1], // Passe de transparent à légèrement gris
                extrapolate: "clamp",
              }),
            },
          ]}
        />
        {/* Page principale */}
        <Home scrollY={scrollY} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
