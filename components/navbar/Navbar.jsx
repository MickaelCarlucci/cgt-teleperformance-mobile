import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { s } from "./Navbar.style";

export function Navbar() {
  const navigation = useNavigation(); // Hook pour naviguer
  const route = useRoute(); // Récupère la route actuelle

  // Fonction pour déterminer si un onglet est actif en fonction de la route
  const isActive = (routeName) => route.name === routeName;

  const handlePress = (routeName) => {
    if (!isActive(routeName)) {
      navigation.navigate(routeName); // Navigue uniquement si ce n'est pas déjà actif
    }
  };

  return (
    <View style={s.navView}>
      <TouchableOpacity
        style={[s.navButton, isActive("Home") ? s.activeNavButton : null]}
        onPress={() => handlePress("Home")}
      >
        <Text style={isActive("Home") ? s.activeText : s.inactiveText}>
          Accueil
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.navButton, isActive("News") ? s.activeNavButton : null]}
        onPress={() => handlePress("News")}
      >
        <Text style={isActive("News") ? s.activeText : s.inactiveText}>
          Actualités
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.navButton, isActive("Polls") ? s.activeNavButton : null]}
        onPress={() => handlePress("Polls")}
      >
        <Text style={isActive("Polls") ? s.activeText : s.inactiveText}>
          Sondages
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.navButton, isActive("Documents") ? s.activeNavButton : null]}
        onPress={() => handlePress("Documents")}
      >
        <Text style={isActive("Documents") ? s.activeText : s.inactiveText}>
          Documents
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.navButton, isActive("Contact") ? s.activeNavButton : null]}
        onPress={() => handlePress("Contact")}
      >
        <Text style={isActive("Contact") ? s.activeText : s.inactiveText}>
          Contact
        </Text>
      </TouchableOpacity>
    </View>
  );
}
