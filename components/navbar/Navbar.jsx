import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { s } from "./Navbar.style";

export function Navbar() {
  const [activeTab, setActiveTab] = useState("Accueil");

  const isActive = (tabName) => activeTab === tabName;

  return (
    <View style={s.navView}>
      <TouchableOpacity
        style={[s.navButton, isActive("Accueil") ? s.activeNavButton : null]}
        onPress={() => setActiveTab("Accueil")}
      >
        <Text>Accueil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.navButton, isActive("Actualités") ? s.activeNavButton : null]}
        onPress={() => setActiveTab("Actualités")}
      >
        <Text>Actualités</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.navButton, isActive("Sondages") ? s.activeNavButton : null]}
        onPress={() => setActiveTab("Sondages")}
      >
        <Text>Sondages</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.navButton, isActive("Documents") ? s.activeNavButton : null]}
        onPress={() => setActiveTab("Documents")}
      >
        <Text>Documents</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.navButton, isActive("Contact") ? s.activeNavButton : null]}
        onPress={() => setActiveTab("Contact")}
      >
        <Text>Contact</Text>
      </TouchableOpacity>
    </View>
  );
}