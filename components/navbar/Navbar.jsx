import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { s } from "./Navbar.style";

export function Navbar() {
  const [activeTab, setActiveTab] = useState("Accueil");
  const navigation = useNavigation(); // Hook pour naviguer

  const isActive = (tabName) => activeTab === tabName;

  const handlePress = (tabName, route) => {
    setActiveTab(tabName); // Met à jour l'onglet actif
    navigation.navigate(route); // Navigue vers la route correspondante
  };

  return (
    <View style={s.navView}>
      <TouchableOpacity
        style={[s.navButton, isActive("Accueil") ? s.activeNavButton : null]}
        onPress={() => handlePress("Accueil", "Home")}
      >
        <Text>Accueil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.navButton, isActive("Actualités") ? s.activeNavButton : null]}
        onPress={() => handlePress("Actualités", "News")}
      >
        <Text>Actualités</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.navButton, isActive("Sondages") ? s.activeNavButton : null]}
        onPress={() => handlePress("Sondages", "Polls")}
      >
        <Text>Sondages</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.navButton, isActive("Documents") ? s.activeNavButton : null]}
        onPress={() => handlePress("Documents", "Documents")}
      >
        <Text>Documents</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.navButton, isActive("Contact") ? s.activeNavButton : null]}
        onPress={() => handlePress("Contact", "Contact")}
      >
        <Text>Contact</Text>
      </TouchableOpacity>
    </View>
  );
}
