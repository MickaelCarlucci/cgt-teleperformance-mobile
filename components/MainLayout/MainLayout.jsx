import React, { useRef } from "react";
import { Animated, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Navbar} from "../Navbar/Navbar"
import { s } from "../../App.style";

export const MainLayout = ({ children }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation(); // Maintenant disponible grâce à NavigationContainer

  return (
    <SafeAreaView style={s.container}>
      {/* Navbar toujours visible */}
      <Navbar />

      {/* Overlay animé */}
      <Animated.View
        style={[
          s.animatedOverlay,
          {
            opacity: scrollY.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 0.1],
              extrapolate: "clamp",
            }),
          },
        ]}
      />

      {/* Contenu dynamique */}
      {React.cloneElement(children, { scrollY })}
    </SafeAreaView>
  );
};