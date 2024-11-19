import React from "react";
import { Animated, View, Text } from "react-native";
import {s} from "./Home.style"

export function Home({ scrollY }) {

    const backgroundColor = scrollY.interpolate({
        inputRange: [0, 100], // Ajuste selon la distance de scroll
        outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.1)"], // Passe de transparent à gris
        extrapolate: "clamp",
      });

      return (
        <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={10}
        style={s.container}
      >
        <View style={s.content}>
          <Text>Bienvenue sur la page CGT!</Text>
        </View>
      </Animated.ScrollView>
    );
  }